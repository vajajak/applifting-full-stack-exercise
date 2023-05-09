import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { UserDTO } from './dto/user.dto';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersService } from './services/users.service';
import { UsersResolver } from './resolvers/users.resolver';

@Module({
  providers: [
    // Services
    UsersService,
    // Repo
    UserRepository,
    // Resolvers
    UsersResolver,
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
          update: { disabled: true, many: { disabled: true } },
          delete: { many: { disabled: true } },
          read: { disabled: true },
        },
      ],
    }),
  ],
  exports: [UsersService],
})
export class UsersModule {}
