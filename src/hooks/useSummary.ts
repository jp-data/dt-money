import { TransactionsContext } from "../contexts/TransactionsContext"
import { useContextSelector } from "use-context-selector"

export function useSummary() {
    const transactions = useContextSelector(TransactionsContext, (context) => {
        return context.transactions
    })

    // reduce: permite percorrer um array e reduzir o array a uma nova estrutura
    // primeiro parametro: função / segundo parametro: estrutura de dados inicial
    const summary = transactions.reduce(
        (acc, transaction) => {
            if (transaction.type === 'income') {
                acc.income += transaction.price
                acc.total += transaction.price
            } else {
                acc.outcome += transaction.price;
                acc.total -= transaction.price 
            }
            
            return acc
        },
        // segundo parametro
        { income: 0, outcome: 0, total: 0} 
    )

    return summary
}

// const numeros = [1, 3, 5, 10]
// const total = numeros.reduce((acc, element) => {
//     return acc + element
// })

// console.log(total)

// const itens = [
//     {description: 'pen', quantity: 2, price: 3},
//     {description: 'rule', quantity: 2, price: 5},
//     {description: 'erase', quantity: 3, price: 6},
// ]

// const total = itens.reduce((soma, itemAtual) => {
//     return soma + (itemAtual.price * itemAtual.quantity)
// }, 0)

// console.log(total)