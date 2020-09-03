import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Category from '../models/Category';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  category_id: string;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    category_id,
    type,
  }: Request): Promise<Transaction> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    if (type !== 'income' && type !== 'outcome') {
      throw new AppError('Invalid type use just income or outcome in type');
    }
    const { total } = await transactionsRepository.getBalance();
    if (type === 'outcome' && total < value) {
      throw new AppError('Account balance unavailable');
    }
    const transactions = transactionsRepository.create({
      title,
      value,
      type,
      category_id,
    });

    const categoriesRepository = getRepository(Category);

    const categories = categoriesRepository.create({
      title,
    });
    await categoriesRepository.save(categories);
    await transactionsRepository.save(transactions);
    return transactions;
  }
}

export default CreateTransactionService;
