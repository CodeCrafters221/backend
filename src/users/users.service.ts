import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoBasicQueriesService } from 'src/commons/services/mongo-basic-queries.service';
import { IUser } from './interfaces/user.interface';
import { userModelName } from './schemas/user.model-name';

@Injectable()
export class UsersService extends MongoBasicQueriesService<IUser> {
  constructor(@InjectModel(userModelName) private model: Model<IUser>) {
    super(model);
  }
  insert(user: IUser) {
    return this.model.create(user);
  }

  findByEmail(email: string) {
    return this.model.findOne({ email });
  }
}
