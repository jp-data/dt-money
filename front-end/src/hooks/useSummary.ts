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
        { income: 0, outcome: 0, total: 0 }
    )

    return summary
}