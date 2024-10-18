import APP_NAME from "@/constants/APP_NAME";
import { CodeXmlIcon, GlobeIcon, TriangleIcon } from "lucide-react";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className='grid md:grid-cols-2 gap-6 border-t border-t-muted py-4'>
            <div className="space-y-3 col-auto">
                <h3 className='text-xl font-semibold flex items-center gap-2'>
                    <TriangleIcon className="size-5 fill-red-600 stroke-red-600 rotate-180" />
                    {APP_NAME}
                </h3>
                <p className='text-muted-foreground'>
                    LLMs Training Datasets Manager is a web application for creating and managing training datasets
                    with different formats for training Large Language Models (LLMs) or for using
                    them in Retrival Argumented Generation (RAG) systems.
                </p>
                <ul className="flex flex-col gap-3">
                    <li>
                        <a target="__blank" href="https://github.com/AbdulrhmanGoni/LLMs-TDM-App" className="hover:underline">
                            <CodeXmlIcon className="inline me-2" />
                            Source Code
                        </a>
                    </li>
                </ul>
            </div>
            <div className="space-y-3 col-auto">
                <p className="text-xl font-medium">
                    Developer
                </p>
                <div className="flex gap-3 items-center">
                    <p className='text-lg font-semibold'>
                        Abdulrhman Goni:
                    </p>
                    <a target="__blank" href="https://github.com/AbdulrhmanGoni">
                        <Image
                            src="/github-icon.svg"
                            alt="Github"
                            width={24}
                            height={24}
                            className="bg-white rounded-full border border-white"
                        />
                    </a>
                    <a target="__blank" href="https://www.linkedin.com/in/abdulrhman-goni-857a36275">
                        <Image
                            src="/linkedin-icon.svg"
                            alt="Linkedin"
                            width={24}
                            height={24}
                        />
                    </a>
                    <a href="mailto:abdulrhmangoni@gmail.com">
                        <Image
                            src="/gmail-icon.svg"
                            alt="Gmail"
                            width={24}
                            height={24}
                        />
                    </a>
                    <a target="__blank" href="https://abdulrhmangoni.github.io/my-portfolio/">
                        <GlobeIcon size={24} />
                    </a>
                </div>
            </div>
        </footer>
    )
}
