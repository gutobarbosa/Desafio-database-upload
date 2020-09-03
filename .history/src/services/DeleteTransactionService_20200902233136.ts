import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';

interface Request {
  id: string;
}
class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const transactionsRepository = getRepository(Transaction);
    if (!id) {
      throw new AppError('This id dont exist');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const deleteTransaction = await transactionsRepository.delete(id);
  }
}

export default DeleteTransactionService;
