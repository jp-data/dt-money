import { Header } from "../../Components/Header";
import { FormContainer } from "./styles";

export function Auth() {
    return (
        <div>
            <Header showButton={false} />
            <FormContainer>
                <form action="">
                    <h1>Já possui uma conta?</h1>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Senha" />
                    <button>Login</button>
                </form>
                <h2>Ou</h2>
                <form>
                    <h1>Faça seu cadastro</h1>
                    <input type="text" placeholder="Nome" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Senha" />
                    <button>Cadastrar</button>
                </form>
            </FormContainer>

        </div>
    )

}