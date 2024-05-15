import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddMatchDto, CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';
import { User } from '../entities/users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  private validateIfDocumentExists(document: User | null, documentId: string) {
    if (!document) {
      throw new NotFoundException(
        "The User with the id: '" + documentId + "' does not exist.",
      );
    }
  }

  // Get user by id
  async findOne(id: string) {
    const user = await this.userModel.findOne(
      {
        _id: id,
      },
      {
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    );

    this.validateIfDocumentExists(user, id);

    return user;
  }

  findByEmail(email: string) {
    const user = this.userModel.findOne(
      {
        email,
      },
      {
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    );

    return user || null;
  }

  // Create user
  create(payload: CreateUserDto) {
    const user: User = new this.userModel({
      ...payload,
    });

    return user.save();
  }

  // Update user
  async update(id: string, payload: UpdateUserDto) {
    const user = await this.findOne(id);

    user.set(payload);

    return user.save();
  }

  // Delete user
  async delete(id: string) {
    const res = await this.userModel.deleteOne({ _id: id });

    return res;
  }

  // Add match to user
  async addMatch(userId: string, payload: AddMatchDto) {
    const user = await this.findOne(userId);
    user.matches.push(payload);

    return user.save();
  }

  // Delete match from user
  async deleteMatch(userId: string, matchId: string) {
    const user = await this.findOne(userId);
    const matchIndex = user.matches.findIndex((match) => match._id === matchId);

    if (matchIndex === -1) {
      throw new NotFoundException(
        "The Match with the id: '" + matchId + "' does not exist.",
      );
    }

    user.matches.splice(matchIndex, 1);

    return user.save();
  }
}
