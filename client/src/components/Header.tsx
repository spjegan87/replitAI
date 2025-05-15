import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type ContrastMode = "blue" | "black" | "normal" | "yellow";

export default function Header() {
  const [contrastMode, setContrastMode] = useState<ContrastMode>("normal");

  const handleContrastChange = (mode: ContrastMode) => {
    setContrastMode(mode);
    if (mode === "normal") {
      document.documentElement.removeAttribute("data-contrast");
    } else {
      document.documentElement.setAttribute("data-contrast", mode);
    }
  };

  const { t, i18n } = useTranslation();
  
  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {/* Southwest Logo */}
          <a href="#" className="sw-blue font-bold text-2xl flex items-center">
            Southwest<span className="sw-yellow">®</span>
            <span className="ml-2 text-sm font-normal text-sw-gray-700">{t('groupBookings')}</span>
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center border rounded px-2 py-1 cursor-pointer">
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
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="flex items-center">
                  <img src="https://cdn.countryflags.com/thumbs/united-states-of-america/flag-400.png" alt="US Flag" className="w-6 h-4 mr-2" />
                  <span>English</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center">
                  <img src="https://cdn.countryflags.com/thumbs/saudi-arabia/flag-400.png" alt="Saudi Flag" className="w-6 h-4 mr-2" />
                  <span>العربية</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="flex items-center" 
                  onClick={() => handleLanguageChange('id')}
                >
                  <img src="https://cdn.countryflags.com/thumbs/indonesia/flag-400.png" alt="Indonesia Flag" className="w-6 h-4 mr-2" />
                  <span>Bahasa Indonesia</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center">
                  <img src="https://cdn.countryflags.com/thumbs/india/flag-400.png" alt="India Flag" className="w-6 h-4 mr-2" />
                  <span>தமிழ்</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-sw-blue text-sw-blue hover:bg-sw-blue hover:text-white transition-colors">
                  Login/Signup
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Login or Sign up</DialogTitle>
                  <DialogDescription>
                    Choose your preferred sign in method
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => window.location.href = "/__repl-auth"}
                  >
                    <img src="https://replit.com/public/images/favicon.ico" alt="Replit" className="w-5 h-5" />
                    Continue with Replit
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => {/* Add your SSO handler */}}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22c-5.5 0-10-4.5-10-10S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10z"/>
                      <path d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/>
                    </svg>
                    Continue with SSO
                  </Button>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Enter your email" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" placeholder="Enter your password" />
                    </div>
                    <Button className="w-full bg-sw-blue hover:bg-sw-blue/90">
                      Sign in
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </header>
  );
}
