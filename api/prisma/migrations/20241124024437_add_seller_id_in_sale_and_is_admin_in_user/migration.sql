/*
  Warnings:

  - You are about to drop the `notification` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_seller` to the `sale` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_id_recipient_fkey";

-- AlterTable
ALTER TABLE "sale" ADD COLUMN     "id_seller" UUID NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "bl_is_admin" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "notification";

-- AddForeignKey
ALTER TABLE "sale" ADD CONSTRAINT "sale_id_seller_fkey" FOREIGN KEY ("id_seller") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
