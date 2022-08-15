import { Author } from "src/modules/authors/entities";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class WishesList {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;
    
    @Column()
    author_id: number;

    @ManyToOne(type => Author, author => author.wishesLists, { cascade: true})
    @JoinColumn({ name: 'author_id' })
    author: Author;

}