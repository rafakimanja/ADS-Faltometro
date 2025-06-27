export interface Disciplina {
    id?: number,
    titulo: string,
    sigla: string,
    creditos: number,
    aulas: number,
    frequencia: number,
    faltas: Falta[],
}