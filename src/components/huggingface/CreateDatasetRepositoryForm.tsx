import { Button } from '../ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { DialogTitle } from '../ui/dialog'
import { Input } from '../ui/input'
import useCreateDatasetRepository from '@/hook/huggingface/useCreateDatasetRepository'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { FolderPlusIcon, LoaderIcon } from 'lucide-react'
import { huggingfaceRepositoriesLicenses } from '@/constants/huggingfaceRepositoriesLicenses'

export default function CreateDatasetRepositoryForm({ closeForm }: { closeForm?: () => void }) {

    const { form, onSubmit, isLoading } = useCreateDatasetRepository({ closeForm })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <DialogTitle className="text-2xl font-bold">
                        Create Dataset Repository
                    </DialogTitle>
                    <p className="text-muted-foreground">
                        Create a new dataset repository to link it with your dataset.
                    </p>
                </div>
                <div className="grid gap-3">
                    <div className="grid gap-3">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Repository Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isLoading || field.disabled} />
                                    </FormControl>
                                    <FormDescription>
                                        This is the name of the dataset repository.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-3">
                        <FormField
                            control={form.control}
                            name="license"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>License</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        disabled={isLoading || field.disabled}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Handler" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                huggingfaceRepositoriesLicenses.map(
                                                    (handler) => <SelectItem key={handler} value={handler}>{handler}</SelectItem>
                                                )
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Choose the license of the dataset repository
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Button
                    type="submit"
                    className='float-right gap-2'
                    size="sm"
                    disabled={isLoading}
                >
                    {isLoading ? <LoaderIcon size={19} className='animate-spin' /> : <FolderPlusIcon size={19} />}
                    {isLoading ? 'Creating Repository...' : 'Create Repository'}
                </Button>
            </form>
        </Form>
    )
}
