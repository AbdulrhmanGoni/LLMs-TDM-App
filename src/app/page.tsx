import DatasetsOverviewBox from "@/components/datasets/DatasetsOverviewBox";
import HomePageGreeting from "@/components/HomePageGreeting";
import RecentDatasetsActivities from "@/components/recent-activities/RecentDatasetsActivities";
import RecentInstructionsActivities from "@/components/recent-activities/RecentInstructionsActivities";

export default async function Home() {

  return (
    <div className="grid grid-cols-3 flex-1 h-fit gap-2">
      <div className="col-span-full md:col-span-2">
        <HomePageGreeting />
      </div>
      <div className="col-span-full md:col-span-1">
        <DatasetsOverviewBox />
      </div>
      <div className="col-span-full md:col-span-1">
        <RecentDatasetsActivities />
      </div>
      <div className="col-span-full md:col-span-2">
        <RecentInstructionsActivities />
      </div>
    </div>
  );
}
