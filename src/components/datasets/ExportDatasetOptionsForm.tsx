"use client"
import { Button } from '../ui/button'
import { DownloadIcon, FileUpIcon } from 'lucide-react'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '../ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import useExportDataset from '@/hook/datasets/useExportDataset'
import { exportDatasetFormOptions } from '@/validation/exportDatasetFormOptionsSchemaRules'

export default function ExportDatasetOptionsForm({ dataset }: { dataset: Dataset }) {

    const { form, onSubmit } = useExportDataset(dataset);

    return (
        <Form {...form}>
            <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-2">
                    <h4 className="flex gap-1 items-center font-medium leading-none">
                        <FileUpIcon size={17} />
                        Export Dataset
                    </h4>
                    <p className="text-sm text-muted-foreground">
                        Choose how to export this dataset into your machine
                    </p>
                </div>
                <FormField
                    control={form.control}
                    name="format"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Format</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                The file format that the dataset will be exported in
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="handler"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Handler</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Handler" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        exportDatasetFormOptions.handlers.map(
                                            (handler) => <SelectItem key={handler} value={handler}>{handler}</SelectItem>
                                        )
                                    }
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Choose which will handle dataset exporting
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    size="sm"
                    type="submit"
                    className="gap-1"
                >
                    <DownloadIcon size={17} /> Export
                </Button>
            </form>
        </Form>
    )
}
