import { useState } from "react";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type ContrastMode = "blue" | "black" | "normal" | "yellow";

export default function Header() {
  const [, setLocation] = useLocation();
  const [contrastMode, setContrastMode] = useState<ContrastMode>("normal");

  const handleContrastChange = (mode: ContrastMode) => {
    setContrastMode(mode);
    if (mode === "normal") {
      document.documentElement.removeAttribute("data-contrast");
    } else {
      document.documentElement.setAttribute("data-contrast", mode);
    }
  };

  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {/* Infiniti Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setLocation("/");
            }}
            className="sw-blue font-bold text-2xl flex items-center cursor-pointer cls-logo"
          >
            <img
              src="src/images/Infiniti-logo-svg.svg"
              alt="Infiniti"
              className="h-8 w-8 mr-2"
            />
            <span className="ml-2 text-sm font-normal text-sw-gray-700">
              Group Bookings
            </span>
          </a>
        </div>

        <div className="flex items-center space-x-4">
          {/* Accessibility Controls */}
          <div className="hidden md:flex items-center space-x-4 mr-4">
            <span className="text-xs uppercase text-sw-gray-500 font-medium">
              ACCESSIBILITY
            </span>

            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase text-sw-gray-500 font-medium">
                CONTRAST
              </span>
              <button
                aria-label="High contrast blue mode"
                className={cn(
                  "w-6 h-6 rounded-full bg-sw-blue flex items-center justify-center border-2 border-white focus:outline-none focus:ring-2 focus:ring-sw-blue",
                  contrastMode === "blue" && "border-black",
                )}
                onClick={() => handleContrastChange("blue")}
              />
              <button
                aria-label="High contrast black mode"
                className={cn(
                  "w-6 h-6 rounded-full bg-black flex items-center justify-center border-2 border-white focus:outline-none focus:ring-2 focus:ring-black",
                  contrastMode === "black" && "border-black",
                )}
                onClick={() => handleContrastChange("black")}
              />
              <button
                aria-label="Normal contrast mode"
                className={cn(
                  "w-6 h-6 rounded-full bg-white flex items-center justify-center border-2 border-sw-gray-300 focus:outline-none focus:ring-2 focus:ring-sw-gray-300",
                  contrastMode === "normal" && "border-black",
                )}
                onClick={() => handleContrastChange("normal")}
              />
              <button
                aria-label="High contrast yellow mode"
                className={cn(
                  "w-6 h-6 rounded-full bg-sw-yellow flex items-center justify-center border-2 border-white focus:outline-none focus:ring-2 focus:ring-sw-yellow",
                  contrastMode === "yellow" && "border-black",
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
                    src={
                      i18n.language === "ta"
                        ? "https://cdn.countryflags.com/thumbs/india/flag-400.png"
                        : i18n.language === "ar"
                          ? "https://cdn.countryflags.com/thumbs/saudi-arabia/flag-400.png"
                          : i18n.language === "id"
                            ? "https://cdn.countryflags.com/thumbs/indonesia/flag-400.png"
                            : "https://cdn.countryflags.com/thumbs/united-states-of-america/flag-400.png"
                    }
                    alt="Language Flag"
                    className="w-6 h-4 mr-1"
                  />
                  <span className="text-sm">
                    {i18n.language === "ta"
                      ? "தமிழ்"
                      : i18n.language === "ar"
                        ? "العربية"
                        : i18n.language === "id"
                          ? "Bahasa Indonesia"
                          : "English"}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1 text-sw-gray-500"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className="flex items-center"
                  onClick={() => {
                    i18n.changeLanguage("en");
                    document.documentElement.dir = "ltr";
                  }}
                >
                  <img
                    src="https://cdn.countryflags.com/thumbs/united-states-of-america/flag-400.png"
                    alt="US Flag"
                    className="w-6 h-4 mr-2"
                  />
                  <span>English</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center"
                  onClick={() => {
                    i18n.changeLanguage("ar");
                    document.documentElement.dir = "rtl";
                  }}
                >
                  <img
                    src="https://cdn.countryflags.com/thumbs/saudi-arabia/flag-400.png"
                    alt="Saudi Flag"
                    className="w-6 h-4 mr-2"
                  />
                  <span>العربية</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center"
                  onClick={() => {
                    i18n.changeLanguage("id");
                    document.documentElement.dir = "ltr";
                  }}
                >
                  <img
                    src="https://cdn.countryflags.com/thumbs/indonesia/flag-400.png"
                    alt="Indonesia Flag"
                    className="w-6 h-4 mr-2"
                  />
                  <span>Bahasa Indonesia</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center"
                  onClick={() => {
                    i18n.changeLanguage("ta");
                    document.documentElement.dir = "ltr";
                  }}
                >
                  <img
                    src="https://cdn.countryflags.com/thumbs/india/flag-400.png"
                    alt="India Flag"
                    className="w-6 h-4 mr-2"
                  />
                  <span>தமிழ்</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-sw-blue text-sw-blue hover:bg-sw-blue/10 hover:border-sw-blue/80 transition-colors"
                >
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
                    onClick={() => {
                      /* Add Google SSO handler */
                    }}
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                    </svg>
                    Continue with Google
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 bg-[#1877F2] text-white hover:bg-[#1877F2]/90"
                    onClick={() => {
                      /* Add Facebook SSO handler */
                    }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Continue with Facebook
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white hover:opacity-90"
                    onClick={() => {
                      /* Add Instagram SSO handler */
                    }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    Continue with Instagram
                  </Button>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                      />
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
