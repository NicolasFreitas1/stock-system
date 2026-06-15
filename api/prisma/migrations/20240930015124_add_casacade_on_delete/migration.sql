-- DropForeignKey
ALTER TABLE "product_tag" DROP CONSTRAINT "product_tag_id_category_fkey";

-- DropForeignKey
ALTER TABLE "product_tag" DROP CONSTRAINT "product_tag_id_product_fkey";

-- AddForeignKey
ALTER TABLE "product_tag" ADD CONSTRAINT "product_tag_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "tag"("id_category") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_tag" ADD CONSTRAINT "product_tag_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "product"("id_product") ON DELETE CASCADE ON UPDATE CASCADE;
