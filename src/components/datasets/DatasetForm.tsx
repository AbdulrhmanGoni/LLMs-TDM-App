import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "../ui/form"
import { Button } from "../ui/button"
import { DialogTitle } from "../ui/dialog"
import FetchError from "@/lib/FetchError"
import { LoaderIcon } from "lucide-react"

type DatasetFormProps = {
    form: any,
    onSubmit: (newDataset: any) => Promise<void>
    formTitle: string;
    formDescription: string;
    isLoading: boolean;
    error: FetchError | null;
}

export default function DatasetForm({ form, onSubmit, formTitle, formDescription, isLoading }: DatasetFormProps) {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <DialogTitle className="text-2xl font-bold">
                        {formTitle}
                    </DialogTitle>
                    <p className="text-muted-foreground">
                        {formDescription}
                    </p>
                </div>
                <div className="grid gap-3">
                    <div className="grid gap-3">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isLoading || field.disabled} />
                                    </FormControl>
                                    <FormDescription>
                                        This is the name of your dataset.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-3">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} disabled={isLoading || field.disabled} />
                                    </FormControl>
                                    <FormDescription>
                                        This is the description of your dataset
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Button
                    type="submit"
                    size="sm"
                    disabled={isLoading}
                >
                    {
                        isLoading ?
                            <>
                                Submitting...
                                < LoaderIcon size={16} className="ml-2 animate-spin" />
                            </>
                            : "Submit"
                    }
                </Button>
            </form>
        </Form>
    )
}
