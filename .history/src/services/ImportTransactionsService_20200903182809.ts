Skip to content
Search or jump to…

Pull requests
Issues
Marketplace
Explore

@gutoisa
joaodantas91
/
Desafio-database-upload
generated from rocketseat-education/gostack-template-typeorm-upload
1
00
Code
Issues
Pull requests
1
Actions
Projects
Wiki
Security
Insights
Desafio-database-upload/src/services/ImportTransactionsService.ts /
@joaodantas91
joaodantas91 first commit
Latest commit f0f2c0a 3 days ago
 History
 1 contributor
79 lines (64 sloc)  2.29 KB

Code navigation is available!
Navigate your code with ease. Click on function and method calls to jump to their definitions or references in the same repository. Learn more

import csvParse from 'csv-parse';
import fs from 'fs';
import { getCustomRepository, getRepository, In } from 'typeorm';
import Transaction from '../models/Transaction';
// import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';

interface CSVTransaction {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: Category;
}

class ImportTransactionsService {
  async execute(filePath: string): Promise<Transaction[]> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoryRepository = getRepository(Category);
    const contactsReadStream = fs.createReadStream(filePath);

    const parsers = csvParse({
      from_line: 2,
    });

    const parseCSV = contactsReadStream.pipe(parsers);

    const transactions: CSVTransaction[] = [];
    const categories: string[] = [];

    parseCSV.on('data', async line => {
      const [title, type, value, category] = line.map((cell: string) =>
        cell.trim(),
      );
      if (!title || !type || !value) return;

      categories.push(category);
      transactions.push({ title, type, value, category });
    });
    await new Promise(resolve => parseCSV.on('end', resolve));

    console.log(transactions);
    console.log(categories);
  }
}

export default ImportTransactionsService;
