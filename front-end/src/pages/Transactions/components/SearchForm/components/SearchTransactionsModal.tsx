import * as Dialog from '@radix-ui/react-dialog';
import { CloseButton, Content, Overlay, ReloadAndCloseButton, ReloadButton, TransactionType, TransactionTypeButton } from './styles';
import { ArrowCircleDown, ArrowCircleUp, X, ClockClockwise } from 'phosphor-react';
import { Controller, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


interface SearchTransactionsModalProps {
    onApplyFilters: (filters: { monthYear: string; type: string; category: string }) => void
    onResetFilters: () => void;
    onClose: () => void
}

interface SearchFiltersFormInput {
    monthYear: string
    type: string
    category: string
}

const searchFiltersSchema = z.object({
    monthYear: z.string().optional(),
    type: z.string().optional(),
    category: z.string().optional(),
})

type SearchFiltersFormInputs = z.infer<typeof searchFiltersSchema>;

export function SearchTransactionsModal({ onApplyFilters, onClose, onResetFilters }: SearchTransactionsModalProps) {
    const { control, handleSubmit, formState: { isSubmitting }, reset } = useForm<SearchFiltersFormInput>({
        resolver: zodResolver(searchFiltersSchema),
        defaultValues: {
            monthYear: '',
            type: '',
            category: '',
        }
    })

    const handleSearchFilters = (data: SearchFiltersFormInputs) => {
        onApplyFilters({
            monthYear: data.monthYear || '',
            type: data.type || '',
            category: data.category || '',
        })
        onClose()
    }
    return (
        <>
            <Dialog.Portal>
                <Overlay />
                <Content>
                    <Dialog.Title>Filtros</Dialog.Title>
                    <ReloadAndCloseButton>
                        <ReloadButton type="button" onClick={() => {
                            reset({
                                monthYear: '',
                                type: '',
                                category: ''
                            });
                            onResetFilters();
                        }
                        }>
                            <ClockClockwise size={24} />
                        </ReloadButton>
                        <CloseButton onClick={onClose}>
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