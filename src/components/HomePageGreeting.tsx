"use client";
import { useUser } from '@clerk/nextjs';
import Greeting from './Greeting'
import GreetingLoading from './GreetingLoading';

export default function HomePageGreeting() {
    const { user, isLoaded } = useUser();
    return (
        isLoaded && user ?
            <Greeting
                greetingMessage={`Hi ${user.firstName} ${user.lastName}👋`}
                description={
                    <p>
                        Welcome back to your training datasets management application, <br />
                        Where you create and manage your LLMs training datasets
                    </p>
                }
                illutrationImageSrc="greeting-1.svg"
            /> : <GreetingLoading />
    )
}
