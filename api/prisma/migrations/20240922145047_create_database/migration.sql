-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADMIN', 'CLIENT', 'EMPLOYEE');

-- CreateTable
CREATE TABLE "user" (
    "id_user" UUID NOT NULL,
    "nm_user" VARCHAR(250) NOT NULL,
    "vl_email" VARCHAR(250) NOT NULL,
    "vl_password" VARCHAR(250) NOT NULL,
    "tp_user" "UserType" NOT NULL DEFAULT 'CLIENT',
    "vl_phone" VARCHAR(20) NOT NULL,
    "vl_address" VARCHAR(250) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "notification" (
    "id_notification" UUID NOT NULL,
    "ds_title" VARCHAR(150) NOT NULL,
    "ds_notification" VARCHAR(500) NOT NULL,
    "dt_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_read" TIMESTAMP(3),
    "id_recipient" UUID NOT NULL,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id_notification")
);

-- CreateTable
CREATE TABLE "category" (
    "id_category" UUID NOT NULL,
    "nm_category" VARCHAR(150) NOT NULL,
    "ds_category" VARCHAR(500) NOT NULL,
    "dt_created" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id_category")
);

-- CreateTable
CREATE TABLE "supplier" (
    "id_supplier" UUID NOT NULL,
    "nm_supplier" VARCHAR(150) NOT NULL,
    "nm_contact" VARCHAR(250) NOT NULL,
    "dt_created" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "supplier_pkey" PRIMARY KEY ("id_supplier")
);

-- CreateTable
CREATE TABLE "product" (
    "id_product" UUID NOT NULL,
    "nm_product" VARCHAR(250) NOT NULL,
    "vl_quantity" INTEGER NOT NULL,
    "vl_product" DOUBLE PRECISION NOT NULL,
    "cd_barcode" TEXT NOT NULL,
    "dt_created" TIMESTAMP(3) NOT NULL,
    "id_category" UUID NOT NULL,
    "id_supplier" UUID NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id_product")
);

-- CreateTable
CREATE TABLE "sale" (
    "id_sale" UUID NOT NULL,
    "vl_sale" DOUBLE PRECISION NOT NULL,
    "dt_sold" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_product" UUID NOT NULL,
    "id_client" UUID NOT NULL,

    CONSTRAINT "sale_pkey" PRIMARY KEY ("id_sale")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_vl_email_key" ON "user"("vl_email");

-- CreateIndex
CREATE UNIQUE INDEX "product_cd_barcode_key" ON "product"("cd_barcode");

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_id_recipient_fkey" FOREIGN KEY ("id_recipient") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "category"("id_category") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_id_supplier_fkey" FOREIGN KEY ("id_supplier") REFERENCES "supplier"("id_supplier") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale" ADD CONSTRAINT "sale_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale" ADD CONSTRAINT "sale_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "product"("id_product") ON DELETE RESTRICT ON UPDATE CASCADE;
