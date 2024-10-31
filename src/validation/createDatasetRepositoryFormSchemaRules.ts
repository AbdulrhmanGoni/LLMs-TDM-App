import { huggingfaceRepositoriesLicenses } from "@/constants/huggingfaceRepositoriesLicenses";
import { z } from "zod";

const MAX_FILE_NAME_LENGHT = 100;
const MIN_FILE_NAME_LENGHT = 3;

const createDatasetRepositoryFormSchemaRules = {
  name: z
    .string()
    .min(MIN_FILE_NAME_LENGHT, {
      message: `Repository name should consist at least ${MIN_FILE_NAME_LENGHT} characters.`,
    })
    .max(MAX_FILE_NAME_LENGHT, {
      message: `Repository name should not be over ${MAX_FILE_NAME_LENGHT} characters.`,
    }),

  license: z.enum(huggingfaceRepositoriesLicenses),
};

export default createDatasetRepositoryFormSchemaRules;
