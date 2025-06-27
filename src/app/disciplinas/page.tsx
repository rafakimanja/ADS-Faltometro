'use client'

import { Disciplina } from "@/types/disciplina";
import { useEffect, useState } from "react";
import './disciplinas.css'
import Link from "next/link";

export default function Disciplinas(){

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

    const deleteDisc = async (id: number | undefined) => {
        if (id == null){
            alert('Invalid ID')
        } else {
            await excluiDisc(id)
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


async function excluiDisc(id: number){
    try{
        const response = await fetch(`/api/disciplina/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        alert(response)
    } catch (error) {
        console.log(error)
        alert(`Erro ao deletar disciplina: ${error}`)
    }
}