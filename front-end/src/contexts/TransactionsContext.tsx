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
  authenticatedUser: (data: CreateLogin) => Promise<{ access_token: string }>;
}

interface TransactionsProviderProps {
  children: ReactNode
}

interface CreateUserInput {
  name: string
  email: string
  password: string
}

interface CreateLogin {
  email: string
  password: string
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
        }
      })

      setTransactions(response.data)
    },
    []
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
    fetchTransactions()
  }, []);

  const createUser = useCallback(async (data: CreateUserInput) => {
    const { name, email, password } = data

    const response = await api.post('/users', {
      name,
      email,
      password
    })
    return response.data
  }, [])

  const authenticatedUser = useCallback(async (data: CreateLogin) => {
    const { email, password } = data

    const response = await api.post('/users/login', {
      email,
      password
    })
    return response.data
  }, [])

  return (
    <TransactionsContext.Provider value={{
      transactions,
      fetchTransactions,
      createTransaction,
      createUser,
      authenticatedUser
    }}>
      {children}
    </TransactionsContext.Provider>
  );
}