import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { TransactionsContext } from '../../../contexts/TransactionsContext';
import { useContextSelector } from 'use-context-selector';

const signInFormSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

type SignInForm = z.infer<typeof signInFormSchema>


export function SignIn() {
    const navigate = useNavigate()
    const { authenticatedUser: createLogin, login } = useAuth()

    const { register: registerSignIn, handleSubmit: handleSubmitSignIn } = useForm<SignInForm>({
        resolver: zodResolver(signInFormSchema)
    })

    const fetchTransactions = useContextSelector(TransactionsContext, context => context.fetchTransactions)


    async function handleLogin(data: SignInForm) {
        const { email, password } = data;
        if (!email || !password) {
            toast.error("Todos os campos são obrigatórios!")
        }
        try {
            const response = await createLogin({
                email,
                password
            })
            login(response.access_token)
            await fetchTransactions()
            navigate('/transactions')

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMessage = error.response.data.message
                const errorType = error.response.data.error

                if (errorType === 'InvalidCredentials') {
                    toast.error('Dados inválidos')
                } else {
                    toast.error(errorMessage || 'Erro de formulário')
                }
            }
        }
    }
    return (
        <form onSubmit={handleSubmitSignIn(handleLogin)}>
            <h1>Já possui uma conta?</h1>
            <input type="email" placeholder="Email" {...registerSignIn('email')} />
            <input type="password" placeholder="Senha" {...registerSignIn('password')} />
            <button>Login</button>
        </form>
    )
}