import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";
import * as z from 'zod';
import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "../../../contexts/TransactionsContext";

const signUpFormSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
})

type SignUpForm = z.infer<typeof signUpFormSchema>

export function SignUp() {
    const createUser = useContextSelector(TransactionsContext, (context) => {
        return context.createUser
    })

    const { register: registerSignUp, handleSubmit: handleSubmitSignUp, reset } = useForm<SignUpForm>({
        resolver: zodResolver(signUpFormSchema)
    })

    async function handleCreateNewUser(data: SignUpForm) {
        const { name, email, password } = data;

        if (!name || !email || !password) {
            toast.error("Todos os campos são obrigatórios!");
            return;
        }
        try {
            await createUser({
                name,
                email,
                password
            })

            reset()
            toast.success('Cadastro realizado com sucesso.')
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message || 'Ocorreu um erro, tente novamente.');
            } else {
                toast.error('Erro desconhecido.');
            }
        }
    }

    return (
        <form onSubmit={handleSubmitSignUp(handleCreateNewUser)}>
            <h1>Faça seu cadastro</h1>
            <input type="text" placeholder="Nome" {...registerSignUp('name')} />
            <input
                type="text"
                placeholder="Email"
                {...registerSignUp('email')}

            />
            <input type="password" placeholder="Senha" {...registerSignUp('password')} />
            <button type="submit">Cadastrar</button>
        </form>

    )
}