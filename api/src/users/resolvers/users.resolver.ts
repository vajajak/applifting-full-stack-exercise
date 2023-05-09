import { Resolver } from '@nestjs/graphql';
import { UserDTO } from '../dto/user.dto';
import { UsersService } from '../services/users.service';

@Resolver(() => UserDTO)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
}
