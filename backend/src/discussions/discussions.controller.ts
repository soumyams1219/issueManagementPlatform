import {
  Controller,
  Get,
  Post,
  Param,
  Body,
} from '@nestjs/common';

import { DiscussionsService } from './discussions.service';
import { CreateDiscussionDto } from './dto/create-discussion.dto';

@Controller('issues/:issueId/discussions')
export class DiscussionsController {
  constructor(
    private readonly discussionsService: DiscussionsService,
  ) {}

  @Get()
  findByIssue(
    @Param('issueId') issueId: string,
  ) {
    return this.discussionsService.findByIssue(
      issueId,
    );
  }

  @Post()
  create(
    @Param('issueId') issueId: string,
    @Body() dto: CreateDiscussionDto,
  ) {
    return this.discussionsService.create(
      issueId,
      dto.message,
    );
  }
}
