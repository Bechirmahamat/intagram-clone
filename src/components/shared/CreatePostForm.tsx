import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { PostValidation } from '@/lib/validations'
import FIleUploader from './FIleUploader'
import { useCreatePost } from '@/lib/react-query/queryAndMutaltion'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Loader } from '.'
import { User } from 'lucide-react'
import { useUserContext } from '@/GlobalContext'

const CreatePostForm = () => {
    //
    const { user } = useUserContext()
    const navigate = useNavigate()
    const { mutateAsync: createPost, isPending: isPostCreating } =
        useCreatePost()
    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
            caption: '',
            file: [],
            location: '',
            tags: '',
        },
    })

    async function onSubmit(values: z.infer<typeof PostValidation>) {
        const newPost = createPost({ ...values, creatorId: user.id })
        if (!newPost) {
            toast.error('Opps something went Wrong .please try again!')
            return
        }
        toast.success('Post Created')
        form.reset()
        navigate('/')
        return
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4 w-full max-w-[500px] mx-auto pb-8 bg-dark-2 p-4 rounded-xl border-dark-4 border'
            >
                <h1 className='text-center '>Please fill out the form</h1>
                <FormField
                    control={form.control}
                    name='caption'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Caption</FormLabel>
                            <FormControl>
                                <Input
                                    type='text'
                                    {...field}
                                    className='input'
                                />
                            </FormControl>

                            <FormMessage className='text-orange-800' />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='file'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>image</FormLabel>
                            <FormControl>
                                <FIleUploader onChange={field.onChange} />
                            </FormControl>

                            <FormMessage className='text-orange-800' />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='location'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Input
                                    type='text'
                                    {...field}
                                    className='input'
                                />
                            </FormControl>

                            <FormMessage className='text-orange-800' />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='tags'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Tags (seperate you tags with comma ' , ')
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type='text'
                                    {...field}
                                    className='input'
                                />
                            </FormControl>

                            <FormMessage className='text-orange-800' />
                        </FormItem>
                    )}
                />
                <div className=' flex justify-end gap-2'>
                    <Button
                        type='button'
                        className='bg-orange-900'
                        disabled={isPostCreating}
                    >
                        Cancel
                    </Button>
                    <Button
                        type='submit'
                        className='bg-blue-950'
                        disabled={isPostCreating}
                    >
                        {isPostCreating ? <Loader /> : 'Submit'}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
export default CreatePostForm
