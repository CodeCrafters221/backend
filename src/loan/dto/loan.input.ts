import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {User} from 'src/users/dto/users.entity';

@InputType()
export class LoanInput {
    @Field(() => User)
    @ApiProperty({type: User, description: 'The user who requested the loan'})
    user: User;

    @Field(() => Number)
    @ApiProperty({type: Number, description: 'The amount of the loan'})
    amount: number;

    @Field(() => Number)
    @ApiProperty({type: Number, description: 'The interest rate of the loan'})
    interestRate: number;

    @Field(() => Date)
    @ApiProperty({type: Date, description: 'The start date  of the loan'})
    startDate: Date;

    @Field(() => Date)
    @ApiProperty({type: Date, description: 'The enďdate  of the loan'})
    endDate: Date;

    @Field(() => Number)
    @ApiProperty({type: Number, description: 'The duration of the loan'})
    duration: number;

    @Field(() => Date)
    @ApiProperty({type: Date, description: 'The date the loan was approved'})
    ApprovalDate: Date;

    @Field(() => String)
    @ApiProperty({type: String, description: 'The status of the loan'})
    status: string;

    @Field(() => String)
    @ApiProperty({type: String, description: 'The id of the client who requested the loan'})
    transactionId: string;
}