/*
  Warnings:

  - Added the required column `tp_payment_method` to the `sale` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'BANK_SLIP', 'CASH', 'PIX', 'OTHER');

-- AlterTable
ALTER TABLE "sale" ADD COLUMN     "tp_payment_method" "PaymentMethod" NOT NULL;
