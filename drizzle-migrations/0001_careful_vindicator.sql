CREATE TABLE "saving_goals" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"wallet_id" varchar(255) NOT NULL,
	"name" text NOT NULL,
	"target_amount" numeric(2) NOT NULL,
	"current_amount" numeric(2) NOT NULL,
	"target_date" date NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "saving_goals_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"wallet_id" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"amount" numeric(2) NOT NULL,
	"decription" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "transactions_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "wallets" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"balance" numeric(4) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "wallets_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "saving_goals" ADD CONSTRAINT "saving_goals_wallet_id_wallets_id_fk" FOREIGN KEY ("wallet_id") REFERENCES "public"."wallets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_wallet_id_wallets_id_fk" FOREIGN KEY ("wallet_id") REFERENCES "public"."wallets"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;