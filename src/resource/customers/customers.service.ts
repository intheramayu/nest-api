import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import * as moment from 'moment';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
      @InjectRepository(Customer) private customerRepository: Repository<Customer>,
      @InjectRepository(User) private userRepository: Repository<User>
    ) {}
  
    create(createCustomerDto: CreateCustomerDto) {
      const newCustomer = this.customerRepository.create(createCustomerDto);
      return this.customerRepository.save(newCustomer)
    }
  
    findAll(user: any = null) {
      console.log('uuuu', user)
      return this.customerRepository.find();
    }
  
    async findOne(id: string, user: any = null) {
      return this.customerRepository.findOneBy({id});
    }
  
    async update(id: string, updateCustomerDto: UpdateCustomerDto, user: any = null) {
      const Customer = await this.findOne(id);
      const userId = user.user.id;
      this.customerRepository.merge(Customer!, {...updateCustomerDto, updated_by: userId})
      return this.customerRepository.save(Customer!);
    }
  
    async remove(id: string, updateCustomerDto: UpdateCustomerDto, user: any = null) {
      const Customer = await this.findOne(id);
      const userId = user.user.id;
      const updatedCustomer = this.customerRepository.merge(Customer!, 
        {deleted_at : moment().format('YYYY-MM-DD hh:mm:ss'), deleted_by: userId}); 
  
      return this.customerRepository.save({...updatedCustomer, ...updateCustomerDto});
    }
}
