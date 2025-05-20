import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
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
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly userService: UsersService,
  ) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  @Get()
  findAll() {
    return this.companiesService.findAll();
  }

  @Get('user/:id')
  findAllByUserId(@Param('id') id: string) {
    return this.companiesService.findAllByUserId(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @User() user: any,
  ) {
    return this.companiesService.update(id, updateCompanyDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: any) {
    return this.companiesService.remove(id, user);
  }
}
