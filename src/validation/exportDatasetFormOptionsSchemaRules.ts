import { z } from "zod";

export const exportDatasetFormOptions = {
  formats: ["CSV", "JSONL"],
  handlers: ["App", "Browser"],
} as const;

const exportDatasetFormOptionsSchema = z.object({
  format: z.enum(exportDatasetFormOptions.formats),
  handler: z.enum(exportDatasetFormOptions.handlers),
});

export default exportDatasetFormOptionsSchema;
