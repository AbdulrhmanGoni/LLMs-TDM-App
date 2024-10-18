"use client"
import useAddInstructionForm from "@/hook/instructions/useAddInstructionForm"
import InstructionsForm from "./InstructionsForm"

type AddInstructionsFormProps = {
  dataset: Dataset,
  close: () => void
}

export default function AddInstructionsForm(props: AddInstructionsFormProps) {

  const { form, onSubmit, isPending, error } = useAddInstructionForm(props);

  return (
    <InstructionsForm
      formTitle="Add Instructions Form"
      isLoading={isPending}
      error={error}
      form={form}
      onSubmit={onSubmit}
      close={props.close}
      submitButton={{
        text: "Add",
        loadingText: "Adding..."
      }}
    />
  )
}

