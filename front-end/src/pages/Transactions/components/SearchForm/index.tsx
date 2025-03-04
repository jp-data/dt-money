import { MagnifyingGlass } from 'phosphor-react';
import { SearchFormContainer } from './styles';
import { memo } from 'react';
import * as Dialog from '@radix-ui/react-dialog'
import { SearchTransactionsModal } from './components/SearchTransactionsModal';


interface SearchProductsProps {
    onSearch: (value: string) => void
    onApplyFilters: (filters: { monthYear: string; type: string; category: string }) => void;
}

function SearchFormComponent({ onSearch, onApplyFilters }: SearchProductsProps) {

    const handleTransactionOrCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        onSearch(value)
    }
    return (
        <>
            <SearchFormContainer>
                <input type="text" placeholder="Busque por transações ou categoria" onChange={handleTransactionOrCategoryChange} />
                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <button>
                            <MagnifyingGlass size={20} />
                            Filtro avançado
                        </button>
                    </Dialog.Trigger>
                    <SearchTransactionsModal onApplyFilters={onApplyFilters} />
                </Dialog.Root>
            </SearchFormContainer>
        </>
    );
}

export const SearchForm = memo(SearchFormComponent);