import { useContextSelector } from "use-context-selector";
import { Header } from "../../Components/Header";
import { FormContainer } from "./styles";
import * as z from 'zod';
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";

const signInFormSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
})

type SignInForm = z.infer<typeof signInFormSchema>

export function Auth() {
    const createUser = useContextSelector(TransactionsContext, (context) => {
        return context.createUser
    })

    const { register, handleSubmit, reset } = useForm<SignInForm>({
        resolver: zodResolver(signInFormSchema)
    })


    async function handleCreateNewUser(data: SignInForm) {
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
        <div>
            <Header showButton={false} />
            <FormContainer>
                <form>
                    <h1>Já possui uma conta?</h1>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Senha" />
                    <button>Login</button>
                </form>
                <h2>Ou</h2>
                <form onSubmit={handleSubmit(handleCreateNewUser)}>
                    <h1>Faça seu cadastro</h1>
                    <input type="text" placeholder="Nome" {...register('name')} />
                    <input
                        type="text"
                        placeholder="Email"
                        {...register('email')}

                    />
                    <input type="password" placeholder="Senha" {...register('password')} />
                    <button type="submit">Cadastrar</button>
                </form>
            </FormContainer>

        </div>
    )

}