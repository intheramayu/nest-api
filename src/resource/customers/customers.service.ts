import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Repository } from 'typeorm';
import * as moment from 'moment';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { ApiResponseDto } from '../baseClass/ApiResponseDto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async create(
    createCustomerDto: CreateCustomerDto,
  ): Promise<ApiResponseDto<Customer | null>> {
    try {
      const newCustomer = this.customerRepository.create(createCustomerDto);
      const savedCustomer = await this.customerRepository.save(newCustomer);
      return new ApiResponseDto(
        true,
        savedCustomer,
        'Customer created successfully',
      );
    } catch (error) {
      return new ApiResponseDto(false, null, 'Error creating customer');
    }
  }
  async findAllByCompanyId(
    company_id: string,
    user: any = null,
  ): Promise<ApiResponseDto<Customer[] | null>> {
    try {
      const data = await this.customerRepository.find({
        where: { company_id },
      });
      return new ApiResponseDto(true, data, 'Data fetch successfully');
    } catch (error) {
      return new ApiResponseDto(false, null, 'Error fetching customers');
    }
  }
  async findAll(user: any = null): Promise<ApiResponseDto<Customer[] | null>> {
    try {
      const data = await this.customerRepository.find();
      return new ApiResponseDto(true, data, 'Data fetch successfully');
    } catch (error) {
      return new ApiResponseDto(false, null, 'Error fetching customers');
    }
  }

  async findOne(
    id: string,
    user: any = null,
  ): Promise<ApiResponseDto<Customer | null>> {
    try {
      const customer = await this.customerRepository.findOneBy({ id });
      if (!customer) {
        return new ApiResponseDto(false, null, 'Customer not found');
      }
      return new ApiResponseDto(true, customer, 'Customer found');
    } catch (error) {
      return new ApiResponseDto(false, null, 'Error fetching customer');
    }
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
    user: any = null,
  ): Promise<ApiResponseDto<Customer | null>> {
    try {
      const customerResponse = await this.findOne(id);
      const customer = customerResponse.data;
      if (!customer) {
        return new ApiResponseDto(false, null, 'Customer not found');
      }
      const userId = user.user.id;
      this.customerRepository.merge(customer, {
        ...updateCustomerDto,
        updated_by: userId,
      });
      const updatedCustomer = await this.customerRepository.save(customer);
      return new ApiResponseDto(
        true,
        updatedCustomer,
        'Customer updated successfully',
      );
    } catch (error) {
      return new ApiResponseDto(false, null, 'Error updating customer');
    }
  }

  async remove(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
    user: any = null,
  ): Promise<ApiResponseDto<Customer | null>> {
    try {
      const customerResponse = await this.findOne(id);
      const customer = customerResponse.data;
      if (!customer) {
        return new ApiResponseDto(false, null, 'Customer not found');
      }

      const userId = user.user.id;
      const updatedCustomer = this.customerRepository.merge(customer, {
        deleted_at: moment().format('YYYY-MM-DD hh:mm:ss'),
        deleted_by: userId,
      });
      await this.customerRepository.save(updatedCustomer);
      return new ApiResponseDto(
        true,
        updatedCustomer,
        'Customer removed successfully',
      );
    } catch (error) {
      return new ApiResponseDto(false, null, 'Error removing customer');
    }
  }
}
