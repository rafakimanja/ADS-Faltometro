'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { DisciplinaDTO } from '@/@types/disciplinaDTO'
import type { FaltaDTO } from '@/@types/faltaDTO'
import { deleteDisciplina, getDisciplinaById, updateDisciplina } from '@/functions/apiDisciplina'
import { fetchFaltas } from '@/functions/apiFalta'
import TabelaFaltas from '@/components/Tabela/TabelaFaltas'
import ExibeFrequencia from '@/components/Frequencia/ExibeFreq'
import ModalUpdate from '@/components/Modal/ModalUpdate'

import './disciplina.css'

export default function Disciplina(){
    const router = useRouter()

    const params = useParams()
    const id = Number(params.id)

    const [disciplina, setDisciplina] = useState<DisciplinaDTO | null>(null)
    const [faltas, setFaltas] = useState<FaltaDTO[] | null>(null)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if(id === null) return
        
        getDisciplinaById(id)
         .then(setDisciplina)
         .catch(err => alert(err))

        fetchFaltas(id)        
         .then(setFaltas)
         .catch(err => alert(err))

    }, [id])

    const deleteDisc = async (id: number) => {
        const resp = await deleteDisciplina(id)
        alert(resp)
        router.push('/')
    }

    const funcaoAtualiza = async (obj: DisciplinaDTO | FaltaDTO, id: number, objType: 'disciplina' | 'falta') => {
        if(objType === 'disciplina' && 'titulo' in obj){
            try{
                const resp = await updateDisciplina(id, obj)
                alert(resp)

                const objAtt = await getDisciplinaById(id)
                setDisciplina(objAtt)
            } catch(err) {
                alert(err)
            }
        }
    }

    const refreshFaltas = async () => {
        fetchFaltas(id)        
         .then(setFaltas)
         .catch(err => alert(err))
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
                        <button onClick={() => deleteDisc(disciplina.id!)} className='botoes' id='cancel'>Excluir</button>
                    </div>
                    { 
                        faltas ? (
                            <div className="tabela-faltas">
                                <TabelaFaltas faltas={faltas} onChange={refreshFaltas} />
                            </div>
                        ) : ''
                    }
                </div>
            ) : (
                <p>Carregando disciplina...</p>
            )}
            {
                disciplina ? <ModalUpdate isOpen={open} onClose={() => setOpen(false)} formType={'disciplina'} onSubmit={funcaoAtualiza} objType={disciplina}/> : ''
            }
        </div>
    )
}