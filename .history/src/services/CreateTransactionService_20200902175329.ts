import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Category from '../models/Category';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  category: string;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    category,
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
    const categoriesRepository = getRepository(Category);

    const categoriesRepositoryFind = await categoriesRepository.findOne({
      where: { title: category },
    });

    if (!categoriesRepositoryFind) {
      const categories = categoriesRepository.create({
        title: category,
      });
      await categoriesRepository.save(categories);
    }
    const categoryFindAgain = await categoriesRepository.findOne({
      where: { title: category },
    });
    console.log(categoryFindAgain);
    const transactions = transactionsRepository.create({
      title,
      value,
      type,
      category: categoryFindAgain,
    });
    await transactionsRepository.save(transactions);
    return transactions;
  }
}

export default CreateTransactionService;
