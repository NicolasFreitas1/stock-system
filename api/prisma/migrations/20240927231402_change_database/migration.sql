/*
  Warnings:

  - You are about to drop the column `id_supplier` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `id_client` on the `sale` table. All the data in the column will be lost.
  - You are about to drop the column `tp_user` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `vl_address` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `vl_email` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `vl_phone` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `supplier` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[nm_login]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nm_login` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_id_category_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_id_supplier_fkey";

-- DropForeignKey
ALTER TABLE "sale" DROP CONSTRAINT "sale_id_client_fkey";

-- DropIndex
DROP INDEX "user_vl_email_key";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "id_supplier";

-- AlterTable
ALTER TABLE "sale" DROP COLUMN "id_client";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "tp_user",
DROP COLUMN "vl_address",
DROP COLUMN "vl_email",
DROP COLUMN "vl_phone",
ADD COLUMN     "nm_login" VARCHAR(150) NOT NULL;

-- DropTable
DROP TABLE "category";

-- DropTable
DROP TABLE "supplier";

-- DropEnum
DROP TYPE "UserType";

-- CreateTable
CREATE TABLE "tag" (
    "id_category" UUID NOT NULL,
    "nm_tag" VARCHAR(150) NOT NULL,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id_category")
);

-- CreateTable
CREATE TABLE "product_tag" (
    "id_product_tag" UUID NOT NULL,
    "id_product" UUID NOT NULL,
    "id_category" UUID NOT NULL,

    CONSTRAINT "product_tag_pkey" PRIMARY KEY ("id_product_tag")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_nm_login_key" ON "user"("nm_login");

-- AddForeignKey
ALTER TABLE "product_tag" ADD CONSTRAINT "product_tag_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "tag"("id_category") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_tag" ADD CONSTRAINT "product_tag_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "product"("id_product") ON DELETE RESTRICT ON UPDATE CASCADE;
