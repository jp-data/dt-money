import * as Dialog from '@radix-ui/react-dialog';
import { CloseButton, Content, Overlay, ReloadAndCloseButton, ReloadButton, TransactionType, TransactionTypeButton } from './styles';
import { ArrowCircleDown, ArrowCircleUp, X, ClockClockwise } from 'phosphor-react';
import { Controller, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { useState } from 'react';

interface SearchTransactionsModalProps {
    onApplyFilters: (filters: { monthYear: string; type: string; category: string }) => void
}

export function SearchTransactionsModal({ onApplyFilters }: SearchTransactionsModalProps) {
    const { control, handleSubmit, formState: { isSubmitting } } = useForm()

    const handleSearchFilters = (data: any) => {
        onApplyFilters({
            monthYear: data.monthYear || '',
            type: data.type || '',
            category: data.category || '',
        })
    }
    return (
        <>
            <Dialog.Portal>
                <Overlay />
                <Content>
                    <Dialog.Title>Filtros</Dialog.Title>
                    <ReloadAndCloseButton>
                        <ReloadButton type="button">
                            <ClockClockwise size={24} />
                        </ReloadButton>
                        <CloseButton>
                            <X size={24} />
                        </CloseButton>
                    </ReloadAndCloseButton>

                    <form onSubmit={handleSubmit(handleSearchFilters)}>
                        <Controller
                            control={control}
                            name="monthYear"
                            render={({ field }) => (
                                <InputMask
                                    {...field}
                                    mask="99/9999"
                                    placeholder="MM/YYYY"
                                    className="input-style"
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="category"
                            render={({ field }) => (
                                <input {...field} type="text" placeholder="Categoria" />
                            )}
                        />
                        <Controller
                            control={control}
                            name='type'
                            render={({ field }) => {
                                return (
                                    <TransactionType
                                        onValueChange={(value) => field.onChange(value)}
                                        value={field.value}
                                    >
                                        <TransactionTypeButton variant="income" value="income">
                                            <ArrowCircleUp size={24} />
                                            Entrada
                                        </TransactionTypeButton>
                                        <TransactionTypeButton variant="outcome" value="outcome">
                                            <ArrowCircleDown size={24} />
                                            Saída
                                        </TransactionTypeButton>
                                    </TransactionType>
                                )
                            }}
                        />
                        <button type='submit' disabled={isSubmitting}>
                            Buscar
                        </button>
                    </form>
                </Content>
            </Dialog.Portal>
        </>
    )
}