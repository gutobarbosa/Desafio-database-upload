import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp'),
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;
      return callback(null, fileName); // duas propriedades no parametro, caso ocorra erro é o primeiro parametro, o segundo é o nome do arquivo
    }, // geralmente salva com o nome do arquivo enviado, mais precisamos tratar o nome pra não ter nomes iguais
  }),
};
