import CreatePostForm from '@/components/shared/CreatePostForm'

const CreatePost = () => {
    return (
        <div className=' my-4'>
            <div className='flex gap-2 items-center text-xl mb-3'>
                <img
                    src='/assets/icons/add-post.svg'
                    alt='post-icon'
                    className='w-12 h-12'
                />
                <h4>Create Post</h4>
            </div>
            <CreatePostForm />
        </div>
    )
}
export default CreatePost
