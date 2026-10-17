import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('de', 'ru', 'uk', 'en');
  CREATE TYPE "public"."enum_pages_blocks_home_hero_floating_icon" AS ENUM('smile', 'crown', 'award', 'syringe', 'scissors', 'wrench', 'diamond', 'sparkles', 'bone', 'building', 'check-circle', 'stethoscope', 'wallet', 'clock', 'palmtree', 'shield', 'users', 'heart-pulse', 'microscope', 'target', 'trending-up', 'calendar', 'sprout', 'badge-check', 'zap', 'star', 'flask', 'globe', 'hotel', 'car', 'headphones', 'clipboard-list', 'mail', 'phone', 'message-circle', 'map-pin', 'infinity');
  CREATE TYPE "public"."enum_pages_blocks_service_hero_badge_icon" AS ENUM('smile', 'crown', 'award', 'syringe', 'scissors', 'wrench', 'diamond', 'sparkles', 'bone', 'building', 'check-circle', 'stethoscope', 'wallet', 'clock', 'palmtree', 'shield', 'users', 'heart-pulse', 'microscope', 'target', 'trending-up', 'calendar', 'sprout', 'badge-check', 'zap', 'star', 'flask', 'globe', 'hotel', 'car', 'headphones', 'clipboard-list', 'mail', 'phone', 'message-circle', 'map-pin', 'infinity');
  CREATE TYPE "public"."enum_pages_blocks_dental_hero_badge_icon" AS ENUM('smile', 'crown', 'award', 'syringe', 'scissors', 'wrench', 'diamond', 'sparkles', 'bone', 'building', 'check-circle', 'stethoscope', 'wallet', 'clock', 'palmtree', 'shield', 'users', 'heart-pulse', 'microscope', 'target', 'trending-up', 'calendar', 'sprout', 'badge-check', 'zap', 'star', 'flask', 'globe', 'hotel', 'car', 'headphones', 'clipboard-list', 'mail', 'phone', 'message-circle', 'map-pin', 'infinity');
  CREATE TYPE "public"."enum_pages_blocks_icon_cards_items_icon" AS ENUM('smile', 'crown', 'award', 'syringe', 'scissors', 'wrench', 'diamond', 'sparkles', 'bone', 'building', 'check-circle', 'stethoscope', 'wallet', 'clock', 'palmtree', 'shield', 'users', 'heart-pulse', 'microscope', 'target', 'trending-up', 'calendar', 'sprout', 'badge-check', 'zap', 'star', 'flask', 'globe', 'hotel', 'car', 'headphones', 'clipboard-list', 'mail', 'phone', 'message-circle', 'map-pin', 'infinity');
  CREATE TYPE "public"."enum_pages_blocks_icon_cards_background" AS ENUM('none', 'white', 'muted');
  CREATE TYPE "public"."enum_pages_blocks_services_grid_background" AS ENUM('none', 'white', 'muted');
  CREATE TYPE "public"."enum_pages_blocks_process_extra_items_icon" AS ENUM('smile', 'crown', 'award', 'syringe', 'scissors', 'wrench', 'diamond', 'sparkles', 'bone', 'building', 'check-circle', 'stethoscope', 'wallet', 'clock', 'palmtree', 'shield', 'users', 'heart-pulse', 'microscope', 'target', 'trending-up', 'calendar', 'sprout', 'badge-check', 'zap', 'star', 'flask', 'globe', 'hotel', 'car', 'headphones', 'clipboard-list', 'mail', 'phone', 'message-circle', 'map-pin', 'infinity');
  CREATE TYPE "public"."enum_pages_blocks_process_background" AS ENUM('none', 'white', 'muted');
  CREATE TYPE "public"."enum_pages_blocks_process_extra_style" AS ENUM('none', 'timeline', 'cards');
  CREATE TYPE "public"."enum_pages_blocks_team_background" AS ENUM('none', 'white', 'muted');
  CREATE TYPE "public"."enum_pages_blocks_contact_variant" AS ENUM('full', 'compact', 'direct');
  CREATE TYPE "public"."enum_pages_blocks_trust_bar_items_icon" AS ENUM('smile', 'crown', 'award', 'syringe', 'scissors', 'wrench', 'diamond', 'sparkles', 'bone', 'building', 'check-circle', 'stethoscope', 'wallet', 'clock', 'palmtree', 'shield', 'users', 'heart-pulse', 'microscope', 'target', 'trending-up', 'calendar', 'sprout', 'badge-check', 'zap', 'star', 'flask', 'globe', 'hotel', 'car', 'headphones', 'clipboard-list', 'mail', 'phone', 'message-circle', 'map-pin', 'infinity');
  CREATE TYPE "public"."enum_pages_blocks_procedure_cards_rows_field" AS ENUM('duration', 'recovery', 'grafts', 'survival', 'effect', 'downtime');
  CREATE TYPE "public"."enum_pages_blocks_procedure_cards_background" AS ENUM('none', 'white', 'muted');
  CREATE TYPE "public"."enum_pages_blocks_pricing_table_rows_icon" AS ENUM('smile', 'crown', 'award', 'syringe', 'scissors', 'wrench', 'diamond', 'sparkles', 'bone', 'building', 'check-circle', 'stethoscope', 'wallet', 'clock', 'palmtree', 'shield', 'users', 'heart-pulse', 'microscope', 'target', 'trending-up', 'calendar', 'sprout', 'badge-check', 'zap', 'star', 'flask', 'globe', 'hotel', 'car', 'headphones', 'clipboard-list', 'mail', 'phone', 'message-circle', 'map-pin', 'infinity');
  CREATE TYPE "public"."enum_pages_blocks_pricing_table_background" AS ENUM('none', 'white', 'muted');
  CREATE TYPE "public"."enum_pages_blocks_package_items_icon" AS ENUM('smile', 'crown', 'award', 'syringe', 'scissors', 'wrench', 'diamond', 'sparkles', 'bone', 'building', 'check-circle', 'stethoscope', 'wallet', 'clock', 'palmtree', 'shield', 'users', 'heart-pulse', 'microscope', 'target', 'trending-up', 'calendar', 'sprout', 'badge-check', 'zap', 'star', 'flask', 'globe', 'hotel', 'car', 'headphones', 'clipboard-list', 'mail', 'phone', 'message-circle', 'map-pin', 'infinity');
  CREATE TYPE "public"."enum_pages_blocks_video_slider_thumbnails" AS ENUM('four', 'three');
  CREATE TYPE "public"."enum_pages_blocks_results_stats_icon" AS ENUM('smile', 'crown', 'award', 'syringe', 'scissors', 'wrench', 'diamond', 'sparkles', 'bone', 'building', 'check-circle', 'stethoscope', 'wallet', 'clock', 'palmtree', 'shield', 'users', 'heart-pulse', 'microscope', 'target', 'trending-up', 'calendar', 'sprout', 'badge-check', 'zap', 'star', 'flask', 'globe', 'hotel', 'car', 'headphones', 'clipboard-list', 'mail', 'phone', 'message-circle', 'map-pin', 'infinity');
  CREATE TYPE "public"."enum_pages_blocks_results_columns" AS ENUM('3', '4');
  CREATE TYPE "public"."enum_pages_blocks_results_cta_icon" AS ENUM('smile', 'crown', 'award', 'syringe', 'scissors', 'wrench', 'diamond', 'sparkles', 'bone', 'building', 'check-circle', 'stethoscope', 'wallet', 'clock', 'palmtree', 'shield', 'users', 'heart-pulse', 'microscope', 'target', 'trending-up', 'calendar', 'sprout', 'badge-check', 'zap', 'star', 'flask', 'globe', 'hotel', 'car', 'headphones', 'clipboard-list', 'mail', 'phone', 'message-circle', 'map-pin', 'infinity');
  CREATE TYPE "public"."enum_services_icon" AS ENUM('smile', 'crown', 'award', 'syringe', 'scissors', 'wrench', 'diamond', 'sparkles', 'bone', 'building', 'check-circle', 'stethoscope', 'wallet', 'clock', 'palmtree', 'shield', 'users', 'heart-pulse', 'microscope', 'target', 'trending-up', 'calendar', 'sprout', 'badge-check', 'zap', 'star', 'flask', 'globe', 'hotel', 'car', 'headphones', 'clipboard-list', 'mail', 'phone', 'message-circle', 'map-pin', 'infinity');
  CREATE TYPE "public"."enum_treatments_icon" AS ENUM('smile', 'crown', 'award', 'syringe', 'scissors', 'wrench', 'diamond', 'sparkles', 'bone', 'building', 'check-circle', 'stethoscope', 'wallet', 'clock', 'palmtree', 'shield', 'users', 'heart-pulse', 'microscope', 'target', 'trending-up', 'calendar', 'sprout', 'badge-check', 'zap', 'star', 'flask', 'globe', 'hotel', 'car', 'headphones', 'clipboard-list', 'mail', 'phone', 'message-circle', 'map-pin', 'infinity');
  CREATE TYPE "public"."enum_clinics_features_icon" AS ENUM('smile', 'crown', 'award', 'syringe', 'scissors', 'wrench', 'diamond', 'sparkles', 'bone', 'building', 'check-circle', 'stethoscope', 'wallet', 'clock', 'palmtree', 'shield', 'users', 'heart-pulse', 'microscope', 'target', 'trending-up', 'calendar', 'sprout', 'badge-check', 'zap', 'star', 'flask', 'globe', 'hotel', 'car', 'headphones', 'clipboard-list', 'mail', 'phone', 'message-circle', 'map-pin', 'infinity');
  CREATE TYPE "public"."enum_team_members_languages" AS ENUM('de', 'ru', 'uk', 'en');
  CREATE TYPE "public"."enum_users_role" AS ENUM('owner', 'coordinator');
  CREATE TABLE "pages_blocks_home_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_home_hero_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_home_hero_floating" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_home_hero_floating_icon"
  );
  
  CREATE TABLE "pages_blocks_home_hero_floating_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_home_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"hidden" boolean DEFAULT false,
  	"primary_href" varchar,
  	"secondary_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_home_hero_locales" (
  	"badge" varchar,
  	"title" varchar,
  	"title_accent" varchar,
  	"subtitle" varchar,
  	"primary_label" varchar,
  	"secondary_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_service_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_service_hero_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_service_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"hidden" boolean DEFAULT false,
  	"badge_icon" "enum_pages_blocks_service_hero_badge_icon",
  	"primary_href" varchar,
  	"secondary_href" varchar,
  	"image_id" integer,
  	"float_value" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_service_hero_locales" (
  	"tag" varchar,
  	"title" varchar,
  	"title_accent" varchar,
  	"description" varchar,
  	"primary_label" varchar,
  	"secondary_label" varchar,
  	"float_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_dental_hero_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_dental_hero_features_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_dental_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_dental_hero_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_dental_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"hidden" boolean DEFAULT false,
  	"badge_icon" "enum_pages_blocks_dental_hero_badge_icon",
  	"primary_href" varchar,
  	"secondary_href" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_dental_hero_locales" (
  	"back_label" varchar,
  	"badge" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"primary_label" varchar,
  	"secondary_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_icon_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_icon_cards_items_icon"
  );
  
  CREATE TABLE "pages_blocks_icon_cards_items_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_icon_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"hidden" boolean DEFAULT false,
  	"background" "enum_pages_blocks_icon_cards_background" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_icon_cards_locales" (
  	"tag" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_services_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"hidden" boolean DEFAULT false,
  	"background" "enum_pages_blocks_services_grid_background" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services_grid_locales" (
  	"tag" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"more_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_features_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"hidden" boolean DEFAULT false,
  	"image_id" integer,
  	"badge_value" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_about_locales" (
  	"tag" varchar,
  	"title" varchar,
  	"lead" varchar,
  	"text" varchar,
  	"badge_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_audience_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_audience_items_locales" (
  	"label" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_audience" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"hidden" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_audience_locales" (
  	"tag" varchar,
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_process_steps_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_process_extra_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_process_extra_items_icon"
  );
  
  CREATE TABLE "pages_blocks_process_extra_items_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"hidden" boolean DEFAULT false,
  	"background" "enum_pages_blocks_process_background" DEFAULT 'none',
  	"extra_style" "enum_pages_blocks_process_extra_style" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_process_locales" (
  	"tag" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"extra_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"hidden" boolean DEFAULT false,
  	"background" "enum_pages_blocks_team_background" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_team_locales" (
  	"tag" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"chief_label" varchar,
  	"whatsapp_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"hidden" boolean DEFAULT false,
  	"button_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"text" varchar,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"hidden" boolean DEFAULT false,
  	"variant" "enum_pages_blocks_contact_variant" DEFAULT 'full',
  	"source" varchar DEFAULT 'main',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_locales" (
  	"tag" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"cards_phone_title" varchar,
  	"cards_phone_note" varchar,
  	"cards_whatsapp_title" varchar,
  	"cards_whatsapp_text" varchar,
  	"cards_whatsapp_note" varchar,
  	"cards_email_title" varchar,
  	"cards_email_note" varchar,
  	"cards_office_title" varchar,
  	"cards_office_text" varchar,
  	"cards_office_note" varchar,
  	"direct_text" varchar,
  	"direct_whatsapp_label" varchar,
  	"direct_email_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_trust_bar_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_trust_bar_items_icon",
  	"badge_text" varchar
  );
  
  CREATE TABLE "pages_blocks_trust_bar_items_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_trust_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"hidden" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_treatment_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"hidden" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_treatment_list_locales" (
  	"tag" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_procedure_cards_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" "enum_pages_blocks_procedure_cards_rows_field" NOT NULL,
  	"highlight" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_procedure_cards_rows_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_procedure_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"hidden" boolean DEFAULT false,
  	"background" "enum_pages_blocks_procedure_cards_background" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_procedure_cards_locales" (
  	"tag" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"from_label" varchar,
  	"learn_more_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_pricing_table_rows_icon",
  	"savings" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_table_rows_locales" (
  	"label" varchar,
  	"germany_price" varchar,
  	"our_price" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"hidden" boolean DEFAULT false,
  	"background" "enum_pages_blocks_pricing_table_background" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_table_locales" (
  	"tag" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"columns_procedure" varchar,
  	"columns_germany" varchar,
  	"columns_our_price" varchar,
  	"columns_savings" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_clinic" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"hidden" boolean DEFAULT false,
  	"clinic_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_clinic_locales" (
  	"tag" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_package_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_package_items_icon"
  );
  
  CREATE TABLE "pages_blocks_package_items_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_package" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"hidden" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_package_locales" (
  	"tag" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_video_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"hidden" boolean DEFAULT false,
  	"thumbnails" "enum_pages_blocks_video_slider_thumbnails" DEFAULT 'four',
  	"primary_href" varchar,
  	"secondary_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_video_slider_locales" (
  	"tag" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"cta_title" varchar,
  	"cta_desc" varchar,
  	"primary_label" varchar,
  	"secondary_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_benefits_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_benefits_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"hidden" boolean DEFAULT false,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_benefits_locales" (
  	"tag" varchar,
  	"title" varchar,
  	"description" varchar,
  	"savings_label" varchar,
  	"savings_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_results_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"icon" "enum_pages_blocks_results_stats_icon"
  );
  
  CREATE TABLE "pages_blocks_results_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"hidden" boolean DEFAULT false,
  	"columns" "enum_pages_blocks_results_columns" DEFAULT '3',
  	"cta_icon" "enum_pages_blocks_results_cta_icon",
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_results_locales" (
  	"tag" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"team_members_id" integer,
  	"treatments_id" integer,
  	"videos_id" integer
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"icon" "enum_services_icon",
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "services_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"price_label" varchar,
  	"price_from" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "treatments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"service_id" integer,
  	"icon" "enum_treatments_icon",
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "treatments_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"price_label" varchar,
  	"price" varchar,
  	"duration" varchar,
  	"recovery" varchar,
  	"downtime" varchar,
  	"grafts" varchar,
  	"survival" varchar,
  	"effect" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "clinics_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_clinics_features_icon"
  );
  
  CREATE TABLE "clinics_features_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "clinics_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "clinics" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"doctor_photo_id" integer,
  	"team_photo_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "clinics_locales" (
  	"name" varchar NOT NULL,
  	"subtitle" varchar,
  	"doctor_name" varchar,
  	"doctor_role" varchar,
  	"doctor_bio" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "team_members_languages" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_team_members_languages",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "team_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"photo_id" integer,
  	"phone" varchar,
  	"chief" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "team_members_locales" (
  	"name" varchar NOT NULL,
  	"role" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "videos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar,
  	"thumbnail_url" varchar,
  	"file_id" integer,
  	"poster_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seed_key" varchar,
  	"prefix" varchar DEFAULT '',
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" "enum_users_role" DEFAULT 'coordinator' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"services_id" integer,
  	"treatments_id" integer,
  	"clinics_id" integer,
  	"team_members_id" integer,
  	"videos_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"network" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "site_settings_nav_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "site_settings_nav_links_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_footer_company_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "site_settings_footer_company_links_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"phone" varchar,
  	"email" varchar,
  	"website" varchar,
  	"whatsapp" varchar,
  	"whatsapp_float" varchar,
  	"whatsapp_form" varchar,
  	"nav_cta_href" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"nav_cta_label" varchar,
  	"footer_description" varchar,
  	"footer_services_title" varchar,
  	"footer_company_title" varchar,
  	"footer_contact_title" varchar,
  	"footer_copyright" varchar,
  	"footer_privacy_label" varchar,
  	"footer_impressum_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "legal" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "legal_locales" (
  	"impressum_title" varchar,
  	"impressum_back_label" varchar,
  	"impressum_description" varchar,
  	"impressum_content" jsonb,
  	"privacy_title" varchar,
  	"privacy_back_label" varchar,
  	"privacy_description" varchar,
  	"privacy_content" jsonb,
  	"privacy_last_updated" varchar,
  	"privacy_contact_title" varchar,
  	"privacy_contact_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_home_hero_stats" ADD CONSTRAINT "pages_blocks_home_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_home_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_hero_stats_locales" ADD CONSTRAINT "pages_blocks_home_hero_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_home_hero_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_hero_floating" ADD CONSTRAINT "pages_blocks_home_hero_floating_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_home_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_hero_floating_locales" ADD CONSTRAINT "pages_blocks_home_hero_floating_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_home_hero_floating"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_hero" ADD CONSTRAINT "pages_blocks_home_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_hero_locales" ADD CONSTRAINT "pages_blocks_home_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_home_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_hero_stats" ADD CONSTRAINT "pages_blocks_service_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_hero_stats_locales" ADD CONSTRAINT "pages_blocks_service_hero_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_hero_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_hero" ADD CONSTRAINT "pages_blocks_service_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_hero" ADD CONSTRAINT "pages_blocks_service_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_hero_locales" ADD CONSTRAINT "pages_blocks_service_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_dental_hero_features" ADD CONSTRAINT "pages_blocks_dental_hero_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_dental_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_dental_hero_features_locales" ADD CONSTRAINT "pages_blocks_dental_hero_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_dental_hero_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_dental_hero_stats" ADD CONSTRAINT "pages_blocks_dental_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_dental_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_dental_hero_stats_locales" ADD CONSTRAINT "pages_blocks_dental_hero_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_dental_hero_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_dental_hero" ADD CONSTRAINT "pages_blocks_dental_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_dental_hero" ADD CONSTRAINT "pages_blocks_dental_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_dental_hero_locales" ADD CONSTRAINT "pages_blocks_dental_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_dental_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_icon_cards_items" ADD CONSTRAINT "pages_blocks_icon_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_icon_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_icon_cards_items_locales" ADD CONSTRAINT "pages_blocks_icon_cards_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_icon_cards_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_icon_cards" ADD CONSTRAINT "pages_blocks_icon_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_icon_cards_locales" ADD CONSTRAINT "pages_blocks_icon_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_icon_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_grid" ADD CONSTRAINT "pages_blocks_services_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_grid_locales" ADD CONSTRAINT "pages_blocks_services_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_features" ADD CONSTRAINT "pages_blocks_about_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_features_locales" ADD CONSTRAINT "pages_blocks_about_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about" ADD CONSTRAINT "pages_blocks_about_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about" ADD CONSTRAINT "pages_blocks_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_locales" ADD CONSTRAINT "pages_blocks_about_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_audience_items" ADD CONSTRAINT "pages_blocks_audience_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_audience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_audience_items_locales" ADD CONSTRAINT "pages_blocks_audience_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_audience_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_audience" ADD CONSTRAINT "pages_blocks_audience_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_audience_locales" ADD CONSTRAINT "pages_blocks_audience_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_audience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps" ADD CONSTRAINT "pages_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps_locales" ADD CONSTRAINT "pages_blocks_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_extra_items" ADD CONSTRAINT "pages_blocks_process_extra_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_extra_items_locales" ADD CONSTRAINT "pages_blocks_process_extra_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_extra_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process" ADD CONSTRAINT "pages_blocks_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_locales" ADD CONSTRAINT "pages_blocks_process_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team" ADD CONSTRAINT "pages_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_locales" ADD CONSTRAINT "pages_blocks_team_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_locales" ADD CONSTRAINT "pages_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact" ADD CONSTRAINT "pages_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_locales" ADD CONSTRAINT "pages_blocks_contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trust_bar_items" ADD CONSTRAINT "pages_blocks_trust_bar_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_trust_bar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trust_bar_items_locales" ADD CONSTRAINT "pages_blocks_trust_bar_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_trust_bar_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trust_bar" ADD CONSTRAINT "pages_blocks_trust_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_treatment_list" ADD CONSTRAINT "pages_blocks_treatment_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_treatment_list_locales" ADD CONSTRAINT "pages_blocks_treatment_list_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_treatment_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_procedure_cards_rows" ADD CONSTRAINT "pages_blocks_procedure_cards_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_procedure_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_procedure_cards_rows_locales" ADD CONSTRAINT "pages_blocks_procedure_cards_rows_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_procedure_cards_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_procedure_cards" ADD CONSTRAINT "pages_blocks_procedure_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_procedure_cards_locales" ADD CONSTRAINT "pages_blocks_procedure_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_procedure_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_table_rows" ADD CONSTRAINT "pages_blocks_pricing_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_table_rows_locales" ADD CONSTRAINT "pages_blocks_pricing_table_rows_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_table" ADD CONSTRAINT "pages_blocks_pricing_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_table_locales" ADD CONSTRAINT "pages_blocks_pricing_table_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_clinic" ADD CONSTRAINT "pages_blocks_clinic_clinic_id_clinics_id_fk" FOREIGN KEY ("clinic_id") REFERENCES "public"."clinics"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_clinic" ADD CONSTRAINT "pages_blocks_clinic_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_clinic_locales" ADD CONSTRAINT "pages_blocks_clinic_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_clinic"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_package_items" ADD CONSTRAINT "pages_blocks_package_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_package"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_package_items_locales" ADD CONSTRAINT "pages_blocks_package_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_package_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_package" ADD CONSTRAINT "pages_blocks_package_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_package_locales" ADD CONSTRAINT "pages_blocks_package_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_package"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_slider" ADD CONSTRAINT "pages_blocks_video_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_slider_locales" ADD CONSTRAINT "pages_blocks_video_slider_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_video_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_benefits_items" ADD CONSTRAINT "pages_blocks_benefits_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_benefits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_benefits_items_locales" ADD CONSTRAINT "pages_blocks_benefits_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_benefits_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_benefits" ADD CONSTRAINT "pages_blocks_benefits_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_benefits" ADD CONSTRAINT "pages_blocks_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_benefits_locales" ADD CONSTRAINT "pages_blocks_benefits_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_benefits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_results_stats" ADD CONSTRAINT "pages_blocks_results_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_results"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_results_stats_locales" ADD CONSTRAINT "pages_blocks_results_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_results_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_results" ADD CONSTRAINT "pages_blocks_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_results_locales" ADD CONSTRAINT "pages_blocks_results_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_results"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_treatments_fk" FOREIGN KEY ("treatments_id") REFERENCES "public"."treatments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_videos_fk" FOREIGN KEY ("videos_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "treatments" ADD CONSTRAINT "treatments_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "treatments" ADD CONSTRAINT "treatments_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "treatments_locales" ADD CONSTRAINT "treatments_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."treatments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "clinics_features" ADD CONSTRAINT "clinics_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."clinics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "clinics_features_locales" ADD CONSTRAINT "clinics_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."clinics_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "clinics_gallery" ADD CONSTRAINT "clinics_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "clinics_gallery" ADD CONSTRAINT "clinics_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."clinics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "clinics" ADD CONSTRAINT "clinics_doctor_photo_id_media_id_fk" FOREIGN KEY ("doctor_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "clinics" ADD CONSTRAINT "clinics_team_photo_id_media_id_fk" FOREIGN KEY ("team_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "clinics_locales" ADD CONSTRAINT "clinics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."clinics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_members_languages" ADD CONSTRAINT "team_members_languages_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team_members_locales" ADD CONSTRAINT "team_members_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos" ADD CONSTRAINT "videos_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "videos" ADD CONSTRAINT "videos_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_treatments_fk" FOREIGN KEY ("treatments_id") REFERENCES "public"."treatments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_clinics_fk" FOREIGN KEY ("clinics_id") REFERENCES "public"."clinics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_videos_fk" FOREIGN KEY ("videos_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social" ADD CONSTRAINT "site_settings_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_nav_links" ADD CONSTRAINT "site_settings_nav_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_nav_links_locales" ADD CONSTRAINT "site_settings_nav_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_nav_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_company_links" ADD CONSTRAINT "site_settings_footer_company_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_company_links_locales" ADD CONSTRAINT "site_settings_footer_company_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_footer_company_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "legal_locales" ADD CONSTRAINT "legal_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."legal"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_home_hero_stats_order_idx" ON "pages_blocks_home_hero_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_hero_stats_parent_id_idx" ON "pages_blocks_home_hero_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_home_hero_stats_locales_locale_parent_id_unique" ON "pages_blocks_home_hero_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_home_hero_stats_locales_parent_id_idx" ON "pages_blocks_home_hero_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_hero_floating_order_idx" ON "pages_blocks_home_hero_floating" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_hero_floating_parent_id_idx" ON "pages_blocks_home_hero_floating" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_home_hero_floating_locales_locale_parent_id_uni" ON "pages_blocks_home_hero_floating_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_home_hero_floating_locales_parent_id_idx" ON "pages_blocks_home_hero_floating_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_hero_order_idx" ON "pages_blocks_home_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_hero_parent_id_idx" ON "pages_blocks_home_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_hero_path_idx" ON "pages_blocks_home_hero" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_home_hero_locales_locale_parent_id_unique" ON "pages_blocks_home_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_home_hero_locales_parent_id_idx" ON "pages_blocks_home_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_hero_stats_order_idx" ON "pages_blocks_service_hero_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_hero_stats_parent_id_idx" ON "pages_blocks_service_hero_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_service_hero_stats_locales_locale_parent_id_uni" ON "pages_blocks_service_hero_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_service_hero_stats_locales_parent_id_idx" ON "pages_blocks_service_hero_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_hero_order_idx" ON "pages_blocks_service_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_hero_parent_id_idx" ON "pages_blocks_service_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_hero_path_idx" ON "pages_blocks_service_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_service_hero_image_idx" ON "pages_blocks_service_hero" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_service_hero_locales_locale_parent_id_unique" ON "pages_blocks_service_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_service_hero_locales_parent_id_idx" ON "pages_blocks_service_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_dental_hero_features_order_idx" ON "pages_blocks_dental_hero_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_dental_hero_features_parent_id_idx" ON "pages_blocks_dental_hero_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_dental_hero_features_locales_locale_parent_id_u" ON "pages_blocks_dental_hero_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_dental_hero_features_locales_parent_id_idx" ON "pages_blocks_dental_hero_features_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_dental_hero_stats_order_idx" ON "pages_blocks_dental_hero_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_dental_hero_stats_parent_id_idx" ON "pages_blocks_dental_hero_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_dental_hero_stats_locales_locale_parent_id_uniq" ON "pages_blocks_dental_hero_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_dental_hero_stats_locales_parent_id_idx" ON "pages_blocks_dental_hero_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_dental_hero_order_idx" ON "pages_blocks_dental_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_dental_hero_parent_id_idx" ON "pages_blocks_dental_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_dental_hero_path_idx" ON "pages_blocks_dental_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_dental_hero_image_idx" ON "pages_blocks_dental_hero" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_dental_hero_locales_locale_parent_id_unique" ON "pages_blocks_dental_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_dental_hero_locales_parent_id_idx" ON "pages_blocks_dental_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_icon_cards_items_order_idx" ON "pages_blocks_icon_cards_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_icon_cards_items_parent_id_idx" ON "pages_blocks_icon_cards_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_icon_cards_items_locales_locale_parent_id_uniqu" ON "pages_blocks_icon_cards_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_icon_cards_items_locales_parent_id_idx" ON "pages_blocks_icon_cards_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_icon_cards_order_idx" ON "pages_blocks_icon_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_icon_cards_parent_id_idx" ON "pages_blocks_icon_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_icon_cards_path_idx" ON "pages_blocks_icon_cards" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_icon_cards_locales_locale_parent_id_unique" ON "pages_blocks_icon_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_icon_cards_locales_parent_id_idx" ON "pages_blocks_icon_cards_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_grid_order_idx" ON "pages_blocks_services_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_grid_parent_id_idx" ON "pages_blocks_services_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_grid_path_idx" ON "pages_blocks_services_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_services_grid_locales_locale_parent_id_unique" ON "pages_blocks_services_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_services_grid_locales_parent_id_idx" ON "pages_blocks_services_grid_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_features_order_idx" ON "pages_blocks_about_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_features_parent_id_idx" ON "pages_blocks_about_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_about_features_locales_locale_parent_id_unique" ON "pages_blocks_about_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_about_features_locales_parent_id_idx" ON "pages_blocks_about_features_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_order_idx" ON "pages_blocks_about" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_parent_id_idx" ON "pages_blocks_about" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_path_idx" ON "pages_blocks_about" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_image_idx" ON "pages_blocks_about" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_about_locales_locale_parent_id_unique" ON "pages_blocks_about_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_about_locales_parent_id_idx" ON "pages_blocks_about_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_audience_items_order_idx" ON "pages_blocks_audience_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_audience_items_parent_id_idx" ON "pages_blocks_audience_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_audience_items_locales_locale_parent_id_unique" ON "pages_blocks_audience_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_audience_items_locales_parent_id_idx" ON "pages_blocks_audience_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_audience_order_idx" ON "pages_blocks_audience" USING btree ("_order");
  CREATE INDEX "pages_blocks_audience_parent_id_idx" ON "pages_blocks_audience" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_audience_path_idx" ON "pages_blocks_audience" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_audience_locales_locale_parent_id_unique" ON "pages_blocks_audience_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_audience_locales_parent_id_idx" ON "pages_blocks_audience_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_steps_order_idx" ON "pages_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_steps_parent_id_idx" ON "pages_blocks_process_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_process_steps_locales_locale_parent_id_unique" ON "pages_blocks_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_process_steps_locales_parent_id_idx" ON "pages_blocks_process_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_extra_items_order_idx" ON "pages_blocks_process_extra_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_extra_items_parent_id_idx" ON "pages_blocks_process_extra_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_process_extra_items_locales_locale_parent_id_un" ON "pages_blocks_process_extra_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_process_extra_items_locales_parent_id_idx" ON "pages_blocks_process_extra_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_order_idx" ON "pages_blocks_process" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_parent_id_idx" ON "pages_blocks_process" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_path_idx" ON "pages_blocks_process" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_process_locales_locale_parent_id_unique" ON "pages_blocks_process_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_process_locales_parent_id_idx" ON "pages_blocks_process_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_order_idx" ON "pages_blocks_team" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_parent_id_idx" ON "pages_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_path_idx" ON "pages_blocks_team" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_team_locales_locale_parent_id_unique" ON "pages_blocks_team_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_team_locales_parent_id_idx" ON "pages_blocks_team_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_cta_locales_locale_parent_id_unique" ON "pages_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cta_locales_parent_id_idx" ON "pages_blocks_cta_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_order_idx" ON "pages_blocks_contact" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_parent_id_idx" ON "pages_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_path_idx" ON "pages_blocks_contact" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_contact_locales_locale_parent_id_unique" ON "pages_blocks_contact_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_contact_locales_parent_id_idx" ON "pages_blocks_contact_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_trust_bar_items_order_idx" ON "pages_blocks_trust_bar_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_trust_bar_items_parent_id_idx" ON "pages_blocks_trust_bar_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_trust_bar_items_locales_locale_parent_id_unique" ON "pages_blocks_trust_bar_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_trust_bar_items_locales_parent_id_idx" ON "pages_blocks_trust_bar_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_trust_bar_order_idx" ON "pages_blocks_trust_bar" USING btree ("_order");
  CREATE INDEX "pages_blocks_trust_bar_parent_id_idx" ON "pages_blocks_trust_bar" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_trust_bar_path_idx" ON "pages_blocks_trust_bar" USING btree ("_path");
  CREATE INDEX "pages_blocks_treatment_list_order_idx" ON "pages_blocks_treatment_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_treatment_list_parent_id_idx" ON "pages_blocks_treatment_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_treatment_list_path_idx" ON "pages_blocks_treatment_list" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_treatment_list_locales_locale_parent_id_unique" ON "pages_blocks_treatment_list_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_treatment_list_locales_parent_id_idx" ON "pages_blocks_treatment_list_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_procedure_cards_rows_order_idx" ON "pages_blocks_procedure_cards_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_procedure_cards_rows_parent_id_idx" ON "pages_blocks_procedure_cards_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_procedure_cards_rows_locales_locale_parent_id_u" ON "pages_blocks_procedure_cards_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_procedure_cards_rows_locales_parent_id_idx" ON "pages_blocks_procedure_cards_rows_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_procedure_cards_order_idx" ON "pages_blocks_procedure_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_procedure_cards_parent_id_idx" ON "pages_blocks_procedure_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_procedure_cards_path_idx" ON "pages_blocks_procedure_cards" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_procedure_cards_locales_locale_parent_id_unique" ON "pages_blocks_procedure_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_procedure_cards_locales_parent_id_idx" ON "pages_blocks_procedure_cards_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_table_rows_order_idx" ON "pages_blocks_pricing_table_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_table_rows_parent_id_idx" ON "pages_blocks_pricing_table_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_pricing_table_rows_locales_locale_parent_id_uni" ON "pages_blocks_pricing_table_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_pricing_table_rows_locales_parent_id_idx" ON "pages_blocks_pricing_table_rows_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_table_order_idx" ON "pages_blocks_pricing_table" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_table_parent_id_idx" ON "pages_blocks_pricing_table" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_table_path_idx" ON "pages_blocks_pricing_table" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_pricing_table_locales_locale_parent_id_unique" ON "pages_blocks_pricing_table_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_pricing_table_locales_parent_id_idx" ON "pages_blocks_pricing_table_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_clinic_order_idx" ON "pages_blocks_clinic" USING btree ("_order");
  CREATE INDEX "pages_blocks_clinic_parent_id_idx" ON "pages_blocks_clinic" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_clinic_path_idx" ON "pages_blocks_clinic" USING btree ("_path");
  CREATE INDEX "pages_blocks_clinic_clinic_idx" ON "pages_blocks_clinic" USING btree ("clinic_id");
  CREATE UNIQUE INDEX "pages_blocks_clinic_locales_locale_parent_id_unique" ON "pages_blocks_clinic_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_clinic_locales_parent_id_idx" ON "pages_blocks_clinic_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_package_items_order_idx" ON "pages_blocks_package_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_package_items_parent_id_idx" ON "pages_blocks_package_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_package_items_locales_locale_parent_id_unique" ON "pages_blocks_package_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_package_items_locales_parent_id_idx" ON "pages_blocks_package_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_package_order_idx" ON "pages_blocks_package" USING btree ("_order");
  CREATE INDEX "pages_blocks_package_parent_id_idx" ON "pages_blocks_package" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_package_path_idx" ON "pages_blocks_package" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_package_locales_locale_parent_id_unique" ON "pages_blocks_package_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_package_locales_parent_id_idx" ON "pages_blocks_package_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_slider_order_idx" ON "pages_blocks_video_slider" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_slider_parent_id_idx" ON "pages_blocks_video_slider" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_slider_path_idx" ON "pages_blocks_video_slider" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_video_slider_locales_locale_parent_id_unique" ON "pages_blocks_video_slider_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_video_slider_locales_parent_id_idx" ON "pages_blocks_video_slider_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_benefits_items_order_idx" ON "pages_blocks_benefits_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_benefits_items_parent_id_idx" ON "pages_blocks_benefits_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_benefits_items_locales_locale_parent_id_unique" ON "pages_blocks_benefits_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_benefits_items_locales_parent_id_idx" ON "pages_blocks_benefits_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_benefits_order_idx" ON "pages_blocks_benefits" USING btree ("_order");
  CREATE INDEX "pages_blocks_benefits_parent_id_idx" ON "pages_blocks_benefits" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_benefits_path_idx" ON "pages_blocks_benefits" USING btree ("_path");
  CREATE INDEX "pages_blocks_benefits_image_idx" ON "pages_blocks_benefits" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_benefits_locales_locale_parent_id_unique" ON "pages_blocks_benefits_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_benefits_locales_parent_id_idx" ON "pages_blocks_benefits_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_results_stats_order_idx" ON "pages_blocks_results_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_results_stats_parent_id_idx" ON "pages_blocks_results_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_results_stats_locales_locale_parent_id_unique" ON "pages_blocks_results_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_results_stats_locales_parent_id_idx" ON "pages_blocks_results_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_results_order_idx" ON "pages_blocks_results" USING btree ("_order");
  CREATE INDEX "pages_blocks_results_parent_id_idx" ON "pages_blocks_results" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_results_path_idx" ON "pages_blocks_results" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_results_locales_locale_parent_id_unique" ON "pages_blocks_results_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_results_locales_parent_id_idx" ON "pages_blocks_results_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_locales_parent_id_idx" ON "pages_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_services_id_idx" ON "pages_rels" USING btree ("services_id");
  CREATE INDEX "pages_rels_team_members_id_idx" ON "pages_rels" USING btree ("team_members_id");
  CREATE INDEX "pages_rels_treatments_id_idx" ON "pages_rels" USING btree ("treatments_id");
  CREATE INDEX "pages_rels_videos_id_idx" ON "pages_rels" USING btree ("videos_id");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE UNIQUE INDEX "services_locales_locale_parent_id_unique" ON "services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_locales_parent_id_idx" ON "services_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "treatments_key_idx" ON "treatments" USING btree ("key");
  CREATE INDEX "treatments_service_idx" ON "treatments" USING btree ("service_id");
  CREATE INDEX "treatments_image_idx" ON "treatments" USING btree ("image_id");
  CREATE INDEX "treatments_updated_at_idx" ON "treatments" USING btree ("updated_at");
  CREATE INDEX "treatments_created_at_idx" ON "treatments" USING btree ("created_at");
  CREATE UNIQUE INDEX "treatments_locales_locale_parent_id_unique" ON "treatments_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "treatments_locales_parent_id_idx" ON "treatments_locales" USING btree ("_parent_id");
  CREATE INDEX "clinics_features_order_idx" ON "clinics_features" USING btree ("_order");
  CREATE INDEX "clinics_features_parent_id_idx" ON "clinics_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "clinics_features_locales_locale_parent_id_unique" ON "clinics_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "clinics_features_locales_parent_id_idx" ON "clinics_features_locales" USING btree ("_parent_id");
  CREATE INDEX "clinics_gallery_order_idx" ON "clinics_gallery" USING btree ("_order");
  CREATE INDEX "clinics_gallery_parent_id_idx" ON "clinics_gallery" USING btree ("_parent_id");
  CREATE INDEX "clinics_gallery_image_idx" ON "clinics_gallery" USING btree ("image_id");
  CREATE UNIQUE INDEX "clinics_slug_idx" ON "clinics" USING btree ("slug");
  CREATE INDEX "clinics_doctor_doctor_photo_idx" ON "clinics" USING btree ("doctor_photo_id");
  CREATE INDEX "clinics_team_photo_idx" ON "clinics" USING btree ("team_photo_id");
  CREATE INDEX "clinics_updated_at_idx" ON "clinics" USING btree ("updated_at");
  CREATE INDEX "clinics_created_at_idx" ON "clinics" USING btree ("created_at");
  CREATE UNIQUE INDEX "clinics_locales_locale_parent_id_unique" ON "clinics_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "clinics_locales_parent_id_idx" ON "clinics_locales" USING btree ("_parent_id");
  CREATE INDEX "team_members_languages_order_idx" ON "team_members_languages" USING btree ("order");
  CREATE INDEX "team_members_languages_parent_idx" ON "team_members_languages" USING btree ("parent_id");
  CREATE UNIQUE INDEX "team_members_key_idx" ON "team_members" USING btree ("key");
  CREATE INDEX "team_members_photo_idx" ON "team_members" USING btree ("photo_id");
  CREATE INDEX "team_members_updated_at_idx" ON "team_members" USING btree ("updated_at");
  CREATE INDEX "team_members_created_at_idx" ON "team_members" USING btree ("created_at");
  CREATE UNIQUE INDEX "team_members_locales_locale_parent_id_unique" ON "team_members_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "team_members_locales_parent_id_idx" ON "team_members_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "videos_url_idx" ON "videos" USING btree ("url");
  CREATE INDEX "videos_file_idx" ON "videos" USING btree ("file_id");
  CREATE INDEX "videos_poster_idx" ON "videos" USING btree ("poster_id");
  CREATE INDEX "videos_updated_at_idx" ON "videos" USING btree ("updated_at");
  CREATE INDEX "videos_created_at_idx" ON "videos" USING btree ("created_at");
  CREATE INDEX "media_seed_key_idx" ON "media" USING btree ("seed_key");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_locales_parent_id_idx" ON "media_locales" USING btree ("_parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_treatments_id_idx" ON "payload_locked_documents_rels" USING btree ("treatments_id");
  CREATE INDEX "payload_locked_documents_rels_clinics_id_idx" ON "payload_locked_documents_rels" USING btree ("clinics_id");
  CREATE INDEX "payload_locked_documents_rels_team_members_id_idx" ON "payload_locked_documents_rels" USING btree ("team_members_id");
  CREATE INDEX "payload_locked_documents_rels_videos_id_idx" ON "payload_locked_documents_rels" USING btree ("videos_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_social_order_idx" ON "site_settings_social" USING btree ("_order");
  CREATE INDEX "site_settings_social_parent_id_idx" ON "site_settings_social" USING btree ("_parent_id");
  CREATE INDEX "site_settings_nav_links_order_idx" ON "site_settings_nav_links" USING btree ("_order");
  CREATE INDEX "site_settings_nav_links_parent_id_idx" ON "site_settings_nav_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_nav_links_locales_locale_parent_id_unique" ON "site_settings_nav_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_nav_links_locales_parent_id_idx" ON "site_settings_nav_links_locales" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_company_links_order_idx" ON "site_settings_footer_company_links" USING btree ("_order");
  CREATE INDEX "site_settings_footer_company_links_parent_id_idx" ON "site_settings_footer_company_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_footer_company_links_locales_locale_parent_id_" ON "site_settings_footer_company_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_footer_company_links_locales_parent_id_idx" ON "site_settings_footer_company_links_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_locales_parent_id_idx" ON "site_settings_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "legal_locales_locale_parent_id_unique" ON "legal_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "legal_locales_parent_id_idx" ON "legal_locales" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_home_hero_stats" CASCADE;
  DROP TABLE "pages_blocks_home_hero_stats_locales" CASCADE;
  DROP TABLE "pages_blocks_home_hero_floating" CASCADE;
  DROP TABLE "pages_blocks_home_hero_floating_locales" CASCADE;
  DROP TABLE "pages_blocks_home_hero" CASCADE;
  DROP TABLE "pages_blocks_home_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_service_hero_stats" CASCADE;
  DROP TABLE "pages_blocks_service_hero_stats_locales" CASCADE;
  DROP TABLE "pages_blocks_service_hero" CASCADE;
  DROP TABLE "pages_blocks_service_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_dental_hero_features" CASCADE;
  DROP TABLE "pages_blocks_dental_hero_features_locales" CASCADE;
  DROP TABLE "pages_blocks_dental_hero_stats" CASCADE;
  DROP TABLE "pages_blocks_dental_hero_stats_locales" CASCADE;
  DROP TABLE "pages_blocks_dental_hero" CASCADE;
  DROP TABLE "pages_blocks_dental_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_icon_cards_items" CASCADE;
  DROP TABLE "pages_blocks_icon_cards_items_locales" CASCADE;
  DROP TABLE "pages_blocks_icon_cards" CASCADE;
  DROP TABLE "pages_blocks_icon_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_services_grid" CASCADE;
  DROP TABLE "pages_blocks_services_grid_locales" CASCADE;
  DROP TABLE "pages_blocks_about_features" CASCADE;
  DROP TABLE "pages_blocks_about_features_locales" CASCADE;
  DROP TABLE "pages_blocks_about" CASCADE;
  DROP TABLE "pages_blocks_about_locales" CASCADE;
  DROP TABLE "pages_blocks_audience_items" CASCADE;
  DROP TABLE "pages_blocks_audience_items_locales" CASCADE;
  DROP TABLE "pages_blocks_audience" CASCADE;
  DROP TABLE "pages_blocks_audience_locales" CASCADE;
  DROP TABLE "pages_blocks_process_steps" CASCADE;
  DROP TABLE "pages_blocks_process_steps_locales" CASCADE;
  DROP TABLE "pages_blocks_process_extra_items" CASCADE;
  DROP TABLE "pages_blocks_process_extra_items_locales" CASCADE;
  DROP TABLE "pages_blocks_process" CASCADE;
  DROP TABLE "pages_blocks_process_locales" CASCADE;
  DROP TABLE "pages_blocks_team" CASCADE;
  DROP TABLE "pages_blocks_team_locales" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_cta_locales" CASCADE;
  DROP TABLE "pages_blocks_contact" CASCADE;
  DROP TABLE "pages_blocks_contact_locales" CASCADE;
  DROP TABLE "pages_blocks_trust_bar_items" CASCADE;
  DROP TABLE "pages_blocks_trust_bar_items_locales" CASCADE;
  DROP TABLE "pages_blocks_trust_bar" CASCADE;
  DROP TABLE "pages_blocks_treatment_list" CASCADE;
  DROP TABLE "pages_blocks_treatment_list_locales" CASCADE;
  DROP TABLE "pages_blocks_procedure_cards_rows" CASCADE;
  DROP TABLE "pages_blocks_procedure_cards_rows_locales" CASCADE;
  DROP TABLE "pages_blocks_procedure_cards" CASCADE;
  DROP TABLE "pages_blocks_procedure_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_pricing_table_rows" CASCADE;
  DROP TABLE "pages_blocks_pricing_table_rows_locales" CASCADE;
  DROP TABLE "pages_blocks_pricing_table" CASCADE;
  DROP TABLE "pages_blocks_pricing_table_locales" CASCADE;
  DROP TABLE "pages_blocks_clinic" CASCADE;
  DROP TABLE "pages_blocks_clinic_locales" CASCADE;
  DROP TABLE "pages_blocks_package_items" CASCADE;
  DROP TABLE "pages_blocks_package_items_locales" CASCADE;
  DROP TABLE "pages_blocks_package" CASCADE;
  DROP TABLE "pages_blocks_package_locales" CASCADE;
  DROP TABLE "pages_blocks_video_slider" CASCADE;
  DROP TABLE "pages_blocks_video_slider_locales" CASCADE;
  DROP TABLE "pages_blocks_benefits_items" CASCADE;
  DROP TABLE "pages_blocks_benefits_items_locales" CASCADE;
  DROP TABLE "pages_blocks_benefits" CASCADE;
  DROP TABLE "pages_blocks_benefits_locales" CASCADE;
  DROP TABLE "pages_blocks_results_stats" CASCADE;
  DROP TABLE "pages_blocks_results_stats_locales" CASCADE;
  DROP TABLE "pages_blocks_results" CASCADE;
  DROP TABLE "pages_blocks_results_locales" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_locales" CASCADE;
  DROP TABLE "treatments" CASCADE;
  DROP TABLE "treatments_locales" CASCADE;
  DROP TABLE "clinics_features" CASCADE;
  DROP TABLE "clinics_features_locales" CASCADE;
  DROP TABLE "clinics_gallery" CASCADE;
  DROP TABLE "clinics" CASCADE;
  DROP TABLE "clinics_locales" CASCADE;
  DROP TABLE "team_members_languages" CASCADE;
  DROP TABLE "team_members" CASCADE;
  DROP TABLE "team_members_locales" CASCADE;
  DROP TABLE "videos" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_social" CASCADE;
  DROP TABLE "site_settings_nav_links" CASCADE;
  DROP TABLE "site_settings_nav_links_locales" CASCADE;
  DROP TABLE "site_settings_footer_company_links" CASCADE;
  DROP TABLE "site_settings_footer_company_links_locales" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "legal" CASCADE;
  DROP TABLE "legal_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_pages_blocks_home_hero_floating_icon";
  DROP TYPE "public"."enum_pages_blocks_service_hero_badge_icon";
  DROP TYPE "public"."enum_pages_blocks_dental_hero_badge_icon";
  DROP TYPE "public"."enum_pages_blocks_icon_cards_items_icon";
  DROP TYPE "public"."enum_pages_blocks_icon_cards_background";
  DROP TYPE "public"."enum_pages_blocks_services_grid_background";
  DROP TYPE "public"."enum_pages_blocks_process_extra_items_icon";
  DROP TYPE "public"."enum_pages_blocks_process_background";
  DROP TYPE "public"."enum_pages_blocks_process_extra_style";
  DROP TYPE "public"."enum_pages_blocks_team_background";
  DROP TYPE "public"."enum_pages_blocks_contact_variant";
  DROP TYPE "public"."enum_pages_blocks_trust_bar_items_icon";
  DROP TYPE "public"."enum_pages_blocks_procedure_cards_rows_field";
  DROP TYPE "public"."enum_pages_blocks_procedure_cards_background";
  DROP TYPE "public"."enum_pages_blocks_pricing_table_rows_icon";
  DROP TYPE "public"."enum_pages_blocks_pricing_table_background";
  DROP TYPE "public"."enum_pages_blocks_package_items_icon";
  DROP TYPE "public"."enum_pages_blocks_video_slider_thumbnails";
  DROP TYPE "public"."enum_pages_blocks_results_stats_icon";
  DROP TYPE "public"."enum_pages_blocks_results_columns";
  DROP TYPE "public"."enum_pages_blocks_results_cta_icon";
  DROP TYPE "public"."enum_services_icon";
  DROP TYPE "public"."enum_treatments_icon";
  DROP TYPE "public"."enum_clinics_features_icon";
  DROP TYPE "public"."enum_team_members_languages";
  DROP TYPE "public"."enum_users_role";`)
}
