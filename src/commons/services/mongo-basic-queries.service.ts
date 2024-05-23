/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class MongoBasicQueriesService<T> {
  private abstractModel: Model<T>;

  constructor(model: Model<T>) {
    this.abstractModel = model;
  }

  insertOne(payload: T): Promise<T> {
    console.log('MongoBasicQueriesService: insertOne: ', payload);
    return this.abstractModel.create(payload);
  }

  async findAll(): Promise<T[]> {
    return this.abstractModel.find();
  }

  async findOneById(id: ObjectId|string) {
    return this.abstractModel.findById(id);
  }

  async findOneByIdOrFail(id: ObjectId|string) {
    const result = await this.findOneById(id);
    if (!result) {
      throw new NotFoundException(`L'entité avec id=${id} n'existe pas`);
    }
    return result;
  }

  async deleteOneById(id: ObjectId|string) {
    const result = await this.findOneByIdOrFail(id);
    if(result)
    return this.abstractModel.deleteOne({ _id: id });
  else {
    throw new NotFoundException(`L'entité avec id=${id} n'existe pas`);
  }
}
}