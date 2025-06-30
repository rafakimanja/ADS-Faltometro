'use client'

import { Falta } from "@/types/falta"
import './TabelaFaltas.css'
import { useEffect, useState } from "react"
import { Disciplina } from "@/types/disciplina"

interface TabelaFaltasProps {
    disciplina: Disciplina
}

export default function TabelaFaltas({ disciplina }: TabelaFaltasProps){

    const [faltas, setFaltas] = useState<Falta[] | null>(null)

    useEffect(() => {
        
        const getData = async (id: number) => {
            const data = await getFaltas(id)
            setFaltas(data)
        }

        getData(disciplina.id!)
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

async function getFaltas(id: number) {
    try{
        const response = await fetch(`/api/falta?disciplina=${id}`)
        const data = await response.json()
        return data
    } catch (error) {
        alert(`Erro ao pesquisar as faltas da disciplina | ${error}`)
        return null
    }
}