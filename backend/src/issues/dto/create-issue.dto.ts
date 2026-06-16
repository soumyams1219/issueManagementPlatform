import {
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateIssueDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  priority?: string;
}