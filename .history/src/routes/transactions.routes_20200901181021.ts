import { Router } from 'express';
import CreateTransactionService from '../services/CreateTransactionService';
import { getCustomRepository, getRepository } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import TransactionsRepository from '../repositories/TransactionsRepository';

// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const getTransactions = getCustomRepository(TransactionsRepository);
  const transactions = await getTransactions.find();
  return response.json(transactions);
});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category_id } = request.body;
  const createTransaction = new CreateTransactionService();
  const transaction = await createTransaction.execute({
    title,
    value,
    type,
    category_id,
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
