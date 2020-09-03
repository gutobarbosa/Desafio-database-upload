import { EntityRepository, Repository } from 'typeorm';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const transactions = await this.find();

    const {income,outcome} = transactions.map()
  }
}

export default TransactionsRepository;
