ALTER TABLE `products` MODIFY COLUMN `usage` text;--> statement-breakpoint
ALTER TABLE `products` MODIFY COLUMN `taste` text;--> statement-breakpoint
ALTER TABLE `products` ADD CONSTRAINT `products_productId_scrapedAt_unique` UNIQUE(`productId`,`scrapedAt`);