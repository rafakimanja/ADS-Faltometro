import { Disciplina } from "@/@types/disciplina";
import { Falta } from "@/@types/falta";

export default function calculaFreq(disciplina: Disciplina, faltas: Falta[]){

    const totalAulas = disciplina.aulas * disciplina.creditos
    let totalFaltas = 0

    faltas.forEach((falta) => {
        totalFaltas += falta.periodosFaltados
    })

    const totalAulasAssistidas = totalAulas - totalFaltas

    const freq = (totalAulasAssistidas / totalAulas) * 100

    return  Math.round(freq)
}

