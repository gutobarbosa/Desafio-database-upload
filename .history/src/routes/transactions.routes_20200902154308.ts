import { Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import CreateTransactionService from '../services/CreateTransactionService';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const transactionBalance = getCustomRepository(TransactionsRepository);
  const transactionRepository = getRepository(Transaction);
  const transactions = await transactionRepository.find();
  const balance = await transactionBalance.getBalance();
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
