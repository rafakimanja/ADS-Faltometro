'use client'

import { Falta } from "@/@types/falta"
import './TabelaFaltas.css'

interface TabelaFaltasProps {
    faltas: Falta[]
}

export default function TabelaFaltas({ faltas }: TabelaFaltasProps){
    return(
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
                                <button className="btn-tabela" id="edit">
                                    <img src="/edit.svg" alt="" />
                                </button>
                                <button className="btn-tabela" id="delete">
                                    <img src="/delete.svg" alt="" />
                                </button>
                            </td>
                        </tr>
                        ))
                    ) : null
                }
            </tbody>
        </table>
    )
}