import { Args, ID, Mutation, Resolver, registerEnumType } from '@nestjs/graphql';
import { UserIp } from './decorators/ip-decorator';
import { VoteDTO } from './dto/vote.dto';
import { VoteType } from './enums/vote-type.enum';
import { VotesService } from './votes.service';

registerEnumType(VoteType, { name: 'VoteType' });

@Resolver('Vote')
export class VotesResolver {
  constructor(private votesService: VotesService) {}

  @Mutation(() => VoteDTO)
  async setVote(
    @Args('commentId', { type: () => ID }) commentId: string,
    @Args('voteType', { type: () => VoteType }) voteType: VoteType,
    @UserIp() ip: string
  ) {
    return await this.votesService.addVote(commentId, voteType, ip);
  }
}
