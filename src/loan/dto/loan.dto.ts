import { UserDto } from 'src/users/dto/user.dto';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 } from 'uuid';
import { Schema as MongooseSchema, Document, now } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class ILoan extends Document {
  loanId: string | MongooseSchema.Types.ObjectId;
  userId: string;
  amount?: number;
  interestRate?: number;
  startDate: Date;
  endDate: Date;
  professionalCategory: string;
  profession: string;
  duration: number;
  approvalDate: Date;
  status: string;
  transactionId: string;
  aiResponse?: string;
}

// POSSIBLE LOAN STATUS ENUM
export enum LoanStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

@Schema({
  timestamps: true, // POUR AJOUTER LA DATE D'INSERTION
  collection: 'loans', // NOM DE LA COLLECTION DANS LA BASE
  strict: false, //  POUR PERMETTRE D'AJOUTER D'AUTRES PARAMÉTRES LORS DE L'INSERTION
  versionKey: false, // POUR NE PAS GERER LA VERSION
})
export class LoanDto extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId })
  loanId: string | MongooseSchema.Types.ObjectId;

  @ApiProperty({ type: String, description: 'The user who requested the loan' })
  @Prop({ type: String, ref: UserDto.name })
  userId: string;

  @ApiProperty({ type: Number, description: 'The amount of the loan' })
  @Prop({ type: Number })
  amount: number;

  @Prop({ type: Number })
  interestRate: number;

  @ApiProperty({ type: Date, description: 'The start date  of the loan' })
  @Prop({ type: Date, default: now() })
  startDate: Date;

  @ApiProperty({ type: Date, description: 'The enďdate  of the loan' })
  @Prop({ type: Date })
  endDate: Date;

  @Prop({ type: String })
  professionalCategory: string;

  @Prop({ type: String })
  profession: string;

  @Prop({ type: String })
  duration: string;

  @Prop({ type: String, default: LoanStatus.PENDING })
  status: string;

  @Prop({ type: Date })
  approvalDate: Date;

  @Prop({ type: String, nullable: true })
  aiResponse?: string;

  @Prop({ type: String, default: v4 })
  transactionId: string;
}

const LoanSchema = SchemaFactory.createForClass(LoanDto);
// SET APPROVAL DATE WITH THE DATE WHEN THE LOAN IS APPROVED//
LoanSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate() as ILoan;
  console.log('update: ', update);
  if (update.status === LoanStatus.APPROVED) update.approvalDate = new Date();
  else if (update.status && update.status !== LoanStatus.APPROVED)
    update.approvalDate = undefined;
  next();
});

// EXPORT LOAN SCHEMA
export { LoanSchema };
