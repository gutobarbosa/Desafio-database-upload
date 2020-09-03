import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  id: string;
}
class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const transaction = getCustomRepository(TransactionsRepository);
    const deleteTransaction = await transaction.findOne(id);
    console.log(deleteTransaction);
    if (!deleteTransaction) {
      throw new AppError('This id dont exist');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    await transaction.remove(deleteTransaction);
  }
}

export default DeleteTransactionService;
