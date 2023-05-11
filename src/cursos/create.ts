import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

//Após todas as informações de criação preenchidas basta executa 'ts-node src/cursos/create.ts'

//Criar novo curso
async function criarCursos() {
    try {
        const res = await prisma.curso.createMany({
            data: [
                //Para criar um novo curso basta copiar a linha abaixo e alterar com as informações desejas!
                {nome_curso :'Análise e Desenvolvimento de Sistemas', duracao_curso : 2},
                {nome_curso :'Tecnologia da Informação', duracao_curso : 4},
                {nome_curso :'Medicina', duracao_curso : 5},
            ],
            skipDuplicates: true,
        });
    } catch (error) {
        console.log(error);
    }finally{
        async() => {
            await prisma.$disconnect();
        }
    }
}
criarCursos();