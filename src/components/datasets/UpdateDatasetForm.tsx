"use client"
import useUpdateDatasetForm from "@/hook/datasets/useUpdateDatasetForm"
import DatasetForm from "./DatasetForm"

export default function UpdateDatasetForm({ dataset }: { dataset: Dataset }) {

    const {
        form,
        onSubmit,
        isPending,
        error,
    } = useUpdateDatasetForm(dataset);

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
