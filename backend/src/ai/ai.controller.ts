import { Controller, Post, Param } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('issues')
export class AiController {
  constructor(private readonly aiService: AiService) {}

@Post(':id/analyze')
async analyze(@Param('id') id: string) {
  try {
    console.log("ANALYZE HIT:", id);

    const result = await this.aiService.analyzeIssue(id);

    console.log("ANALYZE DONE");

    return result;

  } catch (error) {
    console.error("CONTROLLER ERROR:", error);
    throw error;
  }
}
}