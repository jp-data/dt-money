import { Funnel } from 'phosphor-react';
import { SearchFormContainer } from './styles';
import { memo, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog'
import { SearchTransactionsModal } from './components/SearchTransactionsModal';


interface SearchProductsProps {
    onSearch: (value: string) => void
    onApplyFilters: (filters: { monthYear: string; type: string; category: string }) => void;
}

function SearchFormComponent({ onSearch, onApplyFilters }: SearchProductsProps) {
    const [open, setOpen] = useState(false)

    const handleTransactionOrCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        onSearch(value)
    }
    return (
        <>
            <SearchFormContainer>
                <input type="text" placeholder="Busque por transações ou categoria" onChange={handleTransactionOrCategoryChange} />
                <Dialog.Root open={open} onOpenChange={setOpen}>
                    <Dialog.Trigger asChild onClick={() => setOpen(true)}>
                        <button>
                            <Funnel size={20} />
                            Filtro avançado
                        </button>
                    </Dialog.Trigger>
                    <SearchTransactionsModal
                        onApplyFilters={onApplyFilters}
                        onClose={() => setOpen(false)}
                        onResetFilters={() => onApplyFilters({ monthYear: '', type: '', category: '' })}
                    />
                </Dialog.Root>
            </SearchFormContainer>
        </>
    );
}

export const SearchForm = memo(SearchFormComponent);