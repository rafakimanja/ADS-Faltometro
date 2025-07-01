'use client'

import type { Disciplina } from '@/@types/disciplina'
import type { Falta } from '@/@types/falta'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { deleteDisciplina, getDisciplina } from '@/functions/apiDisciplina'
import { fetchFaltas } from '@/functions/apiFalta'
import TabelaFaltas from '@/components/TabelaFaltas'
import calculaFreq from '@/functions/calculaFrequencia'
import './disciplina.css'

export default function Disciplina(){

    const params = useParams()
    const id = Number(params.id)

    const [disciplina, setDisciplina] = useState<Disciplina | null>(null)
    const [faltas, setFaltas] = useState<Falta[] | null>(null)

    useEffect(() => {
        if(id === null) return
        
        getDisciplina(id)
         .then(setDisciplina)
         .catch(err => {
            alert(err)
         })

        fetchFaltas(id)        
         .then(setFaltas)
         .catch(err => {
            alert(err)
         })

    }, [id])

    const deletar = async (id: number) => {
        const data = await deleteDisciplina(id)
        alert(data)
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
                        <p>Frequência: {calculaFreq(disciplina, faltas!)}%</p>
                    </div>
                    <div className="btn-group">
                        <button>Salvar</button>
                        <button onClick={() => deletar(disciplina.id!)}>Excluir</button>
                    </div>
                    <div className="tabela-faltas">
                        { 
                            faltas ? <TabelaFaltas faltas={faltas} /> : <p>Sem faltas registradas</p>
                        }
                    </div>
                </div>
            ) : (
                <p>Carregando disciplina...</p>
            )}
        </div>
    )
}