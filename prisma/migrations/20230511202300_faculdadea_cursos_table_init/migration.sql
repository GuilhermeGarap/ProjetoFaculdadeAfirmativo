-- CreateTable
CREATE TABLE `cursos` (
    `id_curso` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_curso` VARCHAR(255) NOT NULL,
    `duracao_curso` DOUBLE NOT NULL,

    UNIQUE INDEX `cursos_nome_curso_key`(`nome_curso`),
    PRIMARY KEY (`id_curso`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
