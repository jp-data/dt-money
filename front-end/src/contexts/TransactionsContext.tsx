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

interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
  createUser: (data: CreateUserInput) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode
}

interface CreateUserInput {
  name: string
  email: string
  password: string
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = useCallback(
    async () => {
      const response = await api.get('/transactions')

      setTransactions(response.data)
    },
    []
  )

  const createTransaction = useCallback(async (data: CreateTransactionInput) => {
    const { category, description, price, type } = data;

    const response = await api.post('/transactions', {
      description,
      category,
      price,
      type,
      createdAt: new Date(),
    })
    setTransactions(state => [response.data, ...state])

  },
    []
  )

  useEffect(() => {
    fetchTransactions()
  }, []);

  const createUser = useCallback(async (data: CreateUserInput) => {
    const { name, email, password } = data

    await api.post('/users', {
      name,
      email,
      password
    })
  }, [])

  return (
    <TransactionsContext.Provider value={{
      transactions,
      fetchTransactions,
      createTransaction,
      createUser
    }}>
      {children}
    </TransactionsContext.Provider>
  );
}