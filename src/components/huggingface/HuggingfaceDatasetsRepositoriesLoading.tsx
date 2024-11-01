import { Skeleton } from "../ui/skeleton";

export default function HuggingfaceDatasetsRepositoriesLoading() {
  return Array.from(new Array(4)).map((_item, i) => (
    <Skeleton key={i} className="w-full h-8" />
  ));
}
