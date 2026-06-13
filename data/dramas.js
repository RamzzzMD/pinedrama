export const dramas = [
  {
    title: "Cooking My Way Back To Love",
    slug: "cooking-my-way-back-to-love",
    genre: "Romance",
    rating: "8.7",
    image: "/covers/cooking.jpg",
    description:
      "Seorang chef muda kembali ke kampung halamannya dan bertemu cinta lama yang mengubah hidupnya.",
    episodes: [
      {
        episode: 1,
        title: "The Return",
        duration: "08:42",
        streamUrl: "/videos/sample-ep1.mp4"
      },
      {
        episode: 2,
        title: "Old Feelings",
        duration: "09:14",
        streamUrl: "/videos/sample-ep2.mp4"
      }
    ]
  },
  {
    title: "Married To The Cold CEO",
    slug: "married-to-the-cold-ceo",
    genre: "CEO Romance",
    rating: "9.1",
    image: "/covers/ceo.jpg",
    description:
      "Kontrak pernikahan berubah menjadi kisah cinta ketika seorang CEO dingin mulai membuka hatinya.",
    episodes: [
      {
        episode: 1,
        title: "Contract Marriage",
        duration: "07:55",
        streamUrl: "/videos/sample-ep1.mp4"
      },
      {
        episode: 2,
        title: "Hidden Care",
        duration: "08:36",
        streamUrl: "/videos/sample-ep2.mp4"
      }
    ]
  },
  {
    title: "Reborn As The Heiress",
    slug: "reborn-as-the-heiress",
    genre: "Revenge",
    rating: "8.9",
    image: "/covers/heiress.jpg",
    description:
      "Setelah dikhianati, ia terlahir kembali sebagai pewaris kaya dan menyusun balas dendam elegan.",
    episodes: [
      {
        episode: 1,
        title: "Second Life",
        duration: "10:10",
        streamUrl: "/videos/sample-ep1.mp4"
      },
      {
        episode: 2,
        title: "First Move",
        duration: "09:45",
        streamUrl: "/videos/sample-ep2.mp4"
      }
    ]
  }
];

export function searchDramas(query = "") {
  const q = query.toLowerCase().trim();

  if (!q) return dramas;

  return dramas.filter((item) => {
    return (
      item.title.toLowerCase().includes(q) ||
      item.genre.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
  });
}

export function getDrama(slug) {
  return dramas.find((item) => item.slug === slug);
}
