import { z } from "zod";

const MAX_INSTRUCTION_SYS_MSG_LENGHT = 500;
const MAX_INSTRUCTION_QUESTION_LENGHT = 5000;
const MAX_INSTRUCTION_ANSWER_LENGHT = 5000;

const MIN_INSTRUCTION_SYS_MSG_LENGHT = 6;
const MIN_INSTRUCTION_QUESTION_LENGHT = 6;
const MIN_INSTRUCTION_ANSWER_LENGHT = 6;

const DATASET_ID_LENGHT = 24;

export const instructionFormSchemaRules = {
  systemMessage: z
    .string()
    .refine(
      (input) => !input || input.length >= MIN_INSTRUCTION_SYS_MSG_LENGHT,
      {
        message: `System Message must be at least ${MIN_INSTRUCTION_SYS_MSG_LENGHT} characters.`,
      }
    )
    .refine(
      (input) => !input || input.length <= MAX_INSTRUCTION_SYS_MSG_LENGHT,
      {
        message: `System Message must not be over ${MAX_INSTRUCTION_SYS_MSG_LENGHT} characters.`,
      }
    )
    .optional(),
  question: z
    .string()
    .min(MIN_INSTRUCTION_QUESTION_LENGHT, {
      message: `The question must be at least ${MIN_INSTRUCTION_QUESTION_LENGHT} characters.`,
    })
    .max(MAX_INSTRUCTION_QUESTION_LENGHT, {
      message: `The question must not be over ${MAX_INSTRUCTION_QUESTION_LENGHT} characters.`,
    }),
  answer: z
    .string()
    .min(MIN_INSTRUCTION_ANSWER_LENGHT, {
      message: `The answer must be at least ${MIN_INSTRUCTION_ANSWER_LENGHT} characters.`,
    })
    .max(MAX_INSTRUCTION_ANSWER_LENGHT, {
      message: `The answer must not be over ${MAX_INSTRUCTION_ANSWER_LENGHT} characters.`,
    }),
  datasetId: z
    .string()
    .min(DATASET_ID_LENGHT, {
      message: `The dataset id must consist of ${DATASET_ID_LENGHT} characters.`,
    })
    .max(DATASET_ID_LENGHT, {
      message: `The dataset id must consist of ${DATASET_ID_LENGHT} characters.`,
    }),
};

export default instructionFormSchemaRules;
