const GridPostContainer = ({ posts }) => {
    return posts.map((post) => {
        return (
            <li
                key={post.$id}
                className='w-full h-[250px] sm:h-[200px] relative'
            >
                <div className='w-full h-full'>
                    <img
                        src={post.imageUrl}
                        alt='post-image'
                        className='w-full object-cover h-full rounded-xl'
                    />
                </div>
            </li>
        )
    })
}
export default GridPostContainer
