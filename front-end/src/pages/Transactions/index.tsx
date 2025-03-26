import { Header } from "../../Components/Header";
import { Summary } from "../../Components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { useContextSelector } from "use-context-selector";
import { useState } from "react";


export function Transactions() {
    const [searchValue, setSearchValue] = useState('')
    const [filters, setFilters] = useState({
        monthYear: '',
        type: '',
        category: ''
    })
    const transactions = useContextSelector(TransactionsContext, (context) => {
        return context.transactions
    })

    const handleSearch = (value: string) => {
        setSearchValue(value)
    }

    const transactionsFiltered = transactions.filter(transaction => {
        const inputTextFilter = transaction.description.toLowerCase().includes(searchValue.toLowerCase()) ||
            transaction.category.toLowerCase().includes(searchValue.toLowerCase())

        const inputTextModalCategory = filters.category ? transaction.category.toLowerCase().includes(filters.category.toLowerCase()) : true;
        const inputTextModalType = filters.type ? transaction.type === filters.type : true
        const inputTextModalMonthYear = filters.monthYear
            ? new Date(transaction.createdAt).toLocaleDateString('pt-BR', { month: '2-digit', year: 'numeric' }) === filters.monthYear
            : true;

        return inputTextFilter && inputTextModalCategory && inputTextModalType && inputTextModalMonthYear
    })

    const transactionsToRender = searchValue || filters.category || filters.type || filters.monthYear ? transactionsFiltered : transactions

    return (
        <>
            <Header />
            <Summary />
            <TransactionsContainer>
                <SearchForm onSearch={handleSearch} onApplyFilters={setFilters} />
                <TransactionsTable>
                    <tbody>
                        {transactionsToRender.map(transaction => {
                            return (
                                <tr key={transaction.id}>
                                    <td width='50%'>{transaction.description}</td>
                                    <td>
                                        <PriceHighlight variant={transaction.type}>
                                            {transaction.type === 'outcome' && '- '}
                                            {priceFormatter.format(transaction.price)}
                                        </PriceHighlight>
                                    </td>
                                    <td>{transaction.category}</td>
                                    <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>
            </>
    )
}