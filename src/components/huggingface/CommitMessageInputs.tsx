import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type CommitMessageInputs = {
    form: any,
    isLoading: boolean,
    commitTitle: string,
    commitDescription: string
}

export default function CommitMessageInputs({ form, isLoading, commitTitle, commitDescription }: CommitMessageInputs) {
    return (
        <>
            <div className="grid gap-3">
                <FormField
                    control={form.control}
                    name="commitTitle"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Commit Title (optional)</FormLabel>
                            <FormControl>
                                <Input {...field} disabled={isLoading || field.disabled} />
                            </FormControl>
                            <FormDescription>
                                {commitTitle}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="grid gap-3">
                <FormField
                    control={form.control}
                    name="commitDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Commit Description (optional)</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field} disabled={isLoading || field.disabled}
                                    className="max-h-64 resize-y"
                                />
                            </FormControl>
                            <FormDescription>
                                {commitDescription}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </>
    )
}
