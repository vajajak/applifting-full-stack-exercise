import { Inject } from '@nestjs/common';
import { Parent, Resolver, registerEnumType } from '@nestjs/graphql';
import { InjectQueryService, QueryService } from '@ptc-org/nestjs-query-core';
import { ReadResolver } from '@ptc-org/nestjs-query-graphql';
import { ResolverField } from '@ptc-org/nestjs-query-graphql/src/decorators';
import { VotesService } from 'src/votes/votes.service';
import { CommentDTO } from './dto/comment.dto';
import { Comment } from './entities/comment.entity';
import { UserIp } from 'src/votes/decorators/ip-decorator';
import { VoteType } from 'src/votes/enums/vote-type.enum';

registerEnumType(VoteType, { name: 'VoteType' });

@Resolver(() => CommentDTO)
export class CommentResolver extends ReadResolver(CommentDTO) {
  constructor(
    @InjectQueryService(Comment) readonly service: QueryService<CommentDTO>,
    @Inject(VotesService) private votesService: VotesService
  ) {
    super(service);
  }

  @ResolverField('voted', () => VoteType, { nullable: true })
  async getVoted(@UserIp() ip: string, @Parent() commentDto: CommentDTO) {
    const res = await this.votesService.userVote(commentDto.id, ip);
    return res?.voteType || null;
  }

  @ResolverField('upVotes', () => Number, { nullable: false })
  async getUpvotes(@Parent() commentDto: CommentDTO) {
    return await this.votesService.countVotes(commentDto.id, VoteType.up);
  }

  @ResolverField('downVotes', () => Number, { nullable: false })
  async getDownVotes(@Parent() commentDto: CommentDTO) {
    return await this.votesService.countVotes(commentDto.id, VoteType.down);
  }
}
