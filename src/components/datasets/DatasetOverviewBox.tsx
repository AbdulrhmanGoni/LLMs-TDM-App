"use client"
import useDatasetsOverview from '@/hook/datasets/useDatasetsOverview';
import { Card, CardTitle } from '../ui/card'
import { DatabaseIcon } from 'lucide-react'
import { useRouter } from 'next/navigation';
import DatasetOverviewBoxLoading from './DatasetOverviewBoxLoading';
import Alert from '../Alert';

export default function DatasetOverviewBox() {

    const { data, isFetching, error } = useDatasetsOverview()
    const { push } = useRouter()

    return (
        isFetching ? <DatasetOverviewBoxLoading /> :
            error ? <Alert variant='error' message='An Error happened while fetching dataset overview' /> : (
                <Card
                    className='flex flex-col justify-center flex-1 h-full p-6 cursor-pointer'
                    onClick={() => push("/datasets")}
                >
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xl font-medium">Datasets</CardTitle>
                        <DatabaseIcon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                        <span className="text-2xl font-bold">{data?.totalDatasets}</span>
                        <p className="text-md text-muted-foreground">
                            +{data?.addedDatasetsLastMonth} since last month
                        </p>
                    </div>
                </Card>
            )
    )
}
