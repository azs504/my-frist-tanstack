/*
  Warnings:

  - Changed the type of `location` on the `Post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `category` on the `Post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PostCategory" AS ENUM ('BadLandlord', 'MarketInfo', 'RentalTips', 'CommunityReview');

-- CreateEnum
CREATE TYPE "Location" AS ENUM ('Taipei', 'NewTaipei', 'Keelung', 'Taoyuan', 'Hsinchu', 'HsinchuCounty', 'Miaoli', 'Taichung', 'Changhua', 'Nantou', 'Yunlin', 'Chiayi', 'Tainan', 'Kaohsiung', 'Pingtung', 'Yilan', 'Hualien', 'Taitung');

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "location",
ADD COLUMN     "location" "Location" NOT NULL,
DROP COLUMN "category",
ADD COLUMN     "category" "PostCategory" NOT NULL;

-- CreateIndex
CREATE INDEX "Post_category_idx" ON "Post"("category");

-- CreateIndex
CREATE INDEX "Post_location_idx" ON "Post"("location");
