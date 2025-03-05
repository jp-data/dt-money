import { ButtonsContainer, HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import * as Dialog from '@radix-ui/react-dialog'
import logoImg from '../../assets/logo.svg'
import { NewTransactionModal } from "../NewTransactionModal";
import { Logout } from "./Logout";
import { useState } from "react";

interface HeaderProps {
    showTransactionButton?: boolean
    showLogoutButton?: boolean
}

export function Header({ showTransactionButton = true, showLogoutButton = true }: HeaderProps) {
    const [open, setOpen] = useState(false)

    return (
        <HeaderContainer>
            <HeaderContent>
                <img src={logoImg} />
                <ButtonsContainer>
                    {showLogoutButton && (
                        <Logout />
                    )}
                    {showTransactionButton && (
                        <Dialog.Root open={open} onOpenChange={setOpen}>
                            <Dialog.Trigger asChild onClick={() => setOpen(true)}>
                                <NewTransactionButton>Nova transação</NewTransactionButton>
                            </Dialog.Trigger>
                            <NewTransactionModal onClose={() => setOpen(false)} />
                        </Dialog.Root>
                    )}
                </ButtonsContainer>
            </HeaderContent>
        </HeaderContainer>
    )
}