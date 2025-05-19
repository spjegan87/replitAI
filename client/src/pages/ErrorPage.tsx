
import { useLocation } from "wouter";
import { AlertCircle, WifiOff, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ErrorType = "404" | "network" | "session";

interface ErrorPageProps {
  type: ErrorType;
}

export default function ErrorPage({ type }: ErrorPageProps) {
  const [, setLocation] = useLocation();

  const errorContent = {
    "404": {
      icon: <AlertCircle className="h-12 w-12 text-red-500" />,
      title: "404 - Page Not Found",
      message: "The page you're looking for doesn't exist.",
      illustration: (
        <div className="w-64 h-64 mb-6">
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <path
              fill="currentColor"
              className="text-gray-200"
              d="M4 4v16h16V4H4zm1 1h14v14H5V5zm6.5 2C9.57 7 8 8.57 8 10.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5S13.43 7 11.5 7zm0 1c1.38 0 2.5 1.12 2.5 2.5S12.88 13 11.5 13 9 11.88 9 10.5 10.12 8 11.5 8zm-3 8c-.83 0-1.5.67-1.5 1.5S7.67 19 8.5 19s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm7 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"
            />
            <circle cx="11.5" cy="10.5" r="2.5" className="text-red-500" fill="currentColor" />
            <circle cx="8.5" cy="17.5" r="1.5" className="text-red-500" fill="currentColor" />
            <circle cx="15.5" cy="17.5" r="1.5" className="text-red-500" fill="currentColor" />
          </svg>
        </div>
      ),
    },
    "network": {
      icon: <WifiOff className="h-12 w-12 text-red-500" />,
      title: "Network Error",
      message: "Unable to connect to the server. Please check your internet connection.",
      illustration: (
        <div className="w-64 h-64 mb-6">
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <path
              fill="currentColor"
              className="text-gray-200"
              d="M12 3C7.03 3 2.81 5.27.5 8.7L2 10c2-3 6-5 10-5s8 2 10 5l1.5-1.3C21.19 5.27 16.97 3 12 3zm0 4c-3.35 0-6.27 1.3-8.5 3.3L5 12c1.84-1.84 4.41-3 7-3s5.16 1.16 7 3l1.5-1.7C18.27 8.3 15.35 7 12 7zm0 4c-1.86 0-3.41.77-4.5 2l4.5 5 4.5-5c-1.09-1.23-2.64-2-4.5-2z"
            />
            <path
              fill="currentColor"
              className="text-red-500"
              d="M1 21h22L12 3 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"
            />
          </svg>
        </div>
      ),
    },
    "session": {
      icon: <Clock className="h-12 w-12 text-red-500" />,
      title: "Session Expired",
      message: "Your session has expired. Please log in again.",
    },
  };

  const content = errorContent[type];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6 text-center">
          <div className="flex flex-col items-center gap-4">
            {content.illustration}
            {content.icon}
            <h1 className="text-2xl font-bold text-gray-900">{content.title}</h1>
            <p className="text-gray-600">{content.message}</p>
            <Button onClick={() => setLocation("/")} className="mt-4">
              Return to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
