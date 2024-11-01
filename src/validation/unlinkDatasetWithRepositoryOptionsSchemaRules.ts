import { z } from "zod";
import commitOptionsSchemaRules from "./commitOptionsSchemaRules";

const unlinkDatasetWithRepositoryOptionsSchema = z.object({
  deleteRepository: z.boolean().optional().default(false),
  deleteDatasetFile: z.boolean().optional().default(false),
  commitTitle: commitOptionsSchemaRules.commitTitle,
  commitDescription: commitOptionsSchemaRules.commitDescription,
});

export default unlinkDatasetWithRepositoryOptionsSchema;
