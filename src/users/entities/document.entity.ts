import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Client } from './client.entity';

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  path: string;

  @ManyToOne(() => Client, (client) => client.documents)

  client: Client;
}