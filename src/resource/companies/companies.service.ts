import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import * as moment from 'moment';
import { ApiResponseDto } from '../baseClass/ApiResponseDto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company) private companiesRepository: Repository<Company>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(
    createCompanyDto: CreateCompanyDto,
  ): Promise<ApiResponseDto<Company | null>> {
    try {
      if (!createCompanyDto) {
        return new ApiResponseDto(false, null, 'Company name is required');
      }
      const newCompany =
        await this.companiesRepository.create(createCompanyDto);
      const savedCompany = await this.companiesRepository.save(newCompany);
      return new ApiResponseDto(
        true,
        savedCompany,
        'Company created successfully',
      );
    } catch (error) {
      return new ApiResponseDto(false, null, 'Error creating company');
    }
  }

  async findAll() {
    try {
      const data = await this.companiesRepository.find();
      if (!data) {
        return new ApiResponseDto(false, null, 'No companies found');
      }
      return new ApiResponseDto(true, data, 'Data fetch successfully');
    } catch (error) {
      return new ApiResponseDto(false, null, 'Error fetching companies');
    }
  }

  async findAllByUserId(
    user_id?: string,
  ): Promise<ApiResponseDto<Company[] | null>> {
    try {
      const user = await this.userRepository.find({
        where: { id: user_id },
      });
      const companies = await this.companiesRepository.find({
        where: { id: user[0].company_id },
      });
      if (!companies) {
        return new ApiResponseDto(false, null, 'No companies found');
      }

      return new ApiResponseDto(true, companies, 'Data fetch successfully');
    } catch (error) {
      return new ApiResponseDto(false, null, 'Error fetching companies');
    }
  }

  async findOne(id: string): Promise<ApiResponseDto<Company | null>> {
    try {
      const company = await this.companiesRepository.findOneBy({ id });
      if (!company) {
        return new ApiResponseDto(false, null, 'Company not found');
      }
      return new ApiResponseDto(true, company, 'Company found');
    } catch (error) {
      return new ApiResponseDto(false, null, 'Error fetching company');
    }
  }

  async update(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
    user: any,
  ): Promise<ApiResponseDto<Company | null>> {
    try {
      const companyResponse = await this.findOne(id);
      const company = companyResponse.data;
      if (!company) {
        return new ApiResponseDto(false, null, 'Company not found');
      }

      const updatedCompany = this.companiesRepository.merge(company!, {
        ...updateCompanyDto,
        updated_by: user!.id,
      });
      const savedCompany = await this.companiesRepository.save(updatedCompany);
      return new ApiResponseDto(
        true,
        savedCompany,
        'Company updated successfully',
      );
    } catch (error) {
      return new ApiResponseDto(false, null, 'Error updating company');
    }
  }

  async remove(id: string, user: any) {
    try {
      const companyResponse = await this.findOne(id);
      const company = companyResponse.data;
      if (!company) {
        return new ApiResponseDto(false, null, 'Company not found');
      }
      const updatedCompany = this.companiesRepository.merge(company, {
        deleted_at: moment().format('YYYY-MM-DD hh:mm:ss'),
        deleted_by: user!.id,
      });
      const savedCompany = await this.companiesRepository.save(updatedCompany);
      if (!savedCompany) {
        return new ApiResponseDto(false, null, 'Error removing company');
      }
    } catch (error) {
      return new ApiResponseDto(false, null, 'Error removing company');
    }
  }
}
