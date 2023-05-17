import { ApiProperty } from '@nestjs/swagger';
import { Comment } from 'src/comments/entities/comment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VoteType } from '../enums/vote-type.enum';

@Entity()
export class Vote {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @ApiProperty()
  @Column({ type: 'enum', enum: VoteType, nullable: false })
  voteType!: string;

  @ApiProperty()
  @Column({ name: 'ip_address' })
  ipAddress!: string;

  @ApiProperty()
  @Column({ nullable: false, name: 'comment_id' })
  commentId!: string;
  @ApiProperty()
  @ManyToOne(() => Comment, (comment) => comment.id, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'comment_id' })
  comment!: Comment;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt!: Date;
}
