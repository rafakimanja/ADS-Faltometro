import type { DisciplinaDTO } from "@/@types/disciplinaDTO"
import type { FaltaDTO } from "@/@types/faltaDTO"

export default function calculaFreq(disciplina: DisciplinaDTO, faltas: FaltaDTO[]){

    const totalAulas = disciplina.aulas * disciplina.creditos
    let totalFaltas = 0

    faltas.forEach((falta) => {
        totalFaltas += falta.periodosFaltados
    })

    const totalAulasAssistidas = totalAulas - totalFaltas

    const freq = (totalAulasAssistidas / totalAulas) * 100

    return  Math.round(freq)
}

