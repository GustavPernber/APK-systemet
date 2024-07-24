CREATE TABLE `metadata` (
	`categories` text,
	`lastScraped` integer
);
--> statement-breakpoint
CREATE TABLE `products` (
	`dbId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`productId` text,
	`productNumber` text,
	`productNameBold` text,
	`productNameThin` text,
	`category` text,
	`productNumberShort` text,
	`producerName` text,
	`supplierName` text,
	`isKosher` integer,
	`bottleText` text,
	`restrictedParcelQuantity` integer,
	`isOrganic` integer,
	`isSustainableChoice` integer,
	`isClimateSmartPackaging` integer,
	`isEthical` integer,
	`ethicalLabel` text,
	`isWebLaunch` integer,
	`productLaunchDate` integer,
	`isCompletelyOutOfStock` integer,
	`isTemporaryOutOfStock` integer,
	`alcoholPercentage` real,
	`volumeText` text,
	`volume` real,
	`price` real,
	`country` text,
	`originLevel1` text,
	`originLevel2` text,
	`categoryLevel1` text,
	`categoryLevel2` text,
	`categoryLevel3` text,
	`categoryLevel4` text,
	`customCategoryTitle` text,
	`assortmentText` text,
	`usage` text,
	`taste` text,
	`tasteSymbols` text,
	`tasteClockGroupBitter` integer,
	`tasteClockGroupSmokiness` integer,
	`tasteClockBitter` integer,
	`tasteClockFruitacid` integer,
	`tasteClockBody` integer,
	`tasteClockRoughness` integer,
	`tasteClockSweetness` integer,
	`tasteClockSmokiness` integer,
	`tasteClockCasque` integer,
	`assortment` text,
	`recycleFee` real,
	`isManufacturingCountry` integer,
	`isRegionalRestricted` integer,
	`packagingLevel1` text,
	`isNews` integer,
	`images` text,
	`isDiscontinued` integer,
	`isSupplierTemporaryNotAvailable` integer,
	`sugarContent` integer,
	`sugarContentGramPer100ml` real,
	`seal` text,
	`vintage` text,
	`grapes` text,
	`otherSelections` text,
	`tasteClocks` text,
	`color` text,
	`dishPoints` text,
	`apk` real,
	`scrapedAt` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `products_productId_scrapedAt_unique` ON `products` (`productId`,`scrapedAt`);