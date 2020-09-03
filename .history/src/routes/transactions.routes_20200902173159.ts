import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import CreateTransactionService from '../services/CreateTransactionService';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const transactionRepository = getCustomRepository(TransactionsRepository);
  const transactions = await transactionRepository.find();
  // const categories = await TransactionsRepository.
  const balance = await transactionRepository.getBalance();
  const transactionArray = transactions.slice(0,6);
  return response.json({ transactionArray, balance });
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
/*
transactionsRouter.delete('/:id', async (request, response) => {
  // TODO
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});
*/
export default transactionsRouter;
