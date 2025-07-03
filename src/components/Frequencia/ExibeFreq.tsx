import type { DisciplinaDTO } from "@/@types/disciplinaDTO";
import type { FaltaDTO } from "@/@types/faltaDTO";
import { fetchFaltas } from "@/functions/apiFalta";
import calculaFreq from "@/functions/calculaFrequencia";
import { useEffect, useState } from "react";

interface ExibeFrequenciaProps {
  disciplina: DisciplinaDTO;
}

export default function ExibeFrequencia({ disciplina }: ExibeFrequenciaProps) {
  const [faltas, setFaltas] = useState<FaltaDTO[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (disciplina?.id) {
      fetchFaltas(disciplina.id)
        .then(setFaltas)
        .catch((err) => alert(err))
        .finally(() => setCarregando(false));
    }
  }, [disciplina.id]);

  if (carregando) return <>...</>;

  const freq = calculaFreq(disciplina, faltas);
  return <>{freq}%</>;
}
