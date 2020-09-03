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

  @Column()
  category_id: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Promise<Category[]>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Transaction;
