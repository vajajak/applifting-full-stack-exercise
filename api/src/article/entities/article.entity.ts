import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
