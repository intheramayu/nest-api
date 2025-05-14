// src/resources/users/entities/user.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, 
    CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Note } from 'src/resource/notes/entities/note.entity';

@Entity()
export class NoteImage {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: 'note_id' })
    note_id: string;

    @Column({ name: 'original_file_name' })
    original_file_name: string;

    @Column({ name: 'file_name' })
    file_name: string;

    @Column({ name: 'url' })
    url: string;

    @Column({ name: 'path' })
    path: string;

    @Column('decimal', { precision: 10, scale: 2 })
    file_size: number;
    
    @Column({ name: 'extension' })
    extension: string;
    
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
}
