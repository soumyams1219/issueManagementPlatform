ALTER TABLE "discussions" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "issues" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "issues" ALTER COLUMN "priority" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "issues" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "issues" ADD COLUMN "analysis" text;--> statement-breakpoint
ALTER TABLE "issues" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "discussions" ADD CONSTRAINT "discussions_issue_id_issues_id_fk" FOREIGN KEY ("issue_id") REFERENCES "public"."issues"("id") ON DELETE cascade ON UPDATE no action;