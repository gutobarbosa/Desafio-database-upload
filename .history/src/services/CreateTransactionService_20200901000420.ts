// import AppError from '../errors/AppError';

import { getCustomRepository } from 'typeorm';
import Transaction from '../models/Transaction';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import TransactionRepository from '../repositories/TransactionsRepository';
interface Request {
  title: string;
  value: number;
  category: string;
  type: 'income' | 'outcome';
}

class CreateTransactionService {

  public async execute({title, value, category, type}: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
  }
}

export default CreateTransactionService;
