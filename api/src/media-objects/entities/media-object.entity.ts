import { registerEnumType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MediaObjectType } from '../enums/media-object-type';

registerEnumType(MediaObjectType, { name: 'MediaObjectType' });

@Entity()
export class MediaObject {
  /* ID souboru */
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  /* Typ souboru */
  @ApiProperty()
  @Column({ type: 'enum', enum: MediaObjectType, default: MediaObjectType['file'] })
  type!: MediaObjectType;

  /* Cesta k souboru */
  @ApiProperty()
  @Column()
  path!: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt?: Date;
}
