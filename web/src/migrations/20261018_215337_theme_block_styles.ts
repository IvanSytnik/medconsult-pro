import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_home_hero_style_background" AS ENUM('none', 'white', 'muted', 'gradient', 'dark', 'primary');
  CREATE TYPE "public"."enum_pages_blocks_home_hero_style_spacing" AS ENUM('normal', 'compact');
  CREATE TYPE "public"."enum_pages_blocks_service_hero_style_background" AS ENUM('none', 'white', 'muted', 'gradient', 'dark', 'primary');
  CREATE TYPE "public"."enum_pages_blocks_service_hero_style_spacing" AS ENUM('normal', 'compact');
  CREATE TYPE "public"."enum_pages_blocks_dental_hero_style_background" AS ENUM('none', 'white', 'muted', 'gradient', 'dark', 'primary');
  CREATE TYPE "public"."enum_pages_blocks_dental_hero_style_spacing" AS ENUM('normal', 'compact');
  CREATE TYPE "public"."enum_pages_blocks_icon_cards_style_background" AS ENUM('none', 'white', 'muted', 'gradient', 'dark', 'primary');
  CREATE TYPE "public"."enum_pages_blocks_icon_cards_style_spacing" AS ENUM('normal', 'compact');
  CREATE TYPE "public"."enum_pages_blocks_services_grid_style_background" AS ENUM('none', 'white', 'muted', 'gradient', 'dark', 'primary');
  CREATE TYPE "public"."enum_pages_blocks_services_grid_style_spacing" AS ENUM('normal', 'compact');
  CREATE TYPE "public"."enum_pages_blocks_about_style_background" AS ENUM('none', 'white', 'muted', 'gradient', 'dark', 'primary');
  CREATE TYPE "public"."enum_pages_blocks_about_style_spacing" AS ENUM('normal', 'compact');
  CREATE TYPE "public"."enum_pages_blocks_audience_style_background" AS ENUM('none', 'white', 'muted', 'gradient', 'dark', 'primary');
  CREATE TYPE "public"."enum_pages_blocks_audience_style_spacing" AS ENUM('normal', 'compact');
  CREATE TYPE "public"."enum_pages_blocks_process_style_background" AS ENUM('none', 'white', 'muted', 'gradient', 'dark', 'primary');
  CREATE TYPE "public"."enum_pages_blocks_process_style_spacing" AS ENUM('normal', 'compact');
  CREATE TYPE "public"."enum_pages_blocks_team_style_background" AS ENUM('none', 'white', 'muted', 'gradient', 'dark', 'primary');
  CREATE TYPE "public"."enum_pages_blocks_team_style_spacing" AS ENUM('normal', 'compact');
  CREATE TYPE "public"."enum_pages_blocks_cta_style_background" AS ENUM('none', 'white', 'muted', 'gradient', 'dark', 'primary');
  CREATE TYPE "public"."enum_pages_blocks_cta_style_spacing" AS ENUM('normal', 'compact');
  CREATE TYPE "public"."enum_pages_blocks_contact_style_background" AS ENUM('none', 'white', 'muted', 'gradient', 'dark', 'primary');
  CREATE TYPE "public"."enum_pages_blocks_contact_style_spacing" AS ENUM('normal', 'compact');
  CREATE TYPE "public"."enum_pages_blocks_trust_bar_style_background" AS ENUM('none', 'white', 'muted', 'gradient', 'dark', 'primary');
  CREATE TYPE "public"."enum_pages_blocks_trust_bar_style_spacing" AS ENUM('normal', 'compact');
  CREATE TYPE "public"."enum_pages_blocks_treatment_list_style_background" AS ENUM('none', 'white', 'muted', 'gradient', 'dark', 'primary');
  CREATE TYPE "public"."enum_pages_blocks_treatment_list_style_spacing" AS ENUM('normal', 'compact');
  CREATE TYPE "public"."enum_pages_blocks_procedure_cards_style_background" AS ENUM('none', 'white', 'muted', 'gradient', 'dark', 'primary');
  CREATE TYPE "public"."enum_pages_blocks_procedure_cards_style_spacing" AS ENUM('normal', 'compact');
  CREATE TYPE "public"."enum_pages_blocks_pricing_table_style_background" AS ENUM('none', 'white', 'muted', 'gradient', 'dark', 'primary');
  CREATE TYPE "public"."enum_pages_blocks_pricing_table_style_spacing" AS ENUM('normal', 'compact');
  CREATE TYPE "public"."enum_pages_blocks_clinic_style_background" AS ENUM('none', 'white', 'muted', 'gradient', 'dark', 'primary');
  CREATE TYPE "public"."enum_pages_blocks_clinic_style_spacing" AS ENUM('normal', 'compact');
  CREATE TYPE "public"."enum_pages_blocks_package_style_background" AS ENUM('none', 'white', 'muted', 'gradient', 'dark', 'primary');
  CREATE TYPE "public"."enum_pages_blocks_package_style_spacing" AS ENUM('normal', 'compact');
  CREATE TYPE "public"."enum_pages_blocks_video_slider_style_background" AS ENUM('none', 'white', 'muted', 'gradient', 'dark', 'primary');
  CREATE TYPE "public"."enum_pages_blocks_video_slider_style_spacing" AS ENUM('normal', 'compact');
  CREATE TYPE "public"."enum_pages_blocks_benefits_style_background" AS ENUM('none', 'white', 'muted', 'gradient', 'dark', 'primary');
  CREATE TYPE "public"."enum_pages_blocks_benefits_style_spacing" AS ENUM('normal', 'compact');
  CREATE TYPE "public"."enum_pages_blocks_results_style_background" AS ENUM('none', 'white', 'muted', 'gradient', 'dark', 'primary');
  CREATE TYPE "public"."enum_pages_blocks_results_style_spacing" AS ENUM('normal', 'compact');
  CREATE TYPE "public"."enum_theme_primary_mode" AS ENUM('scale', 'base');
  CREATE TYPE "public"."enum_theme_secondary_mode" AS ENUM('scale', 'base');
  CREATE TYPE "public"."enum_theme_font" AS ENUM('inter', 'manrope', 'montserrat', 'open-sans', 'roboto', 'system');
  CREATE TYPE "public"."enum_theme_radius" AS ENUM('none', 'small', 'medium', 'large', 'xlarge');
  CREATE TABLE "theme" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"primary_mode" "enum_theme_primary_mode" DEFAULT 'scale',
  	"primary_base" varchar DEFAULT '#0f766e',
  	"primary_scale_s50" varchar DEFAULT '#f0fdfa',
  	"primary_scale_s100" varchar DEFAULT '#ccfbf1',
  	"primary_scale_s200" varchar DEFAULT '#99f6e4',
  	"primary_scale_s300" varchar DEFAULT '#5eead4',
  	"primary_scale_s400" varchar DEFAULT '#2dd4bf',
  	"primary_scale_s500" varchar DEFAULT '#14b8a6',
  	"primary_scale_s600" varchar DEFAULT '#0f766e',
  	"primary_scale_s700" varchar DEFAULT '#0d5d56',
  	"primary_scale_s800" varchar DEFAULT '#115e59',
  	"primary_scale_s900" varchar DEFAULT '#134e4a',
  	"secondary_mode" "enum_theme_secondary_mode" DEFAULT 'scale',
  	"secondary_base" varchar DEFAULT '#475569',
  	"secondary_scale_s50" varchar DEFAULT '#f8fafc',
  	"secondary_scale_s100" varchar DEFAULT '#f1f5f9',
  	"secondary_scale_s200" varchar DEFAULT '#e2e8f0',
  	"secondary_scale_s300" varchar DEFAULT '#cbd5e1',
  	"secondary_scale_s400" varchar DEFAULT '#94a3b8',
  	"secondary_scale_s500" varchar DEFAULT '#64748b',
  	"secondary_scale_s600" varchar DEFAULT '#475569',
  	"secondary_scale_s700" varchar DEFAULT '#334155',
  	"secondary_scale_s800" varchar DEFAULT '#1e293b',
  	"secondary_scale_s900" varchar DEFAULT '#0f172a',
  	"font" "enum_theme_font" DEFAULT 'inter',
  	"radius" "enum_theme_radius" DEFAULT 'medium',
  	"logo_image_id" integer,
  	"logo_text" varchar DEFAULT 'MedConsult',
  	"logo_accent" varchar DEFAULT 'Turkey',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_blocks_home_hero" ADD COLUMN "style_background" "enum_pages_blocks_home_hero_style_background" DEFAULT 'gradient';
  ALTER TABLE "pages_blocks_home_hero" ADD COLUMN "style_spacing" "enum_pages_blocks_home_hero_style_spacing" DEFAULT 'normal';
  ALTER TABLE "pages_blocks_service_hero" ADD COLUMN "style_background" "enum_pages_blocks_service_hero_style_background" DEFAULT 'gradient';
  ALTER TABLE "pages_blocks_service_hero" ADD COLUMN "style_spacing" "enum_pages_blocks_service_hero_style_spacing" DEFAULT 'normal';
  ALTER TABLE "pages_blocks_dental_hero" ADD COLUMN "style_background" "enum_pages_blocks_dental_hero_style_background" DEFAULT 'gradient';
  ALTER TABLE "pages_blocks_dental_hero" ADD COLUMN "style_spacing" "enum_pages_blocks_dental_hero_style_spacing" DEFAULT 'normal';
  ALTER TABLE "pages_blocks_icon_cards" ADD COLUMN "style_background" "enum_pages_blocks_icon_cards_style_background" DEFAULT 'none';
  ALTER TABLE "pages_blocks_icon_cards" ADD COLUMN "style_spacing" "enum_pages_blocks_icon_cards_style_spacing" DEFAULT 'normal';
  ALTER TABLE "pages_blocks_services_grid" ADD COLUMN "style_background" "enum_pages_blocks_services_grid_style_background" DEFAULT 'none';
  ALTER TABLE "pages_blocks_services_grid" ADD COLUMN "style_spacing" "enum_pages_blocks_services_grid_style_spacing" DEFAULT 'normal';
  ALTER TABLE "pages_blocks_about" ADD COLUMN "style_background" "enum_pages_blocks_about_style_background" DEFAULT 'none';
  ALTER TABLE "pages_blocks_about" ADD COLUMN "style_spacing" "enum_pages_blocks_about_style_spacing" DEFAULT 'normal';
  ALTER TABLE "pages_blocks_audience" ADD COLUMN "style_background" "enum_pages_blocks_audience_style_background" DEFAULT 'dark';
  ALTER TABLE "pages_blocks_audience" ADD COLUMN "style_spacing" "enum_pages_blocks_audience_style_spacing" DEFAULT 'normal';
  ALTER TABLE "pages_blocks_process" ADD COLUMN "style_background" "enum_pages_blocks_process_style_background" DEFAULT 'none';
  ALTER TABLE "pages_blocks_process" ADD COLUMN "style_spacing" "enum_pages_blocks_process_style_spacing" DEFAULT 'normal';
  ALTER TABLE "pages_blocks_team" ADD COLUMN "style_background" "enum_pages_blocks_team_style_background" DEFAULT 'none';
  ALTER TABLE "pages_blocks_team" ADD COLUMN "style_spacing" "enum_pages_blocks_team_style_spacing" DEFAULT 'normal';
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "style_background" "enum_pages_blocks_cta_style_background" DEFAULT 'primary';
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "style_spacing" "enum_pages_blocks_cta_style_spacing" DEFAULT 'normal';
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "style_background" "enum_pages_blocks_contact_style_background" DEFAULT 'none';
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "style_spacing" "enum_pages_blocks_contact_style_spacing" DEFAULT 'normal';
  ALTER TABLE "pages_blocks_trust_bar" ADD COLUMN "style_background" "enum_pages_blocks_trust_bar_style_background" DEFAULT 'white';
  ALTER TABLE "pages_blocks_trust_bar" ADD COLUMN "style_spacing" "enum_pages_blocks_trust_bar_style_spacing" DEFAULT 'normal';
  ALTER TABLE "pages_blocks_treatment_list" ADD COLUMN "style_background" "enum_pages_blocks_treatment_list_style_background" DEFAULT 'none';
  ALTER TABLE "pages_blocks_treatment_list" ADD COLUMN "style_spacing" "enum_pages_blocks_treatment_list_style_spacing" DEFAULT 'normal';
  ALTER TABLE "pages_blocks_procedure_cards" ADD COLUMN "style_background" "enum_pages_blocks_procedure_cards_style_background" DEFAULT 'none';
  ALTER TABLE "pages_blocks_procedure_cards" ADD COLUMN "style_spacing" "enum_pages_blocks_procedure_cards_style_spacing" DEFAULT 'normal';
  ALTER TABLE "pages_blocks_pricing_table" ADD COLUMN "style_background" "enum_pages_blocks_pricing_table_style_background" DEFAULT 'none';
  ALTER TABLE "pages_blocks_pricing_table" ADD COLUMN "style_spacing" "enum_pages_blocks_pricing_table_style_spacing" DEFAULT 'normal';
  ALTER TABLE "pages_blocks_clinic" ADD COLUMN "style_background" "enum_pages_blocks_clinic_style_background" DEFAULT 'none';
  ALTER TABLE "pages_blocks_clinic" ADD COLUMN "style_spacing" "enum_pages_blocks_clinic_style_spacing" DEFAULT 'normal';
  ALTER TABLE "pages_blocks_package" ADD COLUMN "style_background" "enum_pages_blocks_package_style_background" DEFAULT 'dark';
  ALTER TABLE "pages_blocks_package" ADD COLUMN "style_spacing" "enum_pages_blocks_package_style_spacing" DEFAULT 'normal';
  ALTER TABLE "pages_blocks_video_slider" ADD COLUMN "style_background" "enum_pages_blocks_video_slider_style_background" DEFAULT 'white';
  ALTER TABLE "pages_blocks_video_slider" ADD COLUMN "style_spacing" "enum_pages_blocks_video_slider_style_spacing" DEFAULT 'normal';
  ALTER TABLE "pages_blocks_benefits" ADD COLUMN "style_background" "enum_pages_blocks_benefits_style_background" DEFAULT 'none';
  ALTER TABLE "pages_blocks_benefits" ADD COLUMN "style_spacing" "enum_pages_blocks_benefits_style_spacing" DEFAULT 'normal';
  ALTER TABLE "pages_blocks_results" ADD COLUMN "style_background" "enum_pages_blocks_results_style_background" DEFAULT 'dark';
  ALTER TABLE "pages_blocks_results" ADD COLUMN "style_spacing" "enum_pages_blocks_results_style_spacing" DEFAULT 'normal';
  ALTER TABLE "theme" ADD CONSTRAINT "theme_logo_image_id_media_id_fk" FOREIGN KEY ("logo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "theme_logo_logo_image_idx" ON "theme" USING btree ("logo_image_id");
  -- Keep the backgrounds chosen so far: the old values (none, white, muted) exist in the new style enum.
  UPDATE "pages_blocks_icon_cards" SET "style_background" = "background"::text::"enum_pages_blocks_icon_cards_style_background" WHERE "background" IS NOT NULL;
  UPDATE "pages_blocks_services_grid" SET "style_background" = "background"::text::"enum_pages_blocks_services_grid_style_background" WHERE "background" IS NOT NULL;
  UPDATE "pages_blocks_process" SET "style_background" = "background"::text::"enum_pages_blocks_process_style_background" WHERE "background" IS NOT NULL;
  UPDATE "pages_blocks_team" SET "style_background" = "background"::text::"enum_pages_blocks_team_style_background" WHERE "background" IS NOT NULL;
  UPDATE "pages_blocks_procedure_cards" SET "style_background" = "background"::text::"enum_pages_blocks_procedure_cards_style_background" WHERE "background" IS NOT NULL;
  UPDATE "pages_blocks_pricing_table" SET "style_background" = "background"::text::"enum_pages_blocks_pricing_table_style_background" WHERE "background" IS NOT NULL;
  ALTER TABLE "pages_blocks_icon_cards" DROP COLUMN "background";
  ALTER TABLE "pages_blocks_services_grid" DROP COLUMN "background";
  ALTER TABLE "pages_blocks_process" DROP COLUMN "background";
  ALTER TABLE "pages_blocks_team" DROP COLUMN "background";
  ALTER TABLE "pages_blocks_procedure_cards" DROP COLUMN "background";
  ALTER TABLE "pages_blocks_pricing_table" DROP COLUMN "background";
  DROP TYPE "public"."enum_pages_blocks_icon_cards_background";
  DROP TYPE "public"."enum_pages_blocks_services_grid_background";
  DROP TYPE "public"."enum_pages_blocks_process_background";
  DROP TYPE "public"."enum_pages_blocks_team_background";
  DROP TYPE "public"."enum_pages_blocks_procedure_cards_background";
  DROP TYPE "public"."enum_pages_blocks_pricing_table_background";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_icon_cards_background" AS ENUM('none', 'white', 'muted');
  CREATE TYPE "public"."enum_pages_blocks_services_grid_background" AS ENUM('none', 'white', 'muted');
  CREATE TYPE "public"."enum_pages_blocks_process_background" AS ENUM('none', 'white', 'muted');
  CREATE TYPE "public"."enum_pages_blocks_team_background" AS ENUM('none', 'white', 'muted');
  CREATE TYPE "public"."enum_pages_blocks_procedure_cards_background" AS ENUM('none', 'white', 'muted');
  CREATE TYPE "public"."enum_pages_blocks_pricing_table_background" AS ENUM('none', 'white', 'muted');
  DROP TABLE "theme" CASCADE;
  ALTER TABLE "pages_blocks_icon_cards" ADD COLUMN "background" "enum_pages_blocks_icon_cards_background" DEFAULT 'none';
  ALTER TABLE "pages_blocks_services_grid" ADD COLUMN "background" "enum_pages_blocks_services_grid_background" DEFAULT 'none';
  ALTER TABLE "pages_blocks_process" ADD COLUMN "background" "enum_pages_blocks_process_background" DEFAULT 'none';
  ALTER TABLE "pages_blocks_team" ADD COLUMN "background" "enum_pages_blocks_team_background" DEFAULT 'none';
  ALTER TABLE "pages_blocks_procedure_cards" ADD COLUMN "background" "enum_pages_blocks_procedure_cards_background" DEFAULT 'none';
  ALTER TABLE "pages_blocks_pricing_table" ADD COLUMN "background" "enum_pages_blocks_pricing_table_background" DEFAULT 'none';
  -- Restore the old background field where the value existed before (none, white, muted).
  UPDATE "pages_blocks_icon_cards" SET "background" = "style_background"::text::"enum_pages_blocks_icon_cards_background" WHERE "style_background"::text IN ('none', 'white', 'muted');
  UPDATE "pages_blocks_services_grid" SET "background" = "style_background"::text::"enum_pages_blocks_services_grid_background" WHERE "style_background"::text IN ('none', 'white', 'muted');
  UPDATE "pages_blocks_process" SET "background" = "style_background"::text::"enum_pages_blocks_process_background" WHERE "style_background"::text IN ('none', 'white', 'muted');
  UPDATE "pages_blocks_team" SET "background" = "style_background"::text::"enum_pages_blocks_team_background" WHERE "style_background"::text IN ('none', 'white', 'muted');
  UPDATE "pages_blocks_procedure_cards" SET "background" = "style_background"::text::"enum_pages_blocks_procedure_cards_background" WHERE "style_background"::text IN ('none', 'white', 'muted');
  UPDATE "pages_blocks_pricing_table" SET "background" = "style_background"::text::"enum_pages_blocks_pricing_table_background" WHERE "style_background"::text IN ('none', 'white', 'muted');
  ALTER TABLE "pages_blocks_home_hero" DROP COLUMN "style_background";
  ALTER TABLE "pages_blocks_home_hero" DROP COLUMN "style_spacing";
  ALTER TABLE "pages_blocks_service_hero" DROP COLUMN "style_background";
  ALTER TABLE "pages_blocks_service_hero" DROP COLUMN "style_spacing";
  ALTER TABLE "pages_blocks_dental_hero" DROP COLUMN "style_background";
  ALTER TABLE "pages_blocks_dental_hero" DROP COLUMN "style_spacing";
  ALTER TABLE "pages_blocks_icon_cards" DROP COLUMN "style_background";
  ALTER TABLE "pages_blocks_icon_cards" DROP COLUMN "style_spacing";
  ALTER TABLE "pages_blocks_services_grid" DROP COLUMN "style_background";
  ALTER TABLE "pages_blocks_services_grid" DROP COLUMN "style_spacing";
  ALTER TABLE "pages_blocks_about" DROP COLUMN "style_background";
  ALTER TABLE "pages_blocks_about" DROP COLUMN "style_spacing";
  ALTER TABLE "pages_blocks_audience" DROP COLUMN "style_background";
  ALTER TABLE "pages_blocks_audience" DROP COLUMN "style_spacing";
  ALTER TABLE "pages_blocks_process" DROP COLUMN "style_background";
  ALTER TABLE "pages_blocks_process" DROP COLUMN "style_spacing";
  ALTER TABLE "pages_blocks_team" DROP COLUMN "style_background";
  ALTER TABLE "pages_blocks_team" DROP COLUMN "style_spacing";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "style_background";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "style_spacing";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "style_background";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "style_spacing";
  ALTER TABLE "pages_blocks_trust_bar" DROP COLUMN "style_background";
  ALTER TABLE "pages_blocks_trust_bar" DROP COLUMN "style_spacing";
  ALTER TABLE "pages_blocks_treatment_list" DROP COLUMN "style_background";
  ALTER TABLE "pages_blocks_treatment_list" DROP COLUMN "style_spacing";
  ALTER TABLE "pages_blocks_procedure_cards" DROP COLUMN "style_background";
  ALTER TABLE "pages_blocks_procedure_cards" DROP COLUMN "style_spacing";
  ALTER TABLE "pages_blocks_pricing_table" DROP COLUMN "style_background";
  ALTER TABLE "pages_blocks_pricing_table" DROP COLUMN "style_spacing";
  ALTER TABLE "pages_blocks_clinic" DROP COLUMN "style_background";
  ALTER TABLE "pages_blocks_clinic" DROP COLUMN "style_spacing";
  ALTER TABLE "pages_blocks_package" DROP COLUMN "style_background";
  ALTER TABLE "pages_blocks_package" DROP COLUMN "style_spacing";
  ALTER TABLE "pages_blocks_video_slider" DROP COLUMN "style_background";
  ALTER TABLE "pages_blocks_video_slider" DROP COLUMN "style_spacing";
  ALTER TABLE "pages_blocks_benefits" DROP COLUMN "style_background";
  ALTER TABLE "pages_blocks_benefits" DROP COLUMN "style_spacing";
  ALTER TABLE "pages_blocks_results" DROP COLUMN "style_background";
  ALTER TABLE "pages_blocks_results" DROP COLUMN "style_spacing";
  DROP TYPE "public"."enum_pages_blocks_home_hero_style_background";
  DROP TYPE "public"."enum_pages_blocks_home_hero_style_spacing";
  DROP TYPE "public"."enum_pages_blocks_service_hero_style_background";
  DROP TYPE "public"."enum_pages_blocks_service_hero_style_spacing";
  DROP TYPE "public"."enum_pages_blocks_dental_hero_style_background";
  DROP TYPE "public"."enum_pages_blocks_dental_hero_style_spacing";
  DROP TYPE "public"."enum_pages_blocks_icon_cards_style_background";
  DROP TYPE "public"."enum_pages_blocks_icon_cards_style_spacing";
  DROP TYPE "public"."enum_pages_blocks_services_grid_style_background";
  DROP TYPE "public"."enum_pages_blocks_services_grid_style_spacing";
  DROP TYPE "public"."enum_pages_blocks_about_style_background";
  DROP TYPE "public"."enum_pages_blocks_about_style_spacing";
  DROP TYPE "public"."enum_pages_blocks_audience_style_background";
  DROP TYPE "public"."enum_pages_blocks_audience_style_spacing";
  DROP TYPE "public"."enum_pages_blocks_process_style_background";
  DROP TYPE "public"."enum_pages_blocks_process_style_spacing";
  DROP TYPE "public"."enum_pages_blocks_team_style_background";
  DROP TYPE "public"."enum_pages_blocks_team_style_spacing";
  DROP TYPE "public"."enum_pages_blocks_cta_style_background";
  DROP TYPE "public"."enum_pages_blocks_cta_style_spacing";
  DROP TYPE "public"."enum_pages_blocks_contact_style_background";
  DROP TYPE "public"."enum_pages_blocks_contact_style_spacing";
  DROP TYPE "public"."enum_pages_blocks_trust_bar_style_background";
  DROP TYPE "public"."enum_pages_blocks_trust_bar_style_spacing";
  DROP TYPE "public"."enum_pages_blocks_treatment_list_style_background";
  DROP TYPE "public"."enum_pages_blocks_treatment_list_style_spacing";
  DROP TYPE "public"."enum_pages_blocks_procedure_cards_style_background";
  DROP TYPE "public"."enum_pages_blocks_procedure_cards_style_spacing";
  DROP TYPE "public"."enum_pages_blocks_pricing_table_style_background";
  DROP TYPE "public"."enum_pages_blocks_pricing_table_style_spacing";
  DROP TYPE "public"."enum_pages_blocks_clinic_style_background";
  DROP TYPE "public"."enum_pages_blocks_clinic_style_spacing";
  DROP TYPE "public"."enum_pages_blocks_package_style_background";
  DROP TYPE "public"."enum_pages_blocks_package_style_spacing";
  DROP TYPE "public"."enum_pages_blocks_video_slider_style_background";
  DROP TYPE "public"."enum_pages_blocks_video_slider_style_spacing";
  DROP TYPE "public"."enum_pages_blocks_benefits_style_background";
  DROP TYPE "public"."enum_pages_blocks_benefits_style_spacing";
  DROP TYPE "public"."enum_pages_blocks_results_style_background";
  DROP TYPE "public"."enum_pages_blocks_results_style_spacing";
  DROP TYPE "public"."enum_theme_primary_mode";
  DROP TYPE "public"."enum_theme_secondary_mode";
  DROP TYPE "public"."enum_theme_font";
  DROP TYPE "public"."enum_theme_radius";`)
}
