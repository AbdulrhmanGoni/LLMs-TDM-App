import { z } from "zod";
import useExportingDatasetsContext from "../useExportingDatasetsContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import exportDatasetFormOptionsSchema from "@/validation/exportDatasetFormOptionsSchemaRules";
import downloadDatasetRequest from "@/lib/downloadDatasetRequest";

export type ExportDatasetOptionsFormType = z.infer<
  typeof exportDatasetFormOptionsSchema
>;

type UseExportDatasetProps = {
  dataset: Dataset;
  closeForm: () => void
}

export default function useExportDataset({ dataset, closeForm }: UseExportDatasetProps) {
  const form = useForm<ExportDatasetOptionsFormType>({
    resolver: zodResolver(exportDatasetFormOptionsSchema),
  });

  const { exportDataset, getDatasetExportingState } =
    useExportingDatasetsContext();

  function onSubmit(options: ExportDatasetOptionsFormType) {
    if (options.handler === "App" && 'showSaveFilePicker' in window) {
      const datasetExportingState = getDatasetExportingState(dataset);
      !datasetExportingState?.isExporting && exportDataset(dataset, options);
    } else {
      downloadDatasetRequest(
        `export/${dataset._id}?format=${options.format}`,
        `dataset-${dataset._id}.${options.format.toLowerCase()}`
      )
    }

    closeForm()
  }

  return {
    form,
    onSubmit,
  };
}
