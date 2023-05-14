import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient()

export class ChamadasController {
  async criarChamadas(request: Request, response: Response) {
    try {
      const result = await prisma.chamada.createMany({
        data: [
          { aluno_id: request.body.id_aluno, 
            chamada_presenca: request.body.chamada_presenca, 
            chamada_data: request.body.chamada_data, 
            chamada_justificativa: request.body.chamada_justificativa },
        ],
        skipDuplicates: false,
      });

      response.status(201).json({ message: "ID de chamada criado com sucesso!" });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        response.status(400).json({ message: "ID de chamada já está cadastrado." });
      } else {
        console.log(error);
        response.status(500).json({ message: "Erro ao criar ID de chamada." });
      }
    } finally {
      await prisma.$disconnect();
    }
  }

  async modificarChamadas(request: Request, response: Response) {
    try {
      const res = await prisma.chamada.updateMany({
        where: {
          id_chamada: request.body.id_chamada
        },
        data: {
        aluno_id: request.body.id_aluno,
        chamada_presenca: request.body.chamada_presenca,
        chamada_data: request.body.chamada_data,
        chamada_justificativa: request.body.chamada_justificativa

        }
      });
  
      if (res.count > 0) {
        console.log(`${res.count} ID de chamada modificado com sucesso!`);
        response.status(200).json({ message: "ID de chamada modificado com sucesso!" });
      } else {
        console.log(`Nenhum ID de chamada foi encontrado para ser modificado.`);
        response.status(404).json({ message: "ID de chamada não encontrado." });
      }
  
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: "Erro ao modificar o ID de chamada." });
    } finally {
      await prisma.$disconnect();
    }
  }

  async excluirChamadas(request: Request, response: Response) {
    try {
      const res = await prisma.chamada.deleteMany({
        where: {
          id_chamada: request.body.id_chamada
        },
      });
  
      if (res.count > 0) {
        console.log(`${res.count} ID de chamada excluído com sucesso!`);
        response.status(200).json({ message: "ID de chamada excluído com sucesso!" });
      } else {
        console.log(`Nenhum ID de chamada foi encontrado para ser excluído.`);
        response.status(404).json({ message: "ID de chamada não encontrado." });
      }
  
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: "Erro ao excluir o ID de chamada." });
    } finally {
      await prisma.$disconnect();
    }
  }

  async listarChamadas(request: Request, response: Response) {
    try {
      const res = await prisma.chamada.findMany({
        where: {
            id_chamada: request.body.id_chamada,
            aluno_id: request.body.id_aluno,
            chamada_data: request.body.chamada_data
        },
      });
  
      if (res.length > 0) {
        console.log(res);
        response.status(200).json({ Chamadas: res }); 
      } else {
        console.log("Nenhum ID de chamada encontrado.");
        response.status(404).json({ message: "Nenhum ID de chamada encontrado." });
      }
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: "Erro ao ID de chamada alunos." });
    } finally {
      await prisma.$disconnect();
    }
  }
}
