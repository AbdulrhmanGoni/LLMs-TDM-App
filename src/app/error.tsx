"use client"
import { Button } from "@/components/ui/button";
import { CircleXIcon } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex-1">
      <div className='flex flex-col gap-5 text-center items-center w-full h-full justify-center'>
        <CircleXIcon size={70} />
        <h2 className='text-3xl'>Unexpected Error !!!</h2>
        <p className='text-muted-foreground max-w-96'>
          {
            error.message ||
            "There is an unexpected error, check your internet or refrech the page and try again"
          }
        </p>
        <Button onClick={reset}>
          refresh
        </Button>
      </div>
    </div>
  );
}