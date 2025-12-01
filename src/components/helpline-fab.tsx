'use client';

import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function HelplineFab() {
  const { toast } = useToast();

  const handleCall = () => {
    window.location.href = 'tel:9821073025';
    toast({
        title: "Calling Helpline",
        description: "Opening your phone's dialer..."
    })
  };

  return (
    <div className="fixed bottom-20 right-4 z-50 md:bottom-6 md:right-6">
      <Button
        size="icon"
        className="rounded-full h-14 w-14 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
        onClick={handleCall}
        aria-label="Call Helpline"
      >
        <Phone className="h-7 w-7" />
      </Button>
    </div>
  );
}
