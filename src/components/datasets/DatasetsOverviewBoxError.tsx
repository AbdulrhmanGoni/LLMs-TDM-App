import { RotateCcwIcon } from 'lucide-react'
import Alert from '../Alert'
import { WithErrorAndRefetch } from '@/lib/FetchError'

export default function DatasetsOverviewBoxError({ refetch, error }: WithErrorAndRefetch) {
    return (
        <Alert
            variant='error'
            message='An Error happened while fetching dataset overview'
            action={() => refetch()}
            ActionIcon={RotateCcwIcon}
        />
    )
}
