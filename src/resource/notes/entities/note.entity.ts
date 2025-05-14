// src/resources/users/entities/user.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, 
    JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Customer } from 'src/resource/customers/entities/customer.entity';
import { NoteImage } from 'src/resource/note_images/entities/note_image.entity';

@Entity()
export class Note {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: 'customer_id' })
    customer_id: string;

    @Column({ name: 'title' })
    title: string;

    @Column({ name: 'description' })
    description: string;

    @Column({ type: 'date' })
    date: string;

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

    @Column({ name: 'updated_by', nullable: true,  })
    updated_by: string;

    @ManyToOne(type => Customer)
    @JoinColumn({name: 'customer_id', referencedColumnName: 'id'})
    customer: Customer;

    @OneToMany(() => NoteImage, (noteImage) => noteImage.note_id)
    noteImages: NoteImage[];
}
