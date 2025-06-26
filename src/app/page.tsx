'use client'

import { useEffect, useState } from "react";
import { Disciplina } from "@/types/disciplina";
import "./page.css"

export default function Home() {

 const [disciplinas, setDisciplinas] = useState<Disciplina[] | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/disciplina')
        const data = await response.json()
        setDisciplinas(data)
      } catch (error) {
        alert(`Erro ao buscar por disciplinas | ${error}`)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="main-div">
      {
        disciplinas?.map((disc) => (
          <div key={disc.id} style={{ border: 'solid 1px black', borderRadius: '10px', marginBottom: '1rem'}}>
            <h2>{disc.titulo} - {disc.sigla}</h2>
          </div>
        ))
      }
    </div>
  );
}
