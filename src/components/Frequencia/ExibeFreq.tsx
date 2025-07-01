import type { Disciplina } from "@/@types/disciplina";
import type { Falta } from "@/@types/falta";
import { fetchFaltas } from "@/functions/apiFalta";
import calculaFreq from "@/functions/calculaFrequencia";
import { useEffect, useState } from "react";

interface ExibeFrequenciaProps {
  disciplina: Disciplina;
}

export default function ExibeFrequencia({ disciplina }: ExibeFrequenciaProps) {
  const [faltas, setFaltas] = useState<Falta[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (disciplina?.id) {
      fetchFaltas(disciplina.id)
        .then((data) => setFaltas(data || []))
        .catch((err) => alert(err))
        .finally(() => setCarregando(false));
    }
  }, [disciplina.id]);

  if (carregando) return <>...</>;

  const freq = calculaFreq(disciplina, faltas);
  return <>{freq}%</>;
}
