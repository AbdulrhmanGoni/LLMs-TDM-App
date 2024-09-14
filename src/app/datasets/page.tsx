import DatasetsGridSection from "@/components/datasets/DatasetsGridSection";
import DatasetsPageGreeting from "@/components/datasets/DatasetsPageGreeting";

export default function page() {
    return (
        <div className="w-full space-y-3">
            <DatasetsPageGreeting />
            <DatasetsGridSection />
        </div>
    )
}
