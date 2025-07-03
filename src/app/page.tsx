'use client'

import { useEffect, useState } from "react";
import type { DisciplinaDTO } from "@/@types/disciplinaDTO";
import { fetchDisciplinas } from "@/functions/apiDisciplina";
import ExibeFrequencia from "@/components/Frequencia/ExibeFreq";
import "./page.css"

export default function Home() {

  const cores = [
    '#0588f0', // azul
    '#ef5f00', // laranja
    '#2b9a66', // verde
    '#efa727', // amarelo
    '#e53935', // vermelho
    '#8e24aa'  // roxo
  ];

 const [disciplinas, setDisciplinas] = useState<DisciplinaDTO[]>([])
 const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetchDisciplinas()
     .then(setDisciplinas)
     .catch(err => {
      alert(err)
     })
     .finally(() => setCarregando(false))
  }, [])

  if(carregando) return (<p>Procurando disciplinas...</p>)
  
  function hexParaRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function useCorCiclica(index: number, alpha = 1): string {
    const corHex = cores[index % cores.length];
    return hexParaRgba(corHex, alpha);
  }

  function retornaCards(disciplinas: DisciplinaDTO[]){
    
    if(disciplinas.length === 0){
      return <p>Nenhum disciplina cadastrada!</p>
    }

    return disciplinas.map((disc, index) => (
      <div className="card-content" style={{ backgroundColor: useCorCiclica(index, 0.85)}} key={index}>
        <div className="card" id="freq">
          <p>frequência</p>
          <h1><ExibeFrequencia disciplina={disc}/></h1>
        </div>
        <div className="card" id="titulo">
          <h1>{disc.sigla}</h1>
        </div>
      </div>
    ))
  }

  return (
    <div className="main-div">
      <div className="cards">
        {
          retornaCards(disciplinas)
        }
      </div>
    </div>
  );
}
