import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from '../users/entities/user.entity';
import { Request } from '@nestjs/common';
import { User } from '../users/users.decorator';
import { UsersService } from '../users/users.service';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService, private readonly userService: UsersService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    console.log('aaabbb')
    return this.companiesService.create(createCompanyDto);
  }

  // @Roles(UserRole.SUPERUSER)
  // @UseGuards(RolesGuard)
  @Get()
  findAll(@User() user: any) {
    let u = this.userService.getUserId(user);
    console.log(u,'uu')
    return this.companiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.remove(id, updateCompanyDto);
  }

  @Get()
  getUser(@User() user: any) {
    return this.userService.getUserId(user);
  }
}
