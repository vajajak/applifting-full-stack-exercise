import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserDTO } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { UsersService } from './services/users.service';

@Module({
  providers: [
    // Services
    UsersService,
    // Repo
    UserRepository,
  ],
  imports: [
    TypeOrmModule.forFeature([User]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([User])],
      services: [UsersService],
      resolvers: [
        {
          DTOClass: UserDTO,
          EntityClass: User,
          CreateDTOClass: CreateUserInput,
          UpdateDTOClass: UpdateUserInput,
          create: { many: { disabled: true } },
          update: { disabled: true },
          delete: { disabled: true },
          read: { disabled: true },
        },
      ],
    }),
  ],
  exports: [UsersService],
})
export class UsersModule {}
