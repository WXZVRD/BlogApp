import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { UserEntity } from "../../user/entities/user.entity";
import {LikeEntity} from "./like.entity";
import {CommentEntity} from "../../comment/entity/comment.entity";

@Entity('reviews')
export class ReviewEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    cover: string;

    @ManyToOne(() => UserEntity, user => user.reviews, { onDelete: "CASCADE" })
    user: UserEntity;

    @OneToMany(() => LikeEntity, like => like.review, { cascade: true })
    likes: LikeEntity[];

    @OneToMany(() => CommentEntity, comment => comment.review, { cascade: true })
    comments: CommentEntity[];

    @Column()
    content: string;

    @Column({ type: "float", default: 0 })
    averageRating: number

    @Column({ default: 0 })
    ratingCount: number

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}