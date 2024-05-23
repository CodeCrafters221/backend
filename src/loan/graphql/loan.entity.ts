import { ObjectType, Field } from '@nestjs/graphql';
import { GqlUuid } from 'src/commons/graphql/uuid.scalar';

@ObjectType()
export class Loan {
  @Field(() => GqlUuid)
  loanId: string;

  @Field(() => String)
  userId: string;

  @Field(() => Number)
  amount: number;

  @Field(() => Number)
  interestRate: number;

  @Field(() => Date)
  startDate: Date;

  @Field(() => Date)
  endDate: Date;

  @Field(() => String)
  duration: string;

  @Field(() => Date)
  ApprovalDate: Date;

  @Field(() => String)
  status: string;

  @Field(() => GqlUuid, { nullable: true })
  transactionId: string;
}
