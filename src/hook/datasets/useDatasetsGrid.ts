import fetchAPI from "@/lib/fetchAPI";
import FetchError from "@/lib/FetchError";
import { useQuery } from "@tanstack/react-query";

export default function useDatasetsGrid() {
  return useQuery<Dataset[], FetchError>({
    queryKey: ["datasets"],
    async queryFn() {
      const { body } = await fetchAPI<{ data: Dataset[] }>("datasets");
      return body.data;
    },
  });
}
