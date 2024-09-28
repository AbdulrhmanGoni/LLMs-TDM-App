import Greeting from '../Greeting'

export default function DatasetsPageGreeting() {
    return (
        <Greeting
            greetingMessage='Here are your datasets'
            description={
                <p>
                    Here you can see all your datasets that you created <br />
                    Click on dataset card to display the instruction of the dataset
                </p>
            }
            illutrationImageSrc="Datasets2.svg"
        />
    )
}
