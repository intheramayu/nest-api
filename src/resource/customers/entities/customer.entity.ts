// src/resources/users/entities/user.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, 
    CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Company } from 'src/resource/companies/entities/company.entity';

@Entity()
export class Customer {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'company_id' })
    company_id: string;

    @Column({ name: 'status', default: () => '01', })
    status: string;

    @CreateDateColumn()
    created_at: Date; // Creation date

    @UpdateDateColumn()
    updated_at: Date; // Last updated date

    @DeleteDateColumn({nullable: true})
    deleted_at: Date; // Deletion date

    @Column({ name: 'deleted_by', nullable: true, })
    deleted_by: string;

    @Column({ name: 'updated_by', nullable: true,  })
    updated_by: string;

    @ManyToOne(type => Company)
    @JoinColumn({name: 'company_id', referencedColumnName: 'id'})
    company: Company;
}
