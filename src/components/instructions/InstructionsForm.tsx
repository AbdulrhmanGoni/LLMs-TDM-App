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
  LoaderIcon,
  MessageCircleCodeIcon,
  MessageCircleQuestionIcon,
  MessageCircleReplyIcon
} from "lucide-react"
import { Card, CardTitle } from "../ui/card"
import FetchError from "@/lib/FetchError"
import React from "react"

type InstructionsFormProps = {
  form: any,
  onSubmit: (instruction: any) => Promise<void>,
  formTitle?: string;
  isLoading: boolean;
  error: FetchError | null;
  close: () => void;
  submitButton: {
    text: string;
    loadingText: string;
  }
}

export default function InstructionsForm(
  { form, onSubmit, formTitle, isLoading, error, close, submitButton }: InstructionsFormProps
) {
  return (
    <Card className="p-3 rounded-md mt-2 space-y-3">
      {formTitle && <CardTitle className="py-3">{formTitle}</CardTitle>}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4">
          <div className="grid gap-3">
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="systemMessage"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 items-center">
                      <MessageCircleCodeIcon className="size-4 sm:size-5" />
                      <FormLabel>System Message (Optional)</FormLabel>
                    </div>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={isLoading || field.disabled}
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
                        disabled={isLoading || field.disabled}
                        placeholder="Type the question here..."
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
                        disabled={isLoading || field.disabled}
                        placeholder="Type the answer here..."
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
          <div className="flex gap-2 self-end">
            <Button
              size="sm"
              variant="outline"
              onClick={close}
              disabled={isLoading}
            >
              Close
            </Button>
            <Button
              size="sm"
              type="submit"
              disabled={isLoading}
            >
              {
                isLoading ?
                  <>
                    {submitButton.loadingText}
                    <LoaderIcon size={16} className="ml-2 animate-spin" />
                  </>
                  : submitButton.text
              }
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}

