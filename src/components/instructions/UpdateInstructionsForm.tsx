"use client"
import
useUpdateInstructionForm,
{ UseUpdateInstructionForm }
  from "@/hook/instructions/useUpdateInstructionForm"
import InstructionsForm from "./InstructionsForm"

export default function UpdateInstructionsForm(props: UseUpdateInstructionForm) {

  const { form, onSubmit, isPending, error } = useUpdateInstructionForm(props);

  return (
    <InstructionsForm
      isLoading={isPending}
      error={error}
      form={form}
      onSubmit={onSubmit}
      close={props.closeEditMode}
      submitButton={{
        text: "Update",
        loadingText: "Updating..."
      }}
    />
  )
}

