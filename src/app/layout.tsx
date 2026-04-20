import "./globals.css";

export const metadata = {
  title: "Ballot DApp",
  description: "Next.js frontend for Ballot contract",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}