import { useContext } from "react";
import { datasetPageContext } from "@/contexts/DatasetPageContext";

export default function useDatasetPageContext() {
  return useContext(datasetPageContext);
}
