import { Document, ObjectId} from "mongoose";
import { IUser} from "../../users/interfaces/user.interface";

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