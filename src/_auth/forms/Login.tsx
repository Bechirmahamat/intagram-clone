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
import { loginValidation } from '@/lib/validations'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { useLoginUser } from '@/lib/react-query/queryAndMutaltion'
import { toast } from 'react-toastify'
import { Loader } from 'lucide-react'
import { useUserContext } from '@/GlobalContext'

const Login = () => {
    const navigate = useNavigate()
    const { checkIsAuthenticated } = useUserContext()
    const {
        mutateAsync: loginUser,
        isPending: isLoging,
        isError,
        error,
    } = useLoginUser()
    // 1. Define your form.
    const form = useForm<z.infer<typeof loginValidation>>({
        resolver: zodResolver(loginValidation),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof loginValidation>) => {
        const loginRequest = await loginUser({
            email: values.email,
            password: values.password,
        })
        if (!loginRequest) {
            return toast.error('Credentials does not match!')
        }
        if (await checkIsAuthenticated()) {
            toast.success('welcome again!')
            navigate('/')
        } else {
            return toast.error('something went wrong!')
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4 w-[90%] max-w-[400px] pb-8 bg-dark-2 p-4 rounded-xl border-dark-4 border'
            >
                <h3 className='text-center text-lg font-semibold mb-4'>
                    Login
                </h3>
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
                <Button type='submit' className='btn flexx' disabled={isLoging}>
                    {isLoging ? <Loader /> : 'Login'}
                </Button>
                <div className='flex justify-end text-sm gap-2 w-full'>
                    <span>Don't Have Account?</span>
                    <Link to={'/register'} className='link'>
                        Register
                    </Link>
                </div>
            </form>
        </Form>
    )
}
export default Login
