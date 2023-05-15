import { Module } from '@nestjs/common';
import { VoteRepository } from './vote.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './entities/vote.entity';
import { VotesService } from './votes.service';
import { VotesResolver } from './vote.resolver';

@Module({
  providers: [VoteRepository, VotesService, VotesResolver],
  imports: [TypeOrmModule.forFeature([Vote])],
  exports: [VotesService, VoteRepository],
})
export class VotesModule {}
