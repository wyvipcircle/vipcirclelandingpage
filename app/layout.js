import "@fontsource-variable/inter";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "./globals.css";

export const metadata = {
  title: "VIPCIRCLE | Bali has a guest list",
  description:
    "Discover private villas and experiences in Bali through the creators who bring people together there.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
