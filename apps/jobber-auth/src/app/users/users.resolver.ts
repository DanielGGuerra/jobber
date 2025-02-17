import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Mutation(() => User)
    async createUser(
        @Args('createUserInput') CreateUserInput: CreateUserInput
    ) {
        return this.usersService.createUser(CreateUserInput);
    }

    @Query(() => [User], { name: 'users' })
    async getUsers() {
        return this.usersService.getUsers();
    }

}
