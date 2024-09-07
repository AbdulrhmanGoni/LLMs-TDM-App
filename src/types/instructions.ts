type InstructionBase = {
  _id: string;
  systemMessage?: string;
  question: string;
  answer: string;
};

type Instruction = InstructionBase & {
  datasetId: Dataset["_id"];
} & ResourceDateInfo;
