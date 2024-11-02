"use client"
import useUpdateDatasetForm from "@/hook/datasets/useUpdateDatasetForm"
import DatasetForm from "./DatasetForm"

type UpdateDatasetFormProps = {
    dataset: Dataset,
    closeForm: () => void
}

export default function UpdateDatasetForm({ dataset, closeForm }: UpdateDatasetFormProps) {

    const {
        form,
        onSubmit,
        isPending,
        error,
    } = useUpdateDatasetForm({ dataset, closeForm });

    return (
        <DatasetForm
            form={form}
            onSubmit={onSubmit}
            formTitle="Update dataset Form"
            formDescription="Update the dataset here and submit your changes"
            isLoading={isPending}
            error={error}
        />
    )
}
