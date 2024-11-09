"use client"
import useCreateDatasetForm from "@/hook/datasets/useCreateDatasetForm"
import DatasetForm from "./DatasetForm"

export default function CreateDatasetForm({ closeForm }: { closeForm: () => void }) {

    const {
        form,
        onSubmit,
        isPending,
        error
    } = useCreateDatasetForm({ closeForm });

    return (
        <DatasetForm
            form={form}
            onSubmit={onSubmit}
            formTitle="Create Dataset Form"
            formDescription="Fill out this form to create your dataset"
            isLoading={isPending}
            error={error}
        />
    )
}
