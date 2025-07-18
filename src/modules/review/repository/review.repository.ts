import {ReviewEntity} from "../entity/review.entity";
import {Repository, UpdateResult} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";
import {ReviewCreateDto} from "../dto/review-create.dto";
import {UserEntity} from "../../user/entities/user.entity";

@Injectable()
export class ReviewRepository {
    constructor(
        @InjectRepository(ReviewEntity)
        private readonly reviewRepository: Repository<ReviewEntity>
    ) {}

    async findAndCount(skip: number, take: number): Promise<{ data: ReviewEntity[]; total: number }> {
        const [data, total] = await this.reviewRepository.createQueryBuilder('review')
            .orderBy('review.createdAt', 'DESC')
            .skip(skip)
            .take(take)
            .getManyAndCount();

        return { data, total };
    }

    create(reviewData: ReviewCreateDto, user: UserEntity): ReviewEntity {
        return this.reviewRepository.create({
            title: reviewData.title,
            cover: reviewData.cover,
            content: reviewData.content,
            user: user
        })
    }

    async update(id: number, reviewData: Partial<ReviewEntity>): Promise<ReviewEntity> {
        const review = await this.reviewRepository.findOneByOrFail({ id });
        Object.assign(review, reviewData);
        return await this.reviewRepository.save(review);
    }


    async delete(id: number): Promise<void> {
        await this.reviewRepository.delete({ id });
    }

    async findById(id: number) {

        return this.reviewRepository
            .createQueryBuilder('review')
            .where('review.id = :id', { id: id })
            .leftJoinAndSelect('review.user', 'author')
            .leftJoinAndSelect('review.comments', 'comments')
            .leftJoinAndSelect('review.likes', 'likes')
            .getOne()
    }

    getLatest(): Promise<ReviewEntity[]> {
        return this.reviewRepository
            .createQueryBuilder('review')
            .leftJoinAndSelect('review.user', 'user')
            .select([
                'review.id',
                'review.title',
                'review.cover',
                'review.content',
                'review.averageRating',
                'review.ratingCount',
                'review.createdAt',
                'review.updatedAt',
                'user.id',
                'user.first_name',
                'user.last_name',
                'user.avatarUrl',
            ])
            .orderBy('review.createdAt', 'DESC')
            .take(10)
            .getMany();
    }

    getMostRated(): Promise<ReviewEntity[]> {
        return this.reviewRepository
            .createQueryBuilder('review')
            .leftJoinAndSelect('review.user', 'user')
            .select([
                'review.id',
                'review.title',
                'review.cover',
                'review.content',
                'review.averageRating',
                'review.ratingCount',
                'review.createdAt',
                'review.updatedAt',
                'user.id',
                'user.first_name',
                'user.last_name',
                'user.avatarUrl',
            ])
            .orderBy('review.averageRating', 'DESC')
            .take(10)
            .getMany();
    }

    async findByAuthorId(authorId: number): Promise<ReviewEntity[]> {
        return this.reviewRepository
            .createQueryBuilder('review')
            .where('review.userId = :authorId', { authorId })
            .leftJoinAndSelect('review.user', 'user')
            .leftJoinAndSelect('review.comments', 'comments')
            .leftJoinAndSelect('review.likes', 'likes')
            .orderBy('review.createdAt', 'DESC')
            .getMany();
    }


    async save(reviewToSave: ReviewEntity ) {
        return await this.reviewRepository.save(reviewToSave)
    }

    async updateRating(reviewId: number, avgRating: number, ratingCount: number) {
        await this.reviewRepository.update(reviewId, {
            averageRating: avgRating,
            ratingCount: ratingCount
        })
    }
}