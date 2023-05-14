import { ApiProperty } from '@nestjs/swagger';
import { Article } from 'src/article/entities/article.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @ApiProperty()
  @Column({ type: 'text' })
  content!: string;

  /* Circular reference to self, useful for nested comments */
  @ApiProperty()
  @Column({ nullable: true, name: 'parent_id' })
  parentId?: string;
  @ApiProperty()
  @ManyToOne(() => Comment, (comment) => comment.id, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent?: Comment;

  @ApiProperty()
  @Column({ nullable: false, name: 'user_id' })
  userId!: string;
  @ApiProperty()
  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ApiProperty()
  @Column({ nullable: false, name: 'article_id' })
  articleId!: string;
  @ApiProperty()
  @ManyToOne(() => Article, (article) => article.id, { nullable: false })
  @JoinColumn({ name: 'article_id' })
  article!: Article;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt!: Date;
}
