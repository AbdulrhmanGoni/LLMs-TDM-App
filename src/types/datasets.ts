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
