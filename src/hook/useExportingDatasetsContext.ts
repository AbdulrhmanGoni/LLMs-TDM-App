import { exportingDatasetsContext } from "@/contexts/ExportingDatasetsContext";
import { useContext } from "react";

export default function useExportingDatasetsContext() {
  return useContext(exportingDatasetsContext);
}
