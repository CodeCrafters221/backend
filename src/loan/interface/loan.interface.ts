import { Document, ObjectId } from 'mongoose';
export interface ILoan extends Document {
  loanId: any;
  user: ObjectId;
  amount: number;
  interestRate: number;
  startDate: Date;
  endDate: Date;
  duration: number;
  ApprovalDate: Date;
  status: string;
  transactionId: string;
}
