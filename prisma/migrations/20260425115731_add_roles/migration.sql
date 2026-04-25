-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('SUPER_ADMIN', 'CLIENT');

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "company" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "role" "AdminRole" NOT NULL DEFAULT 'CLIENT';
