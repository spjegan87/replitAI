
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
    },
    "network": {
      icon: <WifiOff className="h-12 w-12 text-red-500" />,
      title: "Network Error",
      message: "Unable to connect to the server. Please check your internet connection.",
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
