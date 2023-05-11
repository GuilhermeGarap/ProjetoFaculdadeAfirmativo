import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

//Após todas as informações de criação preenchidas basta executa 'ts-node src/cursos/read.ts'

//Listar Cursos
async function listarCursos() {
    try {
        const res = await prisma.curso.findMany(
        {
            where: {
                //Caso queira listar os cursos por algum parâmetro, retire o // da frente do mesmo, se não, apenas deixe como está e vai listar todos os cursos:
                //id_curso: (alterar com o id do curso),
                duracao_curso: 5//(alterar com a duração do curso),
                //nome_curso: (alterar com o nome do curso)
            }
        });

        if (res.length > 0) {
            console.log(res);
          } else {
            console.log("Nenhum curso encontrado.");
          }

    } catch (error) {
        console.log(error);
    }finally{
        async() => {
            await prisma.$disconnect();
        }
    }
}
listarCursos();