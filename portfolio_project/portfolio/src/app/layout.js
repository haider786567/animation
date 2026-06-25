
import SmoothScroller from "@/components/SmoothScroller";
import "./globals.css";



export const metadata = {
  title: "Portfolio",
  description: "A showcase of my projects and skills.",
};

export default function RootLayout({ children }) {
  
  return (
    <html
      lang="en"
      className={` h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">

        <SmoothScroller>{children}</SmoothScroller>

        
        </body>
    </html>
  );
}
