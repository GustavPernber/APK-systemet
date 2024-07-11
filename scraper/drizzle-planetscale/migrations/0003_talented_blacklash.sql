CREATE TABLE `metadata` (
	`categories` json,
	`lastScraped` datetime
);
--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `products` ADD `scrapedAt` datetime;