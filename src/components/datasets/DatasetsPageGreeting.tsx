import Greeting from '../Greeting'

export default function DatasetsPageGreeting() {
    return (
        <Greeting
            greetingMessage='Here are your datasets'
            description={[
                "Here you can see all your datasets that you created",
                "Click on dataset card to display the instruction of the dataset"
            ]}
            illutrationImageSrc="Datasets2.svg"
        />
    )
}
