import { z } from "zod";

const MAX_COMMIT_TITLE_LENGHT = 56;
const MAX_COMMIT_DESCRIPTION_LENGHT = 1000;

const commitOptionsSchemaRules = {
  commitTitle: z
    .string()
    .max(MAX_COMMIT_TITLE_LENGHT, {
      message: `Commit title must not be over ${MAX_COMMIT_TITLE_LENGHT} characters.`,
    })
    .optional()
    .or(z.literal("")),
  commitDescription: z
    .string()
    .max(MAX_COMMIT_DESCRIPTION_LENGHT, {
      message: `Commit description must not be over ${MAX_COMMIT_DESCRIPTION_LENGHT} characters.`,
    })
    .optional()
    .or(z.literal("")),
};

export default commitOptionsSchemaRules;
