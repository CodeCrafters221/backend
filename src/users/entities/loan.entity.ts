import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Client } from './client.entity';

@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', {precision: 10, scale: 2})
  amount: number;

  @Column('decimal', {precision: 5, scale: 2})
  interestRate: number;

  @Column()
  duration: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ nullable: false })
  ApprovalDate: Date;


  @Column()
  status: string;

  @ManyToOne(() => Client, (client) => client.loans)
  client: Client;
}