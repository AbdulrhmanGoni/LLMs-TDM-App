import useUnlinkDatasetWithRepository from "@/hook/huggingface/useUnlinkDatasetWithRepository"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "../ui/form"
import { Button } from "../ui/button"
import { DialogTitle } from "../ui/dialog"
import { FolderSyncIcon, Link2OffIcon, LoaderIcon } from "lucide-react"
import { Checkbox } from "../ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { cn } from "@/utils/tw-cn"
import CommitMessageInputs from "./CommitMessageInputs"

type UnlinkDatasetWithRepositoryOptionsFormProps = {
    dataset: Required<Dataset>;
    closeForm: () => void;
}

export default function UnlinkDatasetWithRepositoryOptionsForm(
    { dataset, closeForm }: UnlinkDatasetWithRepositoryOptionsFormProps
) {

    const { form, onSubmit, isLoading } = useUnlinkDatasetWithRepository({ dataset, closeForm });

    const deleteRepositoryOption = form.watch().deleteRepository

    return (
        <Form {...form}>
            <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-2">
                    <DialogTitle className="flex gap-2 items-center text-2xl font-bold">
                        <FolderSyncIcon size={28} />
                        Unlink the dataset with its repository
                    </DialogTitle>
                    <p className="text-sm text-muted-foreground">
                        Unlink
                        <span className="text-primary">{` "${dataset.name}" `}</span>
                        dataset with
                        <a
                            href={`https://huggingface.co/datasets/${dataset.repository.name}`}
                            className="text-primary cursor-pointer hover:underline"
                            target="_blank"
                            rel="noreferrer"
                        >
                            {` "${dataset.repository.name}" `}
                        </a>
                        remote repository on Huggingface
                    </p>
                </div>
                <div className="grid gap-3">
                    <div className="grid gap-3">
                        <FormField
                            control={form.control}
                            name="deleteRepository"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-destructive p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className="border-destructive data-[state=checked]:border-primary"
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className="text-red-600 cursor-pointer">
                                            Delete the dataset repository
                                        </FormLabel>
                                        <FormDescription>
                                            This option to delete the linked dataset repository on Huggingface.
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-3">
                        <FormField
                            control={form.control}
                            name="deleteDatasetFile"
                            render={({ field }) => (
                                <FormItem
                                    className={cn(
                                        "flex flex-row items-start space-x-3 space-y-0 rounded-md border border-destructive p-4",
                                        deleteRepositoryOption && "cursor-not-allowed"
                                    )}
                                >
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value || deleteRepositoryOption}
                                            onCheckedChange={field.onChange}
                                            className="border-destructive data-[state=checked]:border-primary"
                                            disabled={field.disabled || deleteRepositoryOption}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className={`text-red-600 ${deleteRepositoryOption ? "cursor-not-allowed" : "cursor-pointer"}`}>
                                            Delete the dataset file
                                        </FormLabel>
                                        <FormDescription>
                                            Delete the dataset file inside the linked dataset repository on Huggingface.
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                    {
                        form.watch().deleteDatasetFile && !deleteRepositoryOption &&
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="comment-message">
                                <AccordionTrigger>Commit Message?</AccordionTrigger>
                                <AccordionContent className="p-1">
                                    <CommitMessageInputs
                                        form={form}
                                        isLoading={isLoading}
                                        commitTitle="The title of the commit that will be made when deleting the dataset file from the repository"
                                        commitDescription="The description of the commit that will be made when deleting the dataset file from the repository"
                                    />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    }
                </div>
                <Button
                    size="sm"
                    type="submit"
                    className="gap-1 w-fit justify-self-end"
                    variant="destructive"
                >
                    {isLoading ? "Unlinking..." : "Unlink"}
                    {
                        isLoading ?
                            <LoaderIcon size={16} className="animate-spin" />
                            : <Link2OffIcon size={17} />
                    }
                </Button>
            </form>
        </Form>
    )
}
