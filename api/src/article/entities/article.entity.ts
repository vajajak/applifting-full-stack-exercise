import { ApiProperty } from '@nestjs/swagger';
import { MediaObject } from '../../media-objects/entities/media-object.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Comment } from '../../comments/entities/comment.entity';

@Entity()
export class Article {
  /* ID souboru */
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @ApiProperty()
  @Column()
  title!: string;

  @ApiProperty()
  @Column({ type: 'text' })
  perex!: string;

  @ApiProperty()
  @Column({ type: 'text' })
  content!: string;

  @ApiProperty()
  @Column({ nullable: false, name: 'user_id' })
  userId!: string;
  @ApiProperty()
  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ApiProperty()
  @Column({ nullable: true, name: 'featured_image_id' })
  featuredImageId?: string;
  @ApiProperty()
  @ManyToOne(() => MediaObject, (mediaObject) => mediaObject.id, { nullable: true })
  @JoinColumn({ name: 'featured_image_id' })
  featuredImage?: MediaObject;

  @ApiProperty()
  @OneToMany(() => Comment, (comment) => comment.article, {
    nullable: false,
  })
  comments!: [Comment];

  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'datetime',
    nullable: true,
  })
  updatedAt?: Date;
}
