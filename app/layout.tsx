import NavBar from "@/components/NavBar";
import { WatchListContext } from "@/lib/context/WatchListContext";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <WatchListContext>
          <NavBar/>
          {children}
        </WatchListContext>
      </body>
    </html>
  );
}
