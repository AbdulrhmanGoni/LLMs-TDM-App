type Dataset = {
  _id: string;
  name: string;
  description: string;
  instructionsCount: number;
} & ResourceDateInfo;

type DatasetsOverview = {
  totalDatasets: number;
  addedDatasetsLastMonth: number;
};

type DatasetInstructionsPage = {
  areThereMore: boolean;
  instructions: Instruction[];
};

type ExportFileExtention = `.${"jsonl" | "csv"}`;

type ExportFileFormat = "CSV" | "JSONL";

type ExportDatasetOptions = {
  format: ExportFileFormat;
};
