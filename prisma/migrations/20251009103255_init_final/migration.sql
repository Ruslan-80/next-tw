-- AlterTable
ALTER TABLE `category` ADD COLUMN `filters` JSON NOT NULL;

-- AlterTable
ALTER TABLE `product` MODIFY `description` TEXT NULL;
