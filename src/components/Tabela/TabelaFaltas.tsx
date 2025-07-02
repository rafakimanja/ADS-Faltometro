'use client'

import { Falta } from "@/@types/falta"
import './TabelaFaltas.css'
import { useState } from "react"
import ModalUpdate from "../Modal/ModalUpdate"

interface TabelaFaltasProps {
    faltas: Falta[]
}

export default function TabelaFaltas({ faltas }: TabelaFaltasProps){

    const [open, setOpen] = useState(false)
    const [faltaSelecionada, setFaltaSelecionada] = useState<Falta | null>(null)

     const handleSubmit = (data: any) => {
        console.log('Enviado:', data)
        // faça PUT / PATCH aqui
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
                                    <button className="btn-tabela" id="cancel">
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
                faltaSelecionada ? <ModalUpdate isOpen={open} onClose={() => setOpen(false)} formType={'falta'} onSubmit={handleSubmit} objType={faltaSelecionada}/> : ''
            }
        </>
        
    )
}