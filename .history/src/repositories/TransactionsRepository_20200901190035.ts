import { EntityRepository, Repository, getRepository } from 'typeorm';
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
  category: string;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getTransactions = getRepository(Transaction);
    const transactions = await getTransactions.find();
    //console.log(transactions);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const income = transactions
      .map(transaction => {
        if (transaction.type === 'income') {
          return transaction.value;
        }
        return 0;
      })
      .reduce((accumulator, actually) => {
        return accumulator + actually;
      }, 0);
    console.log(income);

    const outcome = transactions
      .map(transaction => {
        if (transaction.type === 'outcome') {
          return transaction.value;
        }
        return 0;
      })
      .reduce((accumulator, actually) => {
        return accumulator + actually;
      }, 0);
      console.log(income);

    const total = income - outcome;

    console.log(total);
    const balance = { income, outcome, total };

    return balance;
  }
}

export default TransactionsRepository;
