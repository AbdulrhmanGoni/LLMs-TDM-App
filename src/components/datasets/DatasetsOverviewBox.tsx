"use client"
import useDatasetsOverview from '@/hook/datasets/useDatasetsOverview';
import { Card, CardTitle } from '../ui/card'
import { ArrowRightIcon, DatabaseIcon } from 'lucide-react'
import { useRouter } from 'next/navigation';
import DatasetsOverviewBoxLoading from './DatasetsOverviewBoxLoading';
import DatasetsOverviewBoxError from './DatasetsOverviewBoxError';
import { Button } from '../ui/button';

export default function DatasetsOverviewBox() {

    const { data, isFetching, error, refetch } = useDatasetsOverview()
    const { push } = useRouter()

    return (
        isFetching ? <DatasetsOverviewBoxLoading /> :
            error ? <DatasetsOverviewBoxError error={error} refetch={refetch} /> : (
                <Card
                    className='flex flex-col justify-center flex-1 h-full p-6 cursor-pointer gap-2'
                >
                    <div className="flex flex-row items-center justify-between space-y-0">
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
                    <div className='flex flex-row-reverse'>
                        <Button
                            size="sm"
                            className='gap-1'
                            onClick={() => push("/datasets")}
                        >
                            {
                                data && data.totalDatasets > 7 ? "Datasets page" :
                                "Create your first dataset"
                            }
                            <ArrowRightIcon size={17} />
                        </Button>
                    </div>
                </Card>
            )
    )
}
