import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

type Props = Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>;

export default function RootLayout({ children, modal }: Props) {
  return (
    <html lang="en">
      <body className={`${openSans.className} antialiased`}>
        {children}
        {modal}
        <div id="modal-root" />
      </body>
    </html>
  );
}
