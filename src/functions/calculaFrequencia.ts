import { Disciplina } from "@/types/disciplina";
import { Falta } from "@/types/falta";

export default function calculaFreq(disciplina: Disciplina, faltas: Falta[]){
    return ((disciplina.aulas - faltas.length) / disciplina.aulas) * 100
}

// function calculaFrequencia(disciplina: Disciplina, faltas: Falta[]) {
//   const totalPeriodosAula = disciplina.aulas * disciplina.periodosPorAula; // se você tem essa info

//   const totalPeriodosFaltados = faltas.reduce(
//     (acc, falta) => acc + (falta.periodosFaltados ?? 1),
//     0
//   );

//   const frequencia = ((totalPeriodosAula - totalPeriodosFaltados) / totalPeriodosAula) * 100;

//   return frequencia;
// }
