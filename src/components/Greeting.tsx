import Image from "next/image";
import { Card } from "./ui/card";
import { cloneElement, ReactElement } from "react";

type GreetingProps = {
    greetingMessage: string;
    description: ReactElement;
    illutrationImageSrc: string;
}

export default function Greeting({ greetingMessage, description, illutrationImageSrc }: GreetingProps) {
    return (
        <Card className='flex p-2 gap-2 items-center justify-between w-full relative bg-[#006abe]'>
            <div className='p-1.5'>
                <h1 className='text-2xl md:text-3xl mb-1'>{greetingMessage}</h1>
                {cloneElement(description, { className: 'text-base md:text-lg' })}
            </div>
            <Image
                src={illutrationImageSrc}
                alt='Greeting Image'
                width={200}
                height={165}
                style={{ height: 165 }}
            />
        </Card>
    )
}
