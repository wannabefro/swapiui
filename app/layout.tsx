import { Providers } from "@/src/redux/provider";
import "./globals.css";
import { Stars } from "@/components/Stars";

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
      <body className="font-gothic bg-black">
        <Stars />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
