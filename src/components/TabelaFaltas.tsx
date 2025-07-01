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
                            <td>
                                <button>Edita</button>
                                <button>Apaga</button>
                            </td>
                        </tr>
                        ))
                    ) : null
                }
            </tbody>
        </table>
    )
}