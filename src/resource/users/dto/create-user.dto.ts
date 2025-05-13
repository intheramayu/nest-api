export class CreateUserDto {

    name: string;
    username: string;
    password: string;
    company_id: string;
    refreshToken?: string;
}
