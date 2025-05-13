import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import * as moment from 'moment';
import { User as UserDec } from '../users/users.decorator';


@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company) private companiesRepository: Repository<Company>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  create(createCompanyDto: CreateCompanyDto) {
    const newCompany = this.companiesRepository.create(createCompanyDto);
    console.log('aaaaaaaaa')
    return this.companiesRepository.save(newCompany)
  }

  findAll() {
    return this.companiesRepository.find();
  }

  async findOne(id: string) {
    return this.companiesRepository.findOneBy({id});
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.findOne(id);
    const user = await this.userRepository.findOneBy({'company_id': id});
    this.companiesRepository.merge(company!, {...updateCompanyDto, updated_by: user!.id})
    return this.companiesRepository.save(company!);
  }

  async remove(id: string, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.findOne(id);
    const user = await this.userRepository.findOneBy({'company_id': id})
    const updatedCompany = this.companiesRepository.merge(company!, 
      {deleted_at : moment().format('YYYY-MM-DD hh:mm:ss'), deleted_by: user!.id}); 

    return this.companiesRepository.save({...updatedCompany, ...updateCompanyDto});
  }
}
