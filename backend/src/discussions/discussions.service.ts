import { Injectable } from '@nestjs/common';
import { db } from '../db/drizzle';
import { discussions } from '../db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class DiscussionsService {

  async findByIssue(issueId: string) {
    return db
      .select()
      .from(discussions)
      .where(eq(discussions.issueId, issueId));
  }

  async create(
    issueId: string,
    message: string,
  ) {
    const result = await db
      .insert(discussions)
      .values({
        issueId,
        message,
      })
      .returning();

    return result[0];
  }
}