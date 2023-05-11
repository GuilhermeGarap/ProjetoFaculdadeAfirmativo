import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

//Após todas as informações de criação preenchidas basta executa 'ts-node src/cursos/update.ts'

//Alterar algum curso
async function modificarCursos() {
    try {
        const res = await prisma.curso.updateMany(
        {
            where: {
                //Selecione um parâmetro para buscar o curso desejado:
                //id_curso: (alterar com o id do curso),
                duracao_curso: 5//(alterar com a duração do curso),
                //nome_curso: (alterar com o nome do curso)
            },
            data: {
                //Escolha um ou mais atributos para serem alterados:
                //id_curso: (alterar com o id do curso),
                duracao_curso: 6//(alterar com a duração do curso),
                //nome_curso: (alterar com o nome do curso)
            }
        });

        if (res.count > 0) {
            console.log(`${res.count} curso(s) modificado(s) com sucesso!`);
        } else {
            console.log(`Nenhum curso foi encontrado para ser modificado.`);
        }

    } catch (error) {
        console.log(error);
    }finally{
        async() => {
            await prisma.$disconnect();
        }
    }
}
modificarCursos();