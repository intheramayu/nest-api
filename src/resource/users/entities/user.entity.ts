// src/resources/users/entities/user.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn,
    JoinColumn, ManyToOne
 } from 'typeorm';

 import { Company} from '../../companies/entities/company.entity'

 export enum UserRole {
    SUPERUSER = 'superuser',
    ADMIN = 'admin',
  }

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'email' })
    email: string;

    @Column({ name: 'username' })
    username: string;

    @Column({ name: 'password' })
    password: string;

    @Column({ name: 'refresh_token', nullable: true })
    refresh_token: string;

    @Column({ name: 'role', type: 'enum', enum: UserRole, default: UserRole.ADMIN })
    role: string;

    @Column({ name: 'company_id' })
    company_id: string;

    @Column({ name: 'status', default: () => '01', })
    status: string;

    @CreateDateColumn()
    created_at: Date; // Creation date

    @UpdateDateColumn()
    updated_at: Date; // Last updated date

    @DeleteDateColumn({nullable: true,})
    deleted_at: Date; // Deletion date

    @Column({ name: 'deleted_by', nullable: true, })
    deleted_by: string;

    @Column({ name: 'updated_by', nullable: true })
    updated_by: string;
    
    @ManyToOne(type => Company)
    @JoinColumn({name: 'company_id', referencedColumnName: 'id'})
    customer: Company;
}
