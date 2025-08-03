import Link from "next/link"

export default function NavBar(){
   return (
     <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg border-b border-purple-300">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex justify-between items-center h-16">
           {/* Logo/Brand */}
           <div className="flex-shrink-0">
             <h1 className="text-2xl font-bold text-white drop-shadow-sm">
               ✨ CryptoTracker
             </h1>
           </div>

           {/* Navigation Links */}
           <ul className="flex space-x-6">
             <li>
               <Link
                 href="/"
                 className="text-white/90 hover:text-white hover:bg-white/20 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/40"
               >
                 🏠 Home
               </Link>
             </li>
             <li>
               <Link
                 href="/watch-list"
                 className="text-white/90 hover:text-white hover:bg-white/20 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/40"
               >
                 ⭐ Watch List
               </Link>
             </li>
           </ul>
         </div>
       </div>
     </nav>
   );
}