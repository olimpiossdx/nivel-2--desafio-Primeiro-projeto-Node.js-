import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeAmount = this.transactions.reduce((income, transation) => {
      if (transation.type === 'income') {
        return income + transation.value;
      }
      return income;
    }, 0);

    const outcomeAmount = this.transactions.reduce((income, transation) => {
      if (transation.type === 'outcome') {
        return income + transation.value;
      }
      return income;
    }, 0);

    return {
      income: incomeAmount,
      outcome: outcomeAmount,
      total: incomeAmount - outcomeAmount,
    };
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
