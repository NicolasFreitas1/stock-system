/*
  Warnings:

  - Added the required column `vl_quantity` to the `sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sale" ADD COLUMN     "vl_quantity" INTEGER NOT NULL;
