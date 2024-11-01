import { z } from "zod";
import { exportDatasetFormOptions } from "./exportDatasetFormOptionsSchemaRules";
import commitOptionsSchemaRules from "./commitOptionsSchemaRules";

const MAX_FILE_PATH_LENGHT = 500;

const pushDatasetToRepositoryOptionsSchemaRules = {
  filePath: z
    .string()
    .min(1, {
      message: "File path must consist at least of one character.",
    })
    .max(MAX_FILE_PATH_LENGHT, {
      message: `File path must not be over ${MAX_FILE_PATH_LENGHT} characters.`,
    }),
  fileFormat: z.enum(exportDatasetFormOptions.formats),
  ...commitOptionsSchemaRules,
};

export default pushDatasetToRepositoryOptionsSchemaRules;
