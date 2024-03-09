import { Models } from 'appwrite'
import { Button } from '../ui/button'

const TopCreators = ({ topCreators }: { topCreators: Models.Document[] }) => {
    console.log(topCreators)

    return (
        <div className=' w-full px-4 py-4 bg-dark-1 h-full'>
            <h3 className='mt-6 mb-6 text-xl font-semibold'>Top Creators</h3>
            <ul className=' grid grid-cols-2 gap-4'>
                {topCreators.map((user: Models.Document) => {
                    return (
                        <li
                            key={user.$id}
                            className='border-dark-4 border rounded-xl flex flex-col items-center justify-center p-4'
                        >
                            <img
                                src={user.imageUrl}
                                alt=''
                                className='h-8 w-8 rounded-full'
                            />
                            <p className='text-sm my-1'>{user.name}</p>
                            <p className='text-light-3 mb-2 text-[10px]'>
                                followed by bechir
                            </p>

                            <button className='text-xs  py-1 rounded-md px-2 bg-blue-800'>
                                Follow
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
export default TopCreators
