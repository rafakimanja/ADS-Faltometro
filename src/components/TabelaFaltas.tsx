'use client'

import { Falta } from "@/@types/falta"
import './TabelaFaltas.css'
import { useEffect, useState } from "react"
import { Disciplina } from "@/@types/disciplina"
import { fetchFaltas } from "@/functions/apiFalta"

interface TabelaFaltasProps {
    disciplina: Disciplina
}

export default function TabelaFaltas({ disciplina }: TabelaFaltasProps){

    const [faltas, setFaltas] = useState<Falta[] | null>(null)

    useEffect(() => {
        fetchFaltas(disciplina.id!)        
         .then(setFaltas)
         .catch(err => {
            alert(err)
         })
    }, [])

    return(
        <table className="tb-faltas">
            <thead>
                <tr>
                <th>ID</th>
                <th>Data</th>
                <th>Disciplina</th>
                </tr>
            </thead>
            <tbody>
                { 
                    faltas ? (
                        faltas.map((falta) => (
                        <tr key={falta.id}>
                            <td>{falta.id}</td>
                            <td>{new Date(falta.data).toLocaleDateString('pt-BR')}</td>
                            <td>{disciplina.titulo}</td>
                        </tr>
                        ))
                    ) : null
                }
            </tbody>
        </table>
    )
}