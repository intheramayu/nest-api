// src/resources/users/entities/user.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn,
    OneToMany 
 } from 'typeorm';

 import { Customer } from '../../customers/entities/customer.entity'

@Entity()
export class Company {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'email' })
    email: string;

    @Column({ name: 'address' })
    address: string;

    @Column({ name: 'telp' })
    telp: string;

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

    @OneToMany(() => Customer, (customer) => customer.company_id)
    customer: Customer[];

}
