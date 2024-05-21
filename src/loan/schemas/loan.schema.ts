import { Schema } from 'mongoose';
import { UserDto } from 'src/users/dto/user.schema';
import { v4 } from 'uuid';

export const loanSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: UserDto.name,
    },
    amount: { type: Number },
    interestRate: { type: Number },
    startDate: { type: Date },
    endDate: { type: Date },
    duration: { type: Number },
    ApprovalDate: { type: Date },
    status: { type: String },
    transactionId: { type: String, default: v4 },
  },
  { timestamps: true },
);
