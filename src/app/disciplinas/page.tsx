'use client'

import { Disciplina } from "@/types/disciplina";
import { useEffect, useState } from "react";
import './disciplinas.css'
import Link from "next/link";
import { deleteDisciplina, fetchDisciplinas } from "@/functions/apiDisciplina";

export default function Disciplinas(){

    const [disciplinas, setDisciplinas] = useState<Disciplina[] | null>(null)

    useEffect(() => {
        fetchDisciplinas()
         .then(setDisciplinas)
         .catch(err => {
            alert(err)
         })
    }, [])

    const deleteDisc = async (id: number | undefined) => {
        if (id == null){
            alert('Invalid ID')
        } else {
            const data = await deleteDisciplina(id)
            alert(data)
        }
    }

    return(
        <div className="bg-disciplinas">
            {
                disciplinas ? (
                    disciplinas.map((disciplina) => (
                        <div className="card-dis" key={disciplina.id}>
                            <h2 className="title-dis">{disciplina.titulo} - {disciplina.sigla}</h2>
                            <div className="text-card">
                                <p><b>Créditos: </b>{disciplina.creditos}</p>
                                <p><b>Quantidade de Aulas: </b>{disciplina.aulas}</p>
                                <p><b>Frequência: </b>{disciplina.frequencia}%</p>
                            </div>
                            <div className="btn-dis">
                                <Link href={`/disciplinas/${disciplina.id}`}>
                                    <button className="btn" id="edit">Editar</button>
                                </Link>
                                <button className="btn" id="delete" onClick={() => deleteDisc(disciplina.id)} >Excluir</button>
                            </div>
                        </div>
                    ))
                ) : <p>Nenhuma disciplina cadastrada</p>
            }
        </div>
    )
}
