import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// export type User = any;

@Injectable()
export class UsersService { 
  constructor(
      @InjectRepository(User) private usersRepository: Repository<User>,
  
    ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(username: string | any) {
    return this.usersRepository.findOneBy({ username });
    // return this.users.find(user => user.username === username);
  }

  async findOneCompany(company_id: string) {
    return this.usersRepository.findOneBy({ company_id });
    // return this.users.find(user => user.username === username);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // return `This action updates a #${id} user`;
    const user = await this.findOne(id);

    return this.usersRepository.save({...user, ...updateUserDto});
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  getUserId(user: any) {
    // You now have access to the authenticated user here
    return {
      message: 'User profile fetched',
      user,
    };
  }
}
