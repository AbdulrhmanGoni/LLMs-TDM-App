import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className='w-full flex flex-1 justify-center items-center'>
            <SignUp />
        </div>
    )
}