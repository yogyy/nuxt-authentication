PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text,
	`avatar` text,
	`provider` text NOT NULL,
	`provider_id` text,
	`created_at` integer DEFAULT (current_timestamp)
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "name", "email", "password", "avatar", "provider", "provider_id", "created_at") SELECT "id", "name", "email", "password", "avatar", "provider", "provider_id", "created_at" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `emailUniqueIndex` ON `users` (`email`,`provider`);