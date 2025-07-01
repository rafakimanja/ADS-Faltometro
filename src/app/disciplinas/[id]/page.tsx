'use client'

import { useParams } from 'next/navigation'
import type { Disciplina } from '@/@types/disciplina'
import TabelaFaltas from '@/components/TabelaFaltas'
import { useEffect, useState } from 'react'
import './disciplina.css'

export default function Disciplina(){

    const params = useParams()
    const id = Number(params.id)

    const [disciplina, setDisciplina] = useState<Disciplina | null>(null)

    useEffect(() => {

        if(id === null) return

        const getData = async (id: number) => {
            const data = await getDisc(id)
            setDisciplina(data)
        }

        getData(id)
    }, [id])

    const showTable = (faltas: number[], disciplina: Disciplina) => {
        if(faltas.length > 0){
            return <TabelaFaltas disciplina={disciplina} />
        } else {
            return <p>Nenhuma falta registrada nesta disciplina</p>
        }
    }

    return(
        <div className="bg-disciplina">
             {disciplina ? (
                <div className='bg-info'>
                    <div className="info-data">
                        <h1>{disciplina.titulo}</h1>
                        <p>ID: {disciplina.id}</p>
                        <p>Sigla: {disciplina.sigla}</p>
                        <p>Créditos: {disciplina.creditos}</p>
                        <p>Aulas: {disciplina.aulas}</p>
                        <p>Frequência: {disciplina.frequencia}%</p>
                    </div>
                    <div className="tabela-faltas">
                        { showTable(disciplina.faltas, disciplina) }
                    </div>
                </div>
            ) : (
                <p>Carregando disciplina...</p>
            )}
        </div>
    )
}

async function getDisc(id: number){
    try{
        const response = await fetch(`/api/disciplina/${id}`)
        const data = await response.json()
        return data
    } catch (error) {
        alert(`Erro ao pesquisar pela disciplina | ${error}`)
        return null
    }
}