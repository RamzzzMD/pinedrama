// lib/scraper.js
import axios from "axios";
import * as cheerio from "cheerio";

const CONFIG = {
  BaseUrl: "https://pinedrama.com",
  Timeout: 30000,
};

const UA = "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36";

function clean(text) {
  return String(text || "")
    .replace(/\s+/g, " ")
    .replace(/\u00a0/g, " ")
    .trim();
}

function absUrl(url) {
  if (!url) return null;
  try {
    return new URL(url, CONFIG.BaseUrl).href;
  } catch {
    return url;
  }
}

function slugFromUrl(url) {
  if (!url) return null;
  const cleanUrl = url.split("?")[0].replace(/\/$/, "");
  return cleanUrl.split("/").pop() || null;
}

function uniqueBy(items, key) {
  const seen = new Set();
  const result = [];
  for (const item of items) {
    const value = item[key];
    if (!value || seen.has(value)) continue;
    seen.add(value);
    result.push(item);
  }
  return result;
}

function decodeNextText(html) {
  return html
    .replace(/\\u0026/g, "&")
    .replace(/\\u003c/g, "<")
    .replace(/\\u003e/g, ">")
    .replace(/\\u002f/g, "/")
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, "\\");
}

function parseJsonLd($) {
  const items = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    const raw = $(el).text();
    try {
      items.push(JSON.parse(raw));
    } catch {}
  });
  return items;
}

function parseStreamUrls(html) {
  const decoded = decodeNextText(html);
  const items = [];
  const regex = /"episode_id"\s*:\s*(\d+)\s*,\s*"url"\s*:\s*"([^"]+)"/g;

  let match;
  while ((match = regex.exec(decoded)) !== null) {
    items.push({
      Episode: Number(match[1]),
      Url: match[2].replace(/\\u0026/g, "&")
    });
  }

  const seen = new Set();
  return items.filter(item => {
    if (seen.has(item.Episode)) return false;
    seen.add(item.Episode);
    return true;
  });
}

function parseDramaCard($, el, section) {
  const card = $(el);
  const dramaLink = card.find('a[href*="/dramas/"]').first();
  const genreLink = card.find('a[href*="/genres/"]').first();
  const img = card.find("img").first();

  const title = clean(dramaLink.text()) || clean(img.attr("alt"));
  const url = absUrl(dramaLink.attr("href"));
  const image = absUrl(img.attr("src"));
  const genre = clean(genreLink.text()) || null;
  const text = clean(card.text());
  const ratingMatch = text.match(/\b\d(?:\.\d)?\b/);

  if (!title || !url) return null;

  return {
    section,
    title,
    slug: slugFromUrl(url),
    url,
    image,
    genre,
    rating: ratingMatch ? ratingMatch[0] : "0.0"
  };
}

// LOGIKA SCRAPE HOMEPAGE & SEARCH BANNER
export async function scrapeHome() {
  try {
    const res = await axios.get(`${CONFIG.BaseUrl}/`, {
      timeout: CONFIG.Timeout,
      headers: {
        "user-agent": UA,
        "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
      }
    });

    const $ = cheerio.load(res.data);
    const sections = [];

    $("h2, h3, div").each((_, heading) => {
      const title = clean($(heading).text());
      if (!title) return;
      if (!["New Short Dramas", "Hot Genre"].includes(title)) return;

      const area = $(heading).parent();
      const items = [];

      area.find('a[href*="/dramas/"]').each((__, a) => {
        const card = $(a).closest("div");
        const item = parseDramaCard($, card, title);
        if (item) items.push(item);
      });

      const unique = uniqueBy(items, "url");
      if (unique.length) {
        sections.push({
          name: title,
          total: unique.length,
          items: unique
        });
      }
    });

    const hotGenres = [];
    $("main").find('a[href*="/genres/"]').each((_, el) => {
      const a = $(el);
      const name = clean(a.text());
      const url = absUrl(a.attr("href"));
      if (!name || !url || name.match(/^\d+$/) || name === "...") return;
      hotGenres.push({ name, slug: slugFromUrl(url), url });
    });

    return {
      Status: true,
      Sections: uniqueBy(sections, "name"),
      HotGenres: uniqueBy(hotGenres, "url"),
    };
  } catch (error) {
    return { Status: false, Error: error.message };
  }
}

// LOGIKA SCRAPE DETAIL DRAMA DAN EPISODE ([slug])
export async function scrapeDetail(slug, targetEpisode = 1) {
  try {
    const detailUrl = `${CONFIG.BaseUrl}/dramas/${slug}`;
    const episodeUrl = `${CONFIG.BaseUrl}/dramas/${slug}/ep${targetEpisode}`;

    const res = await axios.get(episodeUrl, {
      timeout: CONFIG.Timeout,
      headers: {
        "user-agent": UA,
        "referer": detailUrl,
        "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
      }
    });

    const html = res.data;
    const $ = cheerio.load(html);
    const jsonLd = parseJsonLd($);
    const schema = jsonLd.find(x => x["@type"] === "TVEpisode") || {};

    const title = schema.partOfSeries?.name || clean($("h1").first().text()) || "Untitled Drama";
    const episodeTitle = schema.name || `Episode ${targetEpisode}`;
    const image = absUrl(schema.image || $('meta[property="og:image"]').attr("content"));
    const description = clean($('meta[name="description"]').attr("content")) || clean(schema.description) || "";

    const genres = [];
    $('a[href*="/genres/"]').each((_, el) => {
      const name = clean($(el).text());
      if (name && !genres.includes(name)) genres.push(name);
    });

    // Mengambil daftar tautan episode yang tersedia di halaman
    const streams = parseStreamUrls(html);
    const episodesList = [];

    // Mengurai navigasi episode dari elemen link di halaman web asli
    $('a[href*="/dramas/"]').each((_, el) => {
      const href = $(el).attr("href");
      if (href && href.includes(`/dramas/${slug}/ep`)) {
        const epMatch = href.match(/ep(\d+)/);
        if (epMatch) {
          const epNum = Number(epMatch[1]);
          if (!episodesList.some(e => e.episode === epNum)) {
            const streamObj = streams.find(s => s.Episode === epNum);
            episodesList.push({
              episode: epNum,
              title: epNum === targetEpisode ? episodeTitle : `Episode ${epNum}`,
              duration: "05:00", // Estimasi default durasi short drama jika tidak tertera
              streamUrl: streamObj ? streamObj.Url : null
            });
          }
        }
      }
    });

    // Menyortir urutan episode dari yang terkecil
    episodesList.sort((a, b) => a.episode - b.episode);

    // Jika navigasi link kosong, buat fallback list dari manifest stream yang terbaca regex
    if (episodesList.length === 0 && streams.length > 0) {
      streams.forEach(s => {
        episodesList.push({
          episode: s.Episode,
          title: s.Episode === targetEpisode ? episodeTitle : `Episode ${s.Episode}`,
          duration: "05:00",
          streamUrl: s.Url
        });
      });
    }

    const currentStream = streams.find(s => s.Episode === Number(targetEpisode)) || streams[0] || null;

    return {
      Status: true,
      Result: {
        title,
        slug,
        genre: genres.join(", ") || "Short Drama",
        rating: "8.8",
        image,
        description,
        episodes: episodesList,
        activeEpisode: {
          episode: Number(targetEpisode),
          title: episodeTitle,
          streamUrl: currentStream ? currentStream.Url : null
        }
      }
    };
  } catch (error) {
    return { Status: false, Error: error.message };
  }
}
