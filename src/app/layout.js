import "./globals.css";
import { Inter } from "next/font/google";
import ReduxProvider from "../redux/ReduxProvider";
import Navbar from "./components/Navbar";
import Alert from "./components/Alerts";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next Jobs",
  description: "Get your dream job here!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Navbar />
          <Alert />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}