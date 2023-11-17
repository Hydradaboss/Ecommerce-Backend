/*
  Warnings:

  - You are about to drop the column `cartid` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_OrderToProduct` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Wishlist` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userid` on table `Cart` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_userid_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToProduct" DROP CONSTRAINT "_OrderToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToProduct" DROP CONSTRAINT "_OrderToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "userid" SET NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "classification" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "cartid";

-- DropTable
DROP TABLE "_OrderToProduct";

-- CreateTable
CREATE TABLE "_ProductInOrder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductInOrder_AB_unique" ON "_ProductInOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductInOrder_B_index" ON "_ProductInOrder"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_userId_key" ON "Wishlist"("userId");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductInOrder" ADD CONSTRAINT "_ProductInOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductInOrder" ADD CONSTRAINT "_ProductInOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
