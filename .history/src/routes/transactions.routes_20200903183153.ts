import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';
import uploadConfig from '../config/upload';
import CreateTransactionService from '../services/CreateTransactionService';

import TransactionsRepository from '../repositories/TransactionsRepository';
import DeleteTransactionService from '../services/DeleteTransactionService';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();
const upload = multer(uploadConfig);

transactionsRouter.get('/', async (request, response) => {
  const transactionRepository = getCustomRepository(TransactionsRepository);
  const transactions = await transactionRepository.find();
  transactions.map(transaction => {
    // eslint-disable-next-line no-param-reassign
    delete transaction.category_id;
    return transaction;
  });
  const balance = await transactionRepository.getBalance();
  return response.json({ transactions, balance });
});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body;
  const createTransaction = new CreateTransactionService();
  const transaction = await createTransaction.execute({
    title,
    value,
    type,
    category,
  });
  delete transaction.category_id;
  return response.json(transaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const deletedTransaction = new DeleteTransactionService();
  const deleteTransaction = await deletedTransaction.execute({
    id,
  });
  return response.status(204).json(deleteTransaction);
});
/*
transactionsRouter.post(
  '/import',
  upload.single('file'),
  async (request, response) => {
    const importTransaction = new ImportTransactionsService();
    const transaction = await importTransaction.execute(request.file.path);

    return response.json(transaction);
  },
);
*/
export default transactionsRouter;
