"use client"
import { Button } from "@/components/ui/button";
import { ArrowBigLeftIcon, HomeIcon } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function Error() {

  const { push, back } = useRouter()
  const pathname = usePathname()

  return (
    <div className="flex-1">
      <div className='flex flex-col gap-5 text-center items-center w-full h-full justify-center'>
        <Image
          src="Page-Not-Found.svg"
          height={120} width={240}
          alt="Page Not Found Illustrator"
        />
        <h2 className='text-3xl'>Page Not Found</h2>
        <p className='text-muted-foreground max-w-96'>
          The page {pathname} that you are looking for is not found {":)"}
        </p>
        <div className="flex gap-3 items-center">
          <Button onClick={() => back()} size="sm" className="gap-1" variant={"outline"}>
            <ArrowBigLeftIcon size={17} />
            Back
          </Button>
          <Button onClick={() => push("/")} size="sm" className="gap-1">
            <HomeIcon size={17} />
            Home
          </Button>
        </div>
      </div>
    </div>
  );
}