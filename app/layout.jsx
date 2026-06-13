import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Ranzz Drama",
  description: "Professional China Drama Streaming Web App"
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
