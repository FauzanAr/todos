-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_todoId_fkey` FOREIGN KEY (`todoId`) REFERENCES `Todos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
