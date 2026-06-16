import { Injectable } from '@nestjs/common';
import { db } from '../db/drizzle';
import { issues } from '../db/schema';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class IssuesService {

  async findAll() {
    return db.select().from(issues);
  }

  async create(createIssueDto: CreateIssueDto) {
    const result = await db
      .insert(issues)
      .values({
        title: createIssueDto.title,
        description: createIssueDto.description,
        priority: createIssueDto.priority || 'MEDIUM',
      })
      .returning();

    return result[0];
  }

  async findOne(id: string) {
    const result = await db
      .select()
      .from(issues)
      .where(eq(issues.id, id));

    return result[0];
  }

  async update(id: string, updateIssueDto: UpdateIssueDto) {
    const result = await db
      .update(issues)
      .set({
        ...updateIssueDto,
        updatedAt: new Date(),
      })
      .where(eq(issues.id, id))
      .returning();

    return result[0];
  }

  async remove(id: string) {
    const result = await db
      .delete(issues)
      .where(eq(issues.id, id))
      .returning();

    return result[0];
  }
}