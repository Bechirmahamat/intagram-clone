import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'

const PostsTabs = ({ user }: { user: {} }) => {
    const [activeTab, setActiveTab] = useState('posts') // Set initial state
    const [postLength, setPostLength] = useState(0)
    const handleTabClick = (newActiveTab: string) => {
        setActiveTab(newActiveTab)
    }

    return (
        <Tabs defaultValue={activeTab} className='w-full'>
            <TabsList className='gap-2'>
                <TabsTrigger
                    value='posts'
                    onClick={() => handleTabClick('posts')}
                    className={`border-dark-4 border gap-2 flex items-center  py-2 rounded-lg px-4 ${
                        activeTab === 'posts'
                            ? 'text-primary-600  border-primary-600'
                            : ''
                    } `}
                >
                    <img
                        src='/assets/icons/posts.svg'
                        alt=''
                        className='w-5 h-5 object-cover'
                    />
                    Posts
                </TabsTrigger>
                <TabsTrigger
                    value='reels'
                    onClick={() => handleTabClick('reels')}
                    className={`border-dark-4 border gap-2 flex items-center  py-2 rounded-lg px-4 ${
                        activeTab === 'reels'
                            ? 'text-primary-600  border-primary-600'
                            : ''
                    } `}
                >
                    <img
                        src='/assets/icons/follow.svg'
                        alt=''
                        className='w-5 h-5 object-cover'
                    />
                    Reels
                </TabsTrigger>
            </TabsList>
            {activeTab === 'posts' && (
                <TabsContent
                    value='posts'
                    className='border grid md:grid-cols-2 gap-6  lg:grid-cols-3 w-full  rounded-3xl border-dark-4 p-6'
                >
                    {user?.posts.length < 1 && (
                        <div className=''>
                            <p className='text-left text-sm text-light-3 font-semibold'>
                                No posts yet
                            </p>
                        </div>
                    )}
                    {user?.posts.map((post) => {
                        return (
                            <img
                                key={post.$id}
                                src={post.imageUrl}
                                alt='post'
                                className='w-full h-96 lg:h-80  object-cover rounded-lg'
                            />
                        )
                    })}
                </TabsContent>
            )}
            {activeTab === 'reels' && (
                <TabsContent
                    value='reels'
                    className='border grid md:grid-cols-2 gap-6  lg:grid-cols-3 w-full  rounded-3xl border-dark-4 p-6'
                >
                    <p className='text-left text-sm text-light-3 font-semibold'>
                        No Reels Yet
                    </p>
                </TabsContent>
            )}
        </Tabs>
    )
}
export default PostsTabs
