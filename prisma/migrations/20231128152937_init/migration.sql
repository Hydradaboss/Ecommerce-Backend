/*
  Warnings:

  - You are about to drop the column `classification` on the `Product` table. All the data in the column will be lost.
  - Added the required column `type` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "classification",
ADD COLUMN     "picture" TEXT,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "mobile" SET DATA TYPE BIGINT;
