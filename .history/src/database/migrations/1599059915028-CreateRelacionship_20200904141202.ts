import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class CreateRelacionship1599059915028
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        name: 'TransactionsCategory', // nome da chave estrangeira
        columnNames: ['category_id'], // nome da coluna que estara na tabela de transactions
        referencedColumnNames: ['id'], // o nome da coluna referenciada nessa foreignkey la na tabela de categories
        referencedTableName: 'categories', // tabela de categorias
        onDelete: 'SET NULL', // no delete ele não remove nesse caso, o campo de id vai ficar null
        onUpdate: 'CASCADE', // sempre que atualizar em algum lugar, atualiza nos outros
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('transactions', 'TransactionsCategory');
  }
}
