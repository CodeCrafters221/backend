import { ObjectType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { GqlUuid } from 'src/commons/graphql/uuid.scalar';
import { User } from 'src/users/dto/users.entity';
import { UserLogin } from 'src/users/schemas/user.schema';
// import { UserLogin } from 'src/users/interfaces/user.interface';

@ObjectType()
export class Loan {
  @Field(() => GqlUuid)
  @ApiProperty({ type: String, description: 'The id of the loan' })
  id: string;

  @Field(() => User)
  @ApiProperty({ type: User, description: 'The user who requested the loan' })
  user: UserLogin;

  @Field(() => Number)
  @ApiProperty({ type: Number, description: 'The amount of the loan' })
  amount: number;

  @Field(() => Number)
  @ApiProperty({ type: Number, description: 'The interest rate of the loan' })
  interestRate: number;

  @Field(() => Date)
  @ApiProperty({ type: Date, description: 'The start date  of the loan' })
  startDate: Date;

  @Field(() => Date)
  @ApiProperty({ type: Date, description: 'The enďdate  of the loan' })
  endDate: Date;

  @Field(() => Number)
  @ApiProperty({ type: Number, description: 'The duration of the loan' })
  duration: number;

  @Field(() => Date)
  @ApiProperty({ type: Date, description: 'The date the loan was approved' })
  ApprovalDate: Date;

  @Field(() => String)
  @ApiProperty({ type: String, description: 'The status of the loan' })
  status: string;

  @Field(() => User)
  @ApiProperty({ type: User, description: 'The client who requested the loan' })
  client: UserLogin;

  @Field(() => GqlUuid, { nullable: true })
  @ApiProperty({
    type: String,
    description: 'The id of the client who requested the loan',
  })
  transactionId: string;
}
