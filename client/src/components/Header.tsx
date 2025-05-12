import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ContrastMode = "blue" | "black" | "normal" | "yellow";

export default function Header() {
  const [contrastMode, setContrastMode] = useState<ContrastMode>("normal");

  const handleContrastChange = (mode: ContrastMode) => {
    setContrastMode(mode);
    // In a real application, this would apply accessibility changes
    // to the entire site
  };

  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {/* Southwest Logo */}
          <a href="#" className="sw-blue font-bold text-2xl flex items-center">
            Southwest<span className="sw-yellow">®</span>
            <span className="ml-2 text-sm font-normal text-sw-gray-700">Group Bookings</span>
          </a>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Accessibility Controls */}
          <div className="hidden md:flex items-center space-x-4 mr-4">
            <span className="text-xs uppercase text-sw-gray-500 font-medium">ACCESSIBILITY</span>
            
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase text-sw-gray-500 font-medium">CONTRAST</span>
              <button 
                aria-label="High contrast blue mode" 
                className={cn(
                  "w-6 h-6 rounded-full bg-sw-blue flex items-center justify-center border-2 border-white focus:outline-none focus:ring-2 focus:ring-sw-blue",
                  contrastMode === "blue" && "border-black"
                )}
                onClick={() => handleContrastChange("blue")}
              />
              <button 
                aria-label="High contrast black mode" 
                className={cn(
                  "w-6 h-6 rounded-full bg-black flex items-center justify-center border-2 border-white focus:outline-none focus:ring-2 focus:ring-black",
                  contrastMode === "black" && "border-black"
                )}
                onClick={() => handleContrastChange("black")}
              />
              <button 
                aria-label="Normal contrast mode" 
                className={cn(
                  "w-6 h-6 rounded-full bg-white flex items-center justify-center border-2 border-sw-gray-300 focus:outline-none focus:ring-2 focus:ring-sw-gray-300",
                  contrastMode === "normal" && "border-black"
                )}
                onClick={() => handleContrastChange("normal")}
              />
              <button 
                aria-label="High contrast yellow mode" 
                className={cn(
                  "w-6 h-6 rounded-full bg-sw-yellow flex items-center justify-center border-2 border-white focus:outline-none focus:ring-2 focus:ring-sw-yellow",
                  contrastMode === "yellow" && "border-black"
                )}
                onClick={() => handleContrastChange("yellow")}
              />
            </div>
          </div>
          
          {/* Contact and Language */}
          <div className="hidden md:block text-sm text-sw-gray-700 mr-2">
            <div>Call 099 10 67 67 67 or +1 654 754322</div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center border rounded px-2 py-1">
              <img 
                src="https://cdn.countryflags.com/thumbs/united-states-of-america/flag-400.png" 
                alt="US Flag" 
                className="w-6 h-4 mr-1" 
              />
              <span className="text-sm">English</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 text-sw-gray-500">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </div>
            
            <Button variant="outline" className="border-sw-blue text-sw-blue hover:bg-sw-blue hover:text-white transition-colors">
              Login/Signup
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
