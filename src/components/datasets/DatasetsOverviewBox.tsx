"use client"
import useDatasetsOverview from '@/hook/datasets/useDatasetsOverview';
import { Card, CardTitle } from '../ui/card'
import { DatabaseIcon } from 'lucide-react'
import { useRouter } from 'next/navigation';
import DatasetsOverviewBoxLoading from './DatasetsOverviewBoxLoading';
import DatasetsOverviewBoxError from './DatasetsOverviewBoxError';

export default function DatasetsOverviewBox() {

    const { data, isFetching, error, refetch } = useDatasetsOverview()
    const { push } = useRouter()

    return (
        isFetching ? <DatasetsOverviewBoxLoading /> :
            error ? <DatasetsOverviewBoxError error={error} refetch={refetch} /> : (
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
                            {
                                data?.addedDatasetsLastMonth ?
                                    `+${data?.addedDatasetsLastMonth} since last month` :
                                    "no datasets added last month"
                            }
                        </p>
                    </div>
                </Card>
            )
    )
}
