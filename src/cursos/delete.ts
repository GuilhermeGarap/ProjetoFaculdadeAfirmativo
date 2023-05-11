import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

//Após todas as informações de criação preenchidas basta executa 'ts-node src/cursos/delete.ts'

//Alterar algum curso
async function excluirCursos() {
    try {
        const res = await prisma.curso.deleteMany(
        {
            where: {
                //Selecione um parâmetro para buscar o curso que deseja excluir:
                //id_curso: (alterar com o id do curso),
                duracao_curso: 6//(alterar com a duração do curso),
                //nome_curso: (alterar com o nome do curso)
            },
        });

        console.log(res);

    } catch (error) {
        console.log(error);
    }finally{
        async() => {
            await prisma.$disconnect();
        }
    }
}
excluirCursos();