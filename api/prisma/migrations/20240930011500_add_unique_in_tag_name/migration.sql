/*
  Warnings:

  - A unique constraint covering the columns `[nm_tag]` on the table `tag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tag_nm_tag_key" ON "tag"("nm_tag");
