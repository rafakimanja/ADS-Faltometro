import { Disciplina } from "@/types/disciplina"

export const fakeDisciplinas: Disciplina[] = [
    {
        id: 1,
        titulo: "Algoritmos e Estruturas de Dados",
        sigla: "AED",
        creditos: 4,
        aulas: 60,
        frequencia: 75,
        faltas: [ 3, ]
    },
    {
        id: 2,
        titulo: "Banco de Dados",
        sigla: "BD",
        creditos: 3,
        aulas: 45,
        frequencia: 80,
        faltas: [ 1, ]
    },
    {
        id: 3,
        titulo: "Engenharia de Software",
        sigla: "ES",
        creditos: 4,
        aulas: 60,
        frequencia: 70,
        faltas: []
    },
    {
        id: 4,
        titulo: "Sistemas Operacionais",
        sigla: "SO",
        creditos: 4,
        aulas: 60,
        frequencia: 75,
        faltas: [ 2, ]
    },
    {
        id: 5,
        titulo: "Redes de Computadores",
        sigla: "RC",
        creditos: 3,
        aulas: 45,
        frequencia: 85,
        faltas: []
    },
    {
        id: 6,
        titulo: "Matemática Discreta",
        sigla: "MD",
        creditos: 3,
        aulas: 45,
        frequencia: 70,
        faltas: [ 4, ]
    }
];
