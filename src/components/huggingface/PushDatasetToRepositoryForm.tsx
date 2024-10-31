import { Input } from "../ui/input"
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
import { ArrowUpFromLineIcon, LoaderIcon } from "lucide-react"
import usePushDatasetToRepository from "@/hook/huggingface/usePushDatasetToRepository"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { exportDatasetFormOptions } from "@/validation/exportDatasetFormOptionsSchemaRules"
import CommitMessageInputs from "./CommitMessageInputs"

type PushDatasetToRepositoryFormProps = {
    HFDatasetRepository: HuggingfaceDatasetRepositoryData;
    dataset: Dataset;
    closeForm?: () => void;
}

export default function PushDatasetToRepositoryForm(
    { dataset, HFDatasetRepository, closeForm }: PushDatasetToRepositoryFormProps
) {
    const {
        form,
        onSubmit,
        isLoading,
    } = usePushDatasetToRepository({
        dataset,
        HFDatasetRepository,
        closeForm
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-1.5">
                    <DialogTitle className="text-2xl font-bold">
                        Push the dataset to a remote repository
                    </DialogTitle>
                    <p className="text-muted-foreground">
                        Push
                        <span className="text-primary">{` "${dataset.name}" `}</span>
                        dataset to
                        <a
                            className="text-primary hover:underline"
                            href={`https://huggingface.co/datasets/${HFDatasetRepository.name}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {` "${HFDatasetRepository.name}" `}
                        </a>
                        Huggingface repository
                    </p>
                </div>
                <div className="grid gap-3">
                    <div className="flex gap-3">
                        <FormField
                            control={form.control}
                            name="filePath"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Dataset File Path</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isLoading || field.disabled} />
                                    </FormControl>
                                    <FormDescription>
                                        Write the path to the file that will contain your dataset
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="fileFormat"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Dataset File Format</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        disabled={isLoading || field.disabled}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Format" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                exportDatasetFormOptions.formats.map(
                                                    (format) => <SelectItem key={format} value={format}>{format}</SelectItem>
                                                )
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        The file format of the dataset that will be pushed to the repository
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <CommitMessageInputs
                        form={form}
                        isLoading={isLoading}
                        commitTitle="The title of the commit that will be made when pushing the dataset to the repository"
                        commitDescription="The description of the commit that will be made when pushing the dataset to the repository"
                    />
                </div>
                <Button
                    type="submit"
                    size="sm"
                    disabled={isLoading}
                    className="float-right gap-2"
                >
                    {isLoading ? "Pushhing..." : "Push"}
                    {
                        isLoading ?
                            <LoaderIcon size={16} className="animate-spin" />
                            : <ArrowUpFromLineIcon size={16} />
                    }
                </Button>
            </form>
        </Form>
    )
}
