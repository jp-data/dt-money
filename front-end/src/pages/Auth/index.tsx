import { Header } from "../../Components/Header";
import { FormContainer } from "./styles";
import { SignIn } from "./SignIn/sign-in";
import { SignUp } from "./SignUp/sign-up";

export function Auth() {
    return (
        <div>
            <Header showButton={false} />
            <FormContainer>
                <SignIn />
                <h2>Ou</h2>
                <SignUp />
            </FormContainer>
        </div>
    )
}



