import { Schema } from 'mongoose';
import {userModelName} from "../../users/schemas/user.model-name";
import { v4 } from 'uuid';

export const loanSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: userModelName
    },
    amount: {type: Number },
    interestRate:  {type: Number },
    startDate: {type: Date },
    endDate: {type: Date },
    duration: {type: Number },
    ApprovalDate: {type: Date },
    status: {type: String },
    transactionId: { type: String, default: v4 }
}, { timestamps: true });