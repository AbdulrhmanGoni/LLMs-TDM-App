import { z } from "zod";

const MAX_DATASET_NAME_LENGHT = 100;
const MAX_DATASET_DESCRIPTION_LENGHT = 150;

const datasetFormSchemaRules = {
  name: z
    .string()
    .min(2, {
      message: "Dataset name must be at least 2 characters.",
    })
    .max(MAX_DATASET_NAME_LENGHT, {
      message: `Dataset name must not be over ${MAX_DATASET_NAME_LENGHT} characters.`,
    }),
  description: z
    .string()
    .min(2, {
      message: "Dataset description must be at least 2 characters.",
    })
    .max(MAX_DATASET_DESCRIPTION_LENGHT, {
      message: `Dataset description must not be over ${MAX_DATASET_DESCRIPTION_LENGHT} characters.`,
    }),
};

export default datasetFormSchemaRules;
