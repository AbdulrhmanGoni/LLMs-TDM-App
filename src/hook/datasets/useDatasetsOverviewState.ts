import { useQueryClient } from "@tanstack/react-query";

export default function useDatasetsOverviewState() {
  const QueryClient = useQueryClient();

  function increaseDatasetsCount(
    amount: number,
    createdAt: Dataset["createdAt"] = new Date().toString()
  ) {
    const lastMonthDate = new Date().setMonth(new Date().getMonth() - 1);

    const isAddedLastMonth = lastMonthDate < new Date(createdAt).getTime();

    QueryClient.setQueryData<DatasetsOverview>(
      ["datasets-overview"],
      (preData) => {
        if (preData) {
          return {
            totalDatasets: preData.totalDatasets + amount,
            addedDatasetsLastMonth:
              preData.addedDatasetsLastMonth + (isAddedLastMonth ? amount : 0),
          };
        }
      }
    );
  }

  return {
    increaseDatasetsCount() {
      increaseDatasetsCount(1);
    },
    decreaseDatasetsCount(createdAt: Dataset["createdAt"]) {
      increaseDatasetsCount(-1, createdAt);
    },
  };
}
