import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export class CursosController {
  async criarCursos(request: Request, response: Response) {
    try {
      const result = await prisma.curso.createMany({
        data: [
          { nome_curso: request.body.nome_curso, duracao_curso: request.body.duracao_curso },
        ],
        skipDuplicates: true,
      });

      response.status(201).json({ message: "Curso criado com sucesso!" });
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: "Erro ao criar curso." });
    } finally {
      await prisma.$disconnect();
    }
  }

async modificarCursos(request: Request, response: Response) {
  try {
    const res = await prisma.curso.updateMany({
      where: {
        id_curso: request.body.id_curso
      },
      data: {
        id_curso: request.body.id_curso,
        nome_curso: request.body.nome_curso,
        duracao_curso: request.body.duracao_curso,
      }
    });

    if (res.count > 0) {
      console.log(`${res.count} Curso modificado com sucesso!`);
      response.status(200).json({ message: "Curso modificado com sucesso!" });
    } else {
      console.log(`Nenhum curso foi encontrado para ser modificado.`);
      response.status(404).json({ message: "Curso não encontrado." });
    }

  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Erro ao modificar o curso." });
  } finally {
    await prisma.$disconnect();
  }
}

async excluirCursos(request: Request, response: Response) {
  try {
    const res = await prisma.curso.deleteMany({
      where: {
        id_curso: request.body.id_curso,
      },
    });

    if (res.count > 0) {
      console.log(`${res.count} Curso excluído com sucesso!`);
      response.status(200).json({ message: "Curso excluído com sucesso!" });
    } else {
      console.log(`Nenhum curso foi encontrado para ser excluído.`);
      response.status(404).json({ message: "Curso não encontrado." });
    }

  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Erro ao excluir o curso." });
  } finally {
    await prisma.$disconnect();
  }
}

async listarCursos(request: Request, response: Response) {
  try {
    const res = await prisma.curso.findMany({
      where: {
        id_curso: request.body.id_curso,
        nome_curso: request.body.nome_curso,
        duracao_curso: request.body.duracao_curso
      },
    });

    if (res.length > 0) {
      console.log(res);
      response.status(200).json({ Cursos: res }); 
    } else {
      console.log("Nenhum curso encontrado.");
      response.status(404).json({ message: "Nenhum curso encontrado." });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Erro ao listar cursos." });
  } finally {
    await prisma.$disconnect();
  }
}





}
