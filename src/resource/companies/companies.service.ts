import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import * as moment from 'moment';


@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company) private companiesRepository: Repository<Company>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  create(createCompanyDto: CreateCompanyDto) {
    const newCompany = this.companiesRepository.create(createCompanyDto);
    return {
      status: "success",
      message: "Data created successfully",
      data: this.companiesRepository.save(newCompany)
    }
  }

  async findAll() {
    return {
      status: "success",
      message: "Data fetch successfully",
      data: await this.companiesRepository.find()
    }
  }

  async findOne(id: string) {
    return this.companiesRepository.findOneBy({id});
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.findOne(id);
    const user = await this.userRepository.findOneBy({'company_id': id});
    this.companiesRepository.merge(company!, {...updateCompanyDto, updated_by: user!.id})
    return {
      status: "success",
      message: "Data updated successfully",
      data: this.companiesRepository.save(company!)
    }
  }

  async remove(id: string, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.findOne(id);
    const user = await this.userRepository.findOneBy({'company_id': id})
    const updatedCompany = this.companiesRepository.merge(company!, 
      {deleted_at : moment().format('YYYY-MM-DD hh:mm:ss'), deleted_by: user!.id}); 

    return {
      status: "success",
      message: "Data remove successfully",
      data: this.companiesRepository.save({...updatedCompany, ...updateCompanyDto})
    }
  }
}
