import { ReactNode, useEffect, useState, useCallback } from 'react';
import { api } from '../lib/axios'
import { createContext } from 'use-context-selector';

interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

interface CreateTransactionInput {
  description: string,
  type: 'income' | 'outcome',
  price: number,
  category: string,
}

interface FilteredTransactionInput {
  category: string
  type: string
  monthYear: string
}

interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: () => Promise<void>;
  fetchFilteredTransactions: (data: FilteredTransactionInput) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = useCallback(
    async () => {

      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('Usuário não autenticado.')
      }

      const response = await api.get('/transactions', {
        headers: {
          authorization: `Bearer ${token}`
        },
      })

      setTransactions(response.data)
    },
    []
  )

  const fetchFilteredTransactions = useCallback(
    async ({ category, type, monthYear }: { category: string, type: string, monthYear: string }) => {

      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('Usuário não autenticado.')
      }

      const response = await api.get(`/transactions/filter?category=${category}&type=${type}&monthYear=${monthYear}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setTransactions(response.data)
    }, []
  )

  const createTransaction = useCallback(async (data: CreateTransactionInput) => {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Uusário não autenticado.')
    }

    const { category, description, price, type } = data;

    const response = await api.post('/transactions', {
      description,
      category,
      price,
      type,
      createdAt: new Date(),
    },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    setTransactions(state => [response.data, ...state])
  },
    []
  )

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetchTransactions()
    }
  }, [])


  return (
    <TransactionsContext.Provider value={{
      transactions,
      fetchTransactions,
      createTransaction,
      fetchFilteredTransactions
    }}>
      {children}
    </TransactionsContext.Provider>
  );
}