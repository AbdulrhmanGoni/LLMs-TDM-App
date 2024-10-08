"use client"
import useDatasetsGrid from '@/hook/datasets/useDatasetsGrid'
import DatasetGridCard from './DatasetGridCard'
import DatasetGridLoading from './DatasetGridLoading'
import DatasetsGridError from './DatasetsGridError'
import NoDatasetsMessage from './NoDatasetsMessage'

export default function DatasetsGrid() {

    const { data, isFetching, error, refetch } = useDatasetsGrid();

    return (
        <div className="max-h-[500px] grid gap-3 md:grid-cols-2 flex-1 overflow-auto pe-1">
            {
                isFetching ? <DatasetGridLoading /> :
                    error ? <DatasetsGridError refetch={refetch} error={error} /> :
                        data?.length ? data.map((dataset) => (
                            <DatasetGridCard key={dataset._id} dataset={dataset} />
                        )) : <NoDatasetsMessage />
            }
        </div>
    )
}
