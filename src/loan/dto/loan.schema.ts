import { UserDto } from 'src/users/dto/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 } from 'uuid';
import { Schema as MongooseSchema, Document } from 'mongoose';

export class ILoan extends Document {
  loanId: string;
  user: MongooseSchema.Types.ObjectId;
  amount: number;
  interestRate: number;
  startDate: Date;
  endDate: Date;
  duration: number;
  ApprovalDate: Date;
  status: string;
  transactionId: string;
}

@Schema({
  timestamps: true,
  collection: 'loans',
})
export class LoanDto extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId })
  loanId: string | MongooseSchema.Types.ObjectId;

  @Prop({ type: String, ref: UserDto.name })
  user: string;

  @Prop({ type: Number })
  amount: number;

  @Prop({ type: Number })
  interestRate: number;

  @Prop({ type: Date })
  startDate: Date;

  @Prop({ type: Date })
  endDate: Date;

  @Prop({ type: String })
  duration: number;

  @Prop({ type: Date })
  approvalDate: Date;

  @Prop({ type: String })
  status: string;

  @Prop({ type: String, default: v4 })
  transactionId: string;
}

export const LoanSchema = SchemaFactory.createForClass(LoanDto);
