import Greeting from './Greeting'

export default function HomePageGreeting() {
    return (
        <Greeting
            greetingMessage='Hi Abdulrhman Goni👋'
            description={[
                "Welcome back to your training datasets management application",
                "Where you create and manage your LLMs training datasets"
            ]}
            illutrationImageSrc="greeting-1.svg"
        />
    )
}
