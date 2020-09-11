import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Category from '../models/Category';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import TransactionsRepository from '../repositories/TransactionsRepository'; // tudo que tiver relacionado ao banco de dados é feito no repository, então ele meio que é nosso canal de comunicação com o banco

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
    // buscar as categorias no banco
    const categoriesRepository = getRepository(Category);
    // procura a categoria informada no banco de dados
    const categoriesRepositoryFind = await categoriesRepository.findOne({
      where: { title: category },
    });

    // a categoria existe ? se não ela cria uma nova, se sim, ele apenas usa o ID da que ja existe
    if (!categoriesRepositoryFind) {
      const categories = categoriesRepository.create({
        title: category,
      });
      await categoriesRepository.save(categories);
    }
    const categoryFindAgain = await categoriesRepository.findOne({
      where: { title: category },
    });
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
