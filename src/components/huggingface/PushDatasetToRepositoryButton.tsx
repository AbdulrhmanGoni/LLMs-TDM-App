import Image from "next/image"

type PushDatasetToRepositoryButtonProps = {
    onClick: () => void
}

export default function PushDatasetToRepositoryButton({ onClick }: PushDatasetToRepositoryButtonProps) {
    return (
        <button
            className="flex items-center gap-2 w-fit rounded-md border px-3 py-2 font-medium hover:bg-muted transition-colors"
            onClick={onClick}
        >
            <Image
                src="/huggingface-icon.svg"
                alt="Hugging Face Icon"
                width={30}
                height={30}
            />
            Push your dataset to a Huggingface repository
        </button>
    )
}
