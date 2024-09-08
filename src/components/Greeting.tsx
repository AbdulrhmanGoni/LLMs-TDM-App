import Image from "next/image";
import { Card } from "./ui/card";

type GreetingProps = {
    greetingMessage: string;
    description: string[];
    illutrationImageSrc: string;
}

export default function Greeting({ greetingMessage, description, illutrationImageSrc }: GreetingProps) {
    return (
        <Card className='flex p-2 gap-2 items-center justify-between w-full relative bg-[#2196F3]'>
            <div className='p-1.5'>
                <h1 className='text-2xl md:text-3xl mb-1'>{greetingMessage}</h1>
                <p className='text-base md:text-lg'>{description.map((text) => <>{text}<br /></>)}</p>
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
