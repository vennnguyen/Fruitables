-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_userId_fkey`;

-- DropIndex
DROP INDEX `orders_userId_key` ON `orders`;

-- AddForeignKey
ALTER TABLE `cart_detail`
ADD FOREIGN KEY (`cartId`) REFERENCES `carts`(`id`)
ON DELETE SET NULL
ON UPDATE CASCADE;
