import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoBasicQueriesService } from 'src/commons/services/mongo-basic-queries.service';
import { UserDto } from './dto/user.schema';

@Injectable()
export class UsersService extends MongoBasicQueriesService<UserDto> {
  constructor(@InjectModel(UserDto.name) private model: Model<UserDto>) {
    super(model);
  }
  insert(user: UserDto) {
    return this.model.create(user);
  }

  findByEmail(email: string) {
    return this.model.findOne({ email });
  }
}
