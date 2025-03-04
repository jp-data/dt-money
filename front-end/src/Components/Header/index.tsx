import { ButtonsContainer, HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import * as Dialog from '@radix-ui/react-dialog'
import logoImg from '../../assets/logo.svg'
import { NewTransactionModal } from "../NewTransactionModal";
import { Logout } from "./Logout";

interface HeaderProps {
    showTransactionButton?: boolean
    showLogoutButton?: boolean
}

export function Header({ showTransactionButton = true, showLogoutButton = true }: HeaderProps) {
    return (
        <HeaderContainer>
            <HeaderContent>
                <img src={logoImg} />
                <ButtonsContainer>
                    {showLogoutButton && (
                        <Logout />
                    )}
                    {showTransactionButton && (
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