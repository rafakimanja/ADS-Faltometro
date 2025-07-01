'use client'

import type { Disciplina } from "@/@types/disciplina";
import { useEffect, useState } from "react";
import './disciplinas.css'
import Link from "next/link";
import { fetchDisciplinas } from "@/functions/apiDisciplina";

export default function Disciplinas(){

    const [disciplinas, setDisciplinas] = useState<Disciplina[] | null>(null)

    useEffect(() => {
        fetchDisciplinas()
         .then(setDisciplinas)
         .catch(err => {
            alert(err)
         })
    }, [])

    return(
        <div className="bg-disciplinas">
            {
                disciplinas ? (
                    disciplinas.map((disciplina) => (
                        <div className="card-dis" key={disciplina.id}>
                            <h2 className="title-dis">{disciplina.titulo}</h2>
                            <div className="text-card">
                                <p><b>Sigla: </b>{disciplina.sigla}</p>
                                <p><b>Créditos: </b>{disciplina.creditos}</p>
                                <p><b>Quantidade de Aulas: </b>{disciplina.aulas}</p>
                            </div>
                            <div className="btn-dis">
                                <Link href={`/disciplinas/${disciplina.id}`}>
                                    <button className="btn" id="edit">Visualizar</button>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : <p>Nenhuma disciplina cadastrada</p>
            }
        </div>
    )
}
