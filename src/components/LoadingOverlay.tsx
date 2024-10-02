import { LoaderIcon } from 'lucide-react'

export default function LoadingOverlay() {
    return (
        <dialog open className="flex items-center justify-center text-center min-h-screen text-white fixed inset-0 z-50 overflow-y-auto w-full bg-black/60">
            <LoaderIcon className='animate-spin' />
        </dialog>
    )
}
