import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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
import { Input } from '@/components/ui/input'
import { registerValidation } from '@/lib/validations'
import { Link } from 'react-router-dom'
import { useRegisterUser } from '@/lib/react-query/queryAndMutaltion'

const Register = () => {
    const { mutateAsync: createUserAccount, isPending: isCreatingUserAccount } =
        useRegisterUser()

    const form = useForm<z.infer<typeof registerValidation>>({
        resolver: zodResolver(registerValidation),
        defaultValues: {
            email: '',
            password: '',
            name: '',
            username: '',
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof registerValidation>) => {
        const userAccount = await createUserAccount(values)
        console.log(userAccount)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4 w-[90%] max-w-[400px] pb-8 bg-dark-2 p-4 rounded-xl border-dark-4 border my-4'
            >
                <h3 className='text-center text-lg font-semibold mb-4'>
                    Register
                </h3>
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormLabel>Name</FormLabel>
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
                    name='username'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormLabel>Username</FormLabel>
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
                    name='email'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type='email'
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
                    name='password'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type='password'
                                    {...field}
                                    className='input'
                                />
                            </FormControl>
                            <FormMessage className='text-orange-800' />
                        </FormItem>
                    )}
                />
                <Button type='submit' className='btn'>
                    Submit
                </Button>
                <div className='flex justify-end text-sm gap-2 w-full'>
                    <span>Already Have An Account?</span>
                    <Link to={'/login'} className='link'>
                        Login
                    </Link>
                </div>
            </form>
        </Form>
    )
}
export default Register
