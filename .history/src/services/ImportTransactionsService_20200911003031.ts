import csvParse from 'csv-parse';
import fs from 'fs';
import { getCustomRepository, getRepository, In } from 'typeorm';
import Transaction from '../models/Transaction';
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
      from_line: 2, // iremos pegar o csv apartir da linha 2
    });

    const parseCSV = contactsReadStream.pipe(parsers);

    const transactions: CSVTransaction[] = [];
    const categories: string[] = [];

    parseCSV.on('data', async line => {
      // através do on, ele irá percorrer linha por linha que retornar e estiver disponivel e iremos desustruturar cada informação de cada linha que tiver
      const [title, type, value, category] = line.map((cell: string) =>
        // agora iremos percorrer todas as linhas checando cada celula desse documento.csv
        cell.trim(),
      ); // cell.trim(), remove todo o espaço em banco que tiver em cada celula
      if (!title || !type || !value) return;

      categories.push(category);
      transactions.push({ title, type, value, category });
    });
    await new Promise(resolve => parseCSV.on('end', resolve)); // aqui esperamos carregar a promisse do parceCSV pra retornar os dados... pois aqui aguarda até que ela tenha sido executada.

    const existentCategories = await categoryRepository.find({
      where: {
        title: In(categories),
      },
    });

    const existentCategoriesTitle = existentCategories.map(
      (category: Category) => category.title,
    );

    const addCategoryTitles = categories
      .filter(category => !existentCategoriesTitle.includes(category))
      .filter((value, index, self) => self.indexOf(value) === index);

    const newCategories = categoryRepository.create(
      addCategoryTitles.map(title => ({
        title,
      })),
    );

    await categoryRepository.save(newCategories);

    const existentCategoriesAgain = await categoryRepository.find({
      where: {
        title: In(categories),
      },
    });

    const existentCategoriesTitleAgain =  existentCategoriesAgain.map(
      (category: Category) => category.title,
    );
    console.log(existentCategoriesTitleAgain);

    const createdTransactions = transactionsRepository.create(
      transactions.map(transaction => ({
        title: transaction.title,
        type: transaction.type,
        value: transaction.value,
        category: category.title,
      })),
    );


    await transactionsRepository.save(createdTransactions);
    await fs.promises.unlink(filePath); // aqui nos removemos o arquivo do diretorio pra não lotar a pasta tmp
    return createdTransactions;
  }
}

export default ImportTransactionsService;
