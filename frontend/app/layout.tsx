import type { Metadata } from "next";  
import { Inter, Roboto_Mono } from "next/font/google";  
import "./globals.css";  
import { AppProviders } from "@/components/providers/AppProviders";
import { Toaster } from "sonner";

const inter = Inter({  
  variable: "--font-inter",  
  subsets: ["latin"],  
});  

const robotoMono = Roboto_Mono({  
  variable: "--font-roboto-mono",  
  subsets: ["latin"],  
});  

export const metadata: Metadata = {  
  title: "Create Next App",  
  description: "Generated by create next app",  
};  
export default function RootLayout({  
  children,  
}: Readonly<{  
  children: React.ReactNode;  
}>) {  
  return (  
    <html lang="en">  

    <head>
    {/* Setting dark mode earlier to block flash on dark mode when page refresh */}
    <script  
          dangerouslySetInnerHTML={{  
            __html: `  
              (function() {  
                const storedTheme = localStorage.getItem('theme');  
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;  
                if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {  
                  document.documentElement.classList.add('dark');  
                } else {  
                  document.documentElement.classList.remove('dark');  
                }  
              })();  
            `,  
          }}  
        />  
    </head>
      <body  
        className={`${inter.variable} ${robotoMono.variable} antialiased`}  
      >  
      <AppProviders>{children}</AppProviders>
      <Toaster richColors />
      </body>  
    </html>  
  );  
}  