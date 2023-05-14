import { Router } from "express";
import { CursosController } from "../controllers/CursosController";
import { TurmasController } from "../controllers/TurmasController";
import { AlunosController } from "../controllers/AlunosControllers";
import { ChamadasController } from "../controllers/ChamadasController";

const router : Router = Router();

router.post("/cursos/criarcurso", new CursosController().criarCursos);
router.put("/cursos/modificarcurso", new CursosController().modificarCursos);
router.delete("/cursos/excluircurso", new CursosController().excluirCursos);
router.get("/cursos/listarcurso", new CursosController().listarCursos);

router.post("/turmas/criarturma", new TurmasController().criarTurmas);
router.put("/turmas/modificarturma", new TurmasController().modificarTurmas);
router.delete("/turmas/excluirturma", new TurmasController().excluirTurmas);
router.get("/turmas/listarturma", new TurmasController().listarTurmas);

router.post("/alunos/criaraluno", new AlunosController().criarAlunos);
router.put("/alunos/modificaraluno", new AlunosController().modificarAlunos);
router.delete("/alunos/excluiraluno", new AlunosController().excluirAlunos);
router.get("/alunos/listaraluno", new AlunosController().listarAlunos);

router.post("/chamadas/criarchamada", new ChamadasController().criarChamadas);
router.put("/chamadas/modificarchamada", new ChamadasController().modificarChamadas);
router.delete("/chamadas/excluirchamada", new ChamadasController().excluirChamadas);
router.get("/chamadas/listarchamada", new ChamadasController().listarChamadas);





export { router };