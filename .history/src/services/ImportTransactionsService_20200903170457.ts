import Transaction from '../models/Transaction';

interface Request {
  title: string;
  type: string;
  value: number;
  category: string;
}
class ImportTransactionsService {
  public async execute({
    title,
    type,
    value,
    category,
  }: Request): Promise<Transaction[]> {
    // TODO
  }
}

export default ImportTransactionsService;
