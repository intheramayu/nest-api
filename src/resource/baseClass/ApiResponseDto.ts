import { BaseResponseDto } from './BaseResponseDto';

export class ApiResponseDto<T> extends BaseResponseDto {
  data?: T;

  constructor(success: boolean, data?: T, message?: string, error?: any) {
    super(success, message, error);
    this.data = data;
  }
}
