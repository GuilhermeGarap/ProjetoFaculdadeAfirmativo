import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export class TurmasController {
  async criarTurmas(request: Request, response: Response) {
    try {
      const result = await prisma.turma.createMany({
        data: [
          { turno_turma: request.body.turno_turma, curso_id: request.body.curso_id },
        ],
        skipDuplicates: true,
      });

      response.status(201).json({ message: "Turma criada com sucesso!" });
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: "Erro ao criar turma." });
    } finally {
      await prisma.$disconnect();
    }
  }

  async modificarTurmas(request: Request, response: Response) {
    try {
      const res = await prisma.turma.updateMany({
        where: {
          id_turma: request.body.id_turma
        },
        data: {
          id_turma: request.body.id_turma,
          turno_turma: request.body.turno_turma,
          curso_id: request.body.id_curso
        }
      });
  
      if (res.count > 0) {
        console.log(`${res.count} Turma modificada com sucesso!`);
        response.status(200).json({ message: "Turma modificada com sucesso!" });
      } else {
        console.log(`Nenhuma turma foi encontrada para ser modificada.`);
        response.status(404).json({ message: "Turma não encontrada." });
      }
  
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: "Erro ao modificar a turma." });
    } finally {
      await prisma.$disconnect();
    }
  }

  async excluirTurmas(request: Request, response: Response) {
    try {
      const res = await prisma.turma.deleteMany({
        where: {
          id_turma: request.body.id_turma
        },
      });
  
      if (res.count > 0) {
        console.log(`${res.count} Turma excluída com sucesso!`);
        response.status(200).json({ message: "Turma excluída com sucesso!" });
      } else {
        console.log(`Nenhuma turma foi encontrada para ser excluída.`);
        response.status(404).json({ message: "Turma não encontrada." });
      }
  
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: "Erro ao excluir a turma." });
    } finally {
      await prisma.$disconnect();
    }
  }

  async listarTurmas(request: Request, response: Response) {
    try {
      const res = await prisma.turma.findMany({
        where: {
          id_turma: request.body.id_turma,
          turno_turma: request.body.turno_turma,
          curso_id: request.body.id_curso
        },
      });
  
      if (res.length > 0) {
        console.log(res);
        response.status(200).json({ Turmas: res }); 
      } else {
        console.log("Nenhuma turma encontrada.");
        response.status(404).json({ message: "Nenhuma turma encontrada." });
      }
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: "Erro ao listar turmas." });
    } finally {
      await prisma.$disconnect();
    }
  }
}
