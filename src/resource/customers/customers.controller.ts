import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { User } from '../users/users.decorator';
import { UsersService } from '../users/users.service';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService, private readonly userService: UsersService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  findAll(@User() user?: any) {
    let u = this.userService.getUserId(user);
    console.log('u',u)
    return this.customersService.findAll(u);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user?: any) {
    let profile = this.userService.getUserId(user);
    return this.customersService.findOne(id, profile);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto, @User() user?: any) {
    let profile = this.userService.getUserId(user);
    return this.customersService.update(id, updateCustomerDto, profile);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto, @User() user?: any) {
    let profile = this.userService.getUserId(user);
    return this.customersService.remove(id, updateCustomerDto, profile);
  }
}
