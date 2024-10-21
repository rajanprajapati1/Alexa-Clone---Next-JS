"use client";
import 'regenerator-runtime/runtime';
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata = {
//   title: "Alexa Talk",
//   description: "Interact with our intelligent AI assistant that mimics Alexa's capabilities. Get answers, manage tasks, and enjoy a seamless conversational experience.",
//   keywords: "AI assistant, voice assistant, Alexa replica, voice interaction, smart assistant, conversational AI",
//   author: "Rajan Prajapati",
//   og: {
//     title: "Alexa Talk",
//     description: "Experience an advanced AI assistant designed to respond like Alexa. Your personal assistant for information and tasks.",
//     url: "https://yourwebsite.com", // Replace with your website URL
//     image: "https://yourwebsite.com/image.png", // Replace with a relevant image URL
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Alexa Talk",
//     description: "Meet your new AI assistant that talks and interacts just like Alexa.",
//     image: "https://yourwebsite.com/image.png", // Replace with a relevant image URL
//   },
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
