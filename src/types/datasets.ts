type DatasetRepository = {
  name: string;
  filePath: string;
  fileFormat: string;
  syncedAt: string;
  isUpToDate: boolean;
};

type Dataset = {
  _id: string;
  name: string;
  description: string;
  instructionsCount: number;
  repository?: DatasetRepository;
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

type HuggingfaceDatasetRepositoryData = {
  id: string;
  name: string;
  private: boolean;
  downloads: number;
  likes: number;
  gated: boolean;
  updatedAt: string;
};

type CreateDatasetRepositoryInput = {
  license?: string;
  isPrivate?: boolean;
  name: string;
};
