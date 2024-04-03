/*
  Warnings:

  - Added the required column `nickname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `createdAt` DATETIME NOT NULL DEFAULT NOW(),
    ADD COLUMN `nickname` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();
