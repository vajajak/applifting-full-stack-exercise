import { ApiProperty } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs';
import { Transform } from 'class-transformer';
import { MediaObject } from '../../media-objects/entities/media-object.entity';
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
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ApiProperty()
  @Column({ name: 'first_name' })
  firstName: string;

  @ApiProperty()
  @Column({ name: 'last_name' })
  lastName: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Transform(({ value }) => hashSync(value))
  @Column()
  password: string;

  @ApiProperty()
  @ManyToOne(() => MediaObject, (MediaObject) => MediaObject.id, {
    nullable: true,
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'avatar_id' })
  avatar?: MediaObject;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at', type: 'datetime', nullable: true })
  updatedAt: Date;
}
