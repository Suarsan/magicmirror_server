import { WishesList } from "src/modules/wishes/entities/wisheslist.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Author {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false})
    email: string;

    @Column({ nullable: false})
    password: string;

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;
    
    @OneToMany(type => WishesList, wishesList => wishesList.author)
    wishesLists: Array<WishesList>
}
