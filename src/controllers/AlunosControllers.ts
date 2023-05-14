import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient()

export class AlunosController {
  async criarAlunos(request: Request, response: Response) {
    try {
      const result = await prisma.aluno.createMany({
        data: [
          { cpf_aluno: request.body.cpf_aluno, turma_id: request.body.turma_id, curso_id: request.body.curso_id },
        ],
        skipDuplicates: false,
      });

      response.status(201).json({ message: "Aluno criado com sucesso!" });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        response.status(400).json({ message: "O aluno já está cadastrado." });
      } else {
        console.log(error);
        response.status(500).json({ message: "Erro ao criar alunos." });
      }
    } finally {
      await prisma.$disconnect();
    }
  }

  async modificarAlunos(request: Request, response: Response) {
    try {
      const res = await prisma.aluno.updateMany({
        where: {
          id_aluno: request.body.id_aluno
        },
        data: {
          cpf_aluno: request.body.cpf_aluno,
          turma_id: request.body.id_turma,
          curso_id: request.body.id_curso,
        }
      });
  
      if (res.count > 0) {
        console.log(`${res.count} Aluno modificado com sucesso!`);
        response.status(200).json({ message: "Aluno modificado com sucesso!" });
      } else {
        console.log(`Nenhum aluno foi encontrado para ser modificado.`);
        response.status(404).json({ message: "Aluno não encontrado." });
      }
  
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: "Erro ao modificar o aluno." });
    } finally {
      await prisma.$disconnect();
    }
  }

  async excluirAlunos(request: Request, response: Response) {
    try {
      const res = await prisma.aluno.deleteMany({
        where: {
          id_aluno: request.body.id_aluno,
        },
      });
  
      if (res.count > 0) {
        console.log(`${res.count} Aluno excluído com sucesso!`);
        response.status(200).json({ message: "Aluno excluído com sucesso!" });
      } else {
        console.log(`Nenhum aluno foi encontrado para ser excluído.`);
        response.status(404).json({ message: "Aluno não encontrado." });
      }
  
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: "Erro ao excluir o aluno." });
    } finally {
      await prisma.$disconnect();
    }
  }

  async listarAlunos(request: Request, response: Response) {
    try {
      const res = await prisma.aluno.findMany({
        where: {
          id_aluno: request.body.id_aluno,
          cpf_aluno: request.body.cpf_aluno,
          turma_id: request.body.id_turma,
          curso_id: request.body.id_curso
        },
      });
  
      if (res.length > 0) {
        console.log(res);
        response.status(200).json({ Alunos: res }); 
      } else {
        console.log("Nenhum aluno encontrado.");
        response.status(404).json({ message: "Nenhum curso encontrado." });
      }
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: "Erro ao listar alunos." });
    } finally {
      await prisma.$disconnect();
    }
  }
}
