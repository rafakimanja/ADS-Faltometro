'use client'

import type { FaltaDTO } from "@/@types/faltaDTO"
import type { DisciplinaDTO } from "@/@types/disciplinaDTO"
import { deleteFalta, updateFalta } from "@/functions/apiFalta"
import { useState } from "react"
import ModalUpdate from "../Modal/ModalUpdate"
import './TabelaFaltas.css'

interface TabelaFaltasProps {
    faltas: FaltaDTO[],
    onChange: () => void
}

export default function TabelaFaltas({ faltas, onChange }: TabelaFaltasProps){
    const [open, setOpen] = useState(false)
    const [faltaSelecionada, setFaltaSelecionada] = useState<FaltaDTO | null>(null)

    const deletaFalta = async (falta: FaltaDTO) => {
        const resp = await deleteFalta(falta.id!)
        alert(resp)
       onChange()
    }

     const funcaoAtualiza = async (obj: DisciplinaDTO | FaltaDTO, id: number, objType: 'disciplina' | 'falta') => {
        if (objType === 'falta' && 'data' in obj){
            updateFalta(id, obj)
             .then(resp => alert(resp))
             .catch(err => alert(err))
            onChange()
        }
    }

    return(
        <>
            <table className="tb-faltas">
                <thead>
                    <tr>
                    <th className="cl-id">Períodos</th>
                    <th className="cl-dt">Data</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        faltas ? (
                            faltas.map((falta) => (
                            <tr key={falta.id}>
                                <td className="cl-id">{falta.periodosFaltados}</td>
                                <td className="cl-dt">{new Date(falta.data).toLocaleDateString('pt-BR')}</td>
                                <td className="cl-ds">
                                    <button className="btn-tabela" id="submit" onClick={() => {setFaltaSelecionada(falta); setOpen(true)}}>
                                        <img src="/edit.svg" alt="" />
                                    </button>
                                    <button className="btn-tabela" id="cancel" onClick={() => deletaFalta(falta)}>
                                        <img src="/delete.svg" alt="" />
                                    </button>
                                </td>
                            </tr>
                            ))
                        ) : null
                    }
                </tbody>
            </table>
            {
                faltaSelecionada ? <ModalUpdate isOpen={open} onClose={() => setOpen(false)} formType={'falta'} onSubmit={funcaoAtualiza} objType={faltaSelecionada}/> : ''
            }
        </>
        
    )
}