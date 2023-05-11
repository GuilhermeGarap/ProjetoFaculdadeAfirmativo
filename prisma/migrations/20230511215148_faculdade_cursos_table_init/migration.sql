/*
  Warnings:

  - You are about to drop the `cursos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `cursos`;

-- CreateTable
CREATE TABLE `curso` (
    `id_curso` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_curso` VARCHAR(255) NOT NULL,
    `duracao_curso` DOUBLE NOT NULL,

    UNIQUE INDEX `curso_nome_curso_key`(`nome_curso`),
    PRIMARY KEY (`id_curso`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `turma` (
    `id_turma` INTEGER NOT NULL AUTO_INCREMENT,
    `turno_turma` VARCHAR(255) NOT NULL,
    `perido_turma` VARCHAR(255) NOT NULL,
    `curso_id` INTEGER NOT NULL,

    PRIMARY KEY (`id_turma`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aluno` (
    `id_aluno` INTEGER NOT NULL AUTO_INCREMENT,
    `cpf_aluno` CHAR(14) NOT NULL,
    `turma_id` INTEGER NOT NULL,
    `curso_id` INTEGER NOT NULL,

    PRIMARY KEY (`id_aluno`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chamada` (
    `id_chamada` INTEGER NOT NULL AUTO_INCREMENT,
    `aluno_id` INTEGER NOT NULL,
    `chamada_presenca` BOOLEAN NOT NULL,
    `chamada_data` DATETIME(3) NOT NULL,
    `chamada_justificativa` VARCHAR(300) NOT NULL,

    PRIMARY KEY (`id_chamada`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `turma` ADD CONSTRAINT `turma_curso_id_fkey` FOREIGN KEY (`curso_id`) REFERENCES `curso`(`id_curso`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aluno` ADD CONSTRAINT `aluno_turma_id_fkey` FOREIGN KEY (`turma_id`) REFERENCES `turma`(`id_turma`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aluno` ADD CONSTRAINT `aluno_curso_id_fkey` FOREIGN KEY (`curso_id`) REFERENCES `curso`(`id_curso`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chamada` ADD CONSTRAINT `chamada_aluno_id_fkey` FOREIGN KEY (`aluno_id`) REFERENCES `aluno`(`id_aluno`) ON DELETE RESTRICT ON UPDATE CASCADE;
