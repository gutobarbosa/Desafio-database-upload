import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ManyToOne,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  JoinColumn,
} from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Category from './Category';

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  type: 'income' | 'outcome';

  @Column()
  value: number;

  /*
  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category_id: Category;
*/
  @Column()
  category_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Transaction;
