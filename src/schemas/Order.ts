import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('orders')
class Order {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  username: string;

  @Column()
  address?: string;

  @Column()
  products: Product[];

  @Column()
  subtotal: number;

  @Column({ default: false })
  withdrawl: boolean;

  @Column()
  totalItens: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Order;
