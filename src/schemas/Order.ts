import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';
import User from './User';

@Entity('orders')
class Order {
  @ObjectIdColumn()
  id: ObjectID;

  @ManyToOne(() => User, user => user.orders, {
    eager: true
  })
  user: User;

  @Column()
  address?: Address;

  @Column()
  products: Product[];

  @Column()
  subtotal: number;

  @Column({ default: false })
  withdrawl: boolean;

  @Column()
  totalItens: number;

  @Column()
  paymentMethod: string;

  @Column()
  status: string;

  @Column()
  user_id: string;

  @Column()
  market_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Order;
