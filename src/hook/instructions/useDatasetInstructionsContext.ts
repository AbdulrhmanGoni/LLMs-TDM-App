import { datasetInstructionsContext } from "@/contexts/DatasetInstructionsContext";
import { useContext } from "react";

export default function useDatasetInstructionsContext() {
  return useContext(datasetInstructionsContext);
}
