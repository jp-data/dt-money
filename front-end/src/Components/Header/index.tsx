import { ButtonsContainer, HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import * as Dialog from '@radix-ui/react-dialog'
import logoImg from '../../assets/logo.svg'
import { NewTransactionModal } from "../NewTransactionModal";
import { Logout } from "./Logout";

interface HeaderProps {
    showButton?: boolean
}

export function Header({ showButton = true }: HeaderProps) {
    return (
        <HeaderContainer>
            <HeaderContent>
                <img src={logoImg} />
                <ButtonsContainer>
                    <Logout />
                    {showButton && (
                        <Dialog.Root>
                            <Dialog.Trigger asChild>
                                <NewTransactionButton>Nova transação</NewTransactionButton>
                            </Dialog.Trigger>
                            <NewTransactionModal />
                        </Dialog.Root>
                    )}
                </ButtonsContainer>
            </HeaderContent>
        </HeaderContainer>
    )
}