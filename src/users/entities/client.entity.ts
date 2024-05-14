import Role from "../../enums/roles-enum";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Loan } from "./loan.entity";
import { Document } from "./document.entity";

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column()
  phoneNumber: string;

  @Column()
  address: string;

  @Column()
  email: string;


  @Column({
    type: "enum",
    enum: Role,
    default: Role.CLIENT,
  })
  role: Role;

  @Column({ default: true })

  isActive: boolean;

  @OneToMany(() => Loan, (loan) => loan.client)

  loans: Loan[];

  @Column({ nullable: true })

  @OneToMany(() => Document, (document) => document.client)

  documents: Document[];
}