import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote } from './entities/vote.entity';
import { VoteType } from './enums/vote-type.enum';

@Injectable()
export class VotesService {
  constructor(@InjectRepository(Vote) private voteRepository: Repository<Vote>) {}

  async userVote(commentId: string, ipAddress: string): Promise<Vote> {
    return await this.voteRepository.findOne({ where: { ipAddress, commentId } });
  }

  async addVote(
    commentId: string,
    voteType: VoteType,
    ipAddress: string
  ): Promise<{ success: boolean; message?: string }> {
    const userVote = await this.userVote(commentId, ipAddress);
    if (userVote.voteType === voteType) {
      return { success: false, message: 'user_already_voted' };
    }

    try {
      if (userVote.voteType) {
        const res = await this.voteRepository.update(userVote.id, { voteType });

        if (res.affected) {
          return { success: true };
        }
        return { success: false };
      }

      const res = await this.voteRepository.save({ commentId, ipAddress, voteType });

      if (res.commentId) {
        return { success: true };
      }
      return { success: false };
    } catch (e) {
      return { success: false, message: e };
    }
  }

  async countVotes(commentId: string, voteType: VoteType): Promise<number> {
    return await this.voteRepository.count({ where: { commentId, voteType } });
  }
}
