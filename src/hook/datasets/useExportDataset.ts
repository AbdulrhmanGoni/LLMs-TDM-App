import { z } from "zod";
import useExportingDatasetsContext from "../useExportingDatasetsContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import exportDatasetFormOptionsSchema from "@/validation/exportDatasetFormOptionsSchemaRules";

export type ExportDatasetOptionsFormType = z.infer<
  typeof exportDatasetFormOptionsSchema
>;

export default function useExportDataset(dataset: Dataset) {
  const form = useForm<ExportDatasetOptionsFormType>({
    resolver: zodResolver(exportDatasetFormOptionsSchema),
  });

  const { exportDataset, getDatasetExportingState } =
    useExportingDatasetsContext();

  function onSubmit(options: ExportDatasetOptionsFormType) {
    if (options.handler === "App") {
      const datasetExportingState = getDatasetExportingState(dataset);
      !datasetExportingState?.isExporting && exportDataset(dataset, options);
    } else {
      const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
      const link = document.createElement("a");
      link.href = `${baseUrl}/export/${dataset._id}?format=${options.format}`;
      document.body.appendChild(link);
      link.click();
    }
  }

  return {
    form,
    onSubmit,
  };
}
