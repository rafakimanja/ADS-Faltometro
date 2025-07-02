'use client'

import type { Disciplina } from '@/@types/disciplina'
import type { Falta } from '@/@types/falta'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { deleteDisciplina, getDisciplina } from '@/functions/apiDisciplina'
import { fetchFaltas } from '@/functions/apiFalta'
import TabelaFaltas from '@/components/Tabela/TabelaFaltas'
import ExibeFrequencia from '@/components/Frequencia/ExibeFreq'
import './disciplina.css'
import ModalUpdate from '@/components/Modal/ModalUpdate'

export default function Disciplina(){

    const params = useParams()
    const id = Number(params.id)

    const [disciplina, setDisciplina] = useState<Disciplina | null>(null)
    const [faltas, setFaltas] = useState<Falta[] | null>(null)
    const [open, setOpen] = useState(false)

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

    const handleSubmit = (data: any) => {
        console.log('Enviado:', data)
        // faça PUT / PATCH aqui
    }

    return(
        <div className="bg-disciplina">
             {disciplina ? (
                <div className='bg-info'>
                    <div className="info-data">
                        <h1>{disciplina.titulo}</h1>
                        <div className="text-data">
                            <p>Sigla: {disciplina.sigla}</p>
                            <p>Créditos: {disciplina.creditos}</p>
                            <p>Aulas: {disciplina.aulas}</p>
                            <p>Frequência: <ExibeFrequencia disciplina={disciplina}/></p>
                        </div>
                    </div>
                    <div className="grupo-botoes">
                        <button className='botoes' id='submit' onClick={() => {setOpen(true)}}>Editar</button>
                        <button onClick={() => deletar(disciplina.id!)} className='botoes' id='cancel'>Excluir</button>
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
            {
                disciplina ? <ModalUpdate isOpen={open} onClose={() => setOpen(false)} formType={'disciplina'} onSubmit={handleSubmit} objType={disciplina}/> : ''
            }
        </div>
    )
}