import csvParse from 'csv-parse'; // ele vai ser a lib que irei utilizar para manipular o csv...
import fs from 'fs'; //  file sistem que ajudara a gente a abrir os arquivos e ler os arquivos.
import Transaction from '../models/Transaction';

class ImportTransactionsService {
  public async execute(filePath: string): Promise<Transaction[]> {
    const contactsReadStream = fs.createReadStream(filePath);

    const parsers = csvParse({
      from_line: 2, // começara a ler a de segunda linha pra não pegar os headers...

    });

    const parseCSV = contactsReadStream.pipe(parsers); // conforme a linha estiver disponivel pra leitura ele irá ler...
    const transactions = []; // esses dois vetores foram criados para armazenar o dado e adicionar no banco tudo de uma vez, por mais que da outra maneira seja simples, que é ficar adicionando informação por informação no banco, ele vai ficar abrindo muitas conexões e isso não é legal.
    const categories = [];
    parseCSV.on('data', async line =>{ // através do on, ele irá percorrer linha por linha que retornar e estiver disponivel e iremos desustruturar cada informação de cada linha que tiver
      const [title, type, value, category] = line.map((cell: string) => // agora iremos percorrer todas as linhas checando cada celula desse documento.csv
        cell.trim(), // remove todo o espaço em banco que tiver em cada celula
      );
      if (!title || !type || !value) return;

      categories.push(category);
    });
  }
}

export default ImportTransactionsService;
