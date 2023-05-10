/*
  Warnings:

  - The values [UnPaid] on the enum `PaymentStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PaymentStatus_new" AS ENUM ('Unpaid', 'Waiting', 'Paid');
ALTER TABLE "Scope" ALTER COLUMN "payment" TYPE "PaymentStatus_new" USING ("payment"::text::"PaymentStatus_new");
ALTER TYPE "PaymentStatus" RENAME TO "PaymentStatus_old";
ALTER TYPE "PaymentStatus_new" RENAME TO "PaymentStatus";
DROP TYPE "PaymentStatus_old";
COMMIT;
