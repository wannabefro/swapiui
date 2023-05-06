import { Providers } from "@/src/redux/provider";
import "./globals.css";

export const metadata = {
  title: "Star Wars Explorer",
  description: "Your guide to the films of the Star Wars universe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-gothic">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
