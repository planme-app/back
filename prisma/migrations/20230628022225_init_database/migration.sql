-- CreateTable
CREATE TABLE `user` (
    `user_id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwd` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `routine` (
    `routine_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `type` ENUM('time', 'count', 'bool') NOT NULL,
    `is_repeat` BOOLEAN NOT NULL,
    `days_of_week_binary` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`routine_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `routine_instance` (
    `routine_instance_id` VARCHAR(191) NOT NULL,
    `routine_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`routine_instance_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `count_routine_instance` (
    `count_routine_instance_id` VARCHAR(191) NOT NULL,
    `routine_instance_id` VARCHAR(191) NOT NULL,
    `goal` INTEGER NOT NULL,
    `progress` INTEGER NOT NULL,

    PRIMARY KEY (`count_routine_instance_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `time_routine_instance` (
    `time_routine_instance_id` VARCHAR(191) NOT NULL,
    `routine_instance_id` VARCHAR(191) NOT NULL,
    `goal` INTEGER NOT NULL,
    `progress` INTEGER NOT NULL,

    PRIMARY KEY (`time_routine_instance_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bool_routine_instance` (
    `bool_routine_instance_id` VARCHAR(191) NOT NULL,
    `routine_instance_id` VARCHAR(191) NOT NULL,
    `goal` BOOLEAN NOT NULL,
    `progress` BOOLEAN NOT NULL,

    PRIMARY KEY (`bool_routine_instance_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `routine_template` (
    `routine_template_id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `section` VARCHAR(191) NOT NULL,
    `logo_url` VARCHAR(191) NOT NULL,
    `type` ENUM('time', 'count', 'bool') NOT NULL,

    PRIMARY KEY (`routine_template_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `routine` ADD CONSTRAINT `routine_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `routine_instance` ADD CONSTRAINT `routine_instance_routine_id_fkey` FOREIGN KEY (`routine_id`) REFERENCES `routine`(`routine_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `count_routine_instance` ADD CONSTRAINT `count_routine_instance_routine_instance_id_fkey` FOREIGN KEY (`routine_instance_id`) REFERENCES `routine_instance`(`routine_instance_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `time_routine_instance` ADD CONSTRAINT `time_routine_instance_routine_instance_id_fkey` FOREIGN KEY (`routine_instance_id`) REFERENCES `routine_instance`(`routine_instance_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bool_routine_instance` ADD CONSTRAINT `bool_routine_instance_routine_instance_id_fkey` FOREIGN KEY (`routine_instance_id`) REFERENCES `routine_instance`(`routine_instance_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
