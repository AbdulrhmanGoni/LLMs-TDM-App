"use client"
import { Textarea } from "../ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form"
import { Button } from "../ui/button"
import {
  MessageCircleCodeIcon,
  MessageCircleQuestionIcon,
  MessageCircleReplyIcon
} from "lucide-react"
import { Card } from "../ui/card"
import
useUpdateInstructionForm,
{ UseUpdateInstructionForm }
  from "@/hook/instructions/useUpdateInstructionForm"

export default function UpdateInstructionsForm(props: UseUpdateInstructionForm) {

  const { form, onSubmit, isPending } = useUpdateInstructionForm(props);

  return (
    <Card className="p-3 rounded-md mt-2 space-y-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="grid gap-3">
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="systemMessage"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 items-center">
                      <MessageCircleCodeIcon className="size-4 sm:size-5" />
                      <FormLabel>System Message</FormLabel>
                    </div>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Type the system message here..."
                        className="bg-muted max-h-40 h-fit resize-y border-0 p-3 shadow-none focus-visible:ring-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 items-center">
                      <MessageCircleQuestionIcon className="size-4 sm:size-5" />
                      <FormLabel>Question</FormLabel>
                    </div>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Type the system message here..."
                        className="bg-muted max-h-40 resize-y border-0 p-3 shadow-none focus-visible:ring-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 items-center">
                      <MessageCircleReplyIcon className="size-4 sm:size-5" />
                      <FormLabel>Answer</FormLabel>
                    </div>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Type the system message here..."
                        className="bg-muted max-h-80 resize-y border-0 p-3 shadow-none focus-visible:ring-0"
                        rows={7}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              size="sm"
              variant="outline"
              className="self-end"
              onClick={(e) => {
                e.preventDefault()
                props.closeEditMode()
              }}
            >
              Cancel
            </Button>
            <Button size="sm" type="submit" className="self-end">
              Update
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}

