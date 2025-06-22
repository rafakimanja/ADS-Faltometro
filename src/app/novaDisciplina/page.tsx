'use client'

import { Disciplina } from "@/types/disciplina"
import { useState } from "react"
import Link from "next/link"

export default function NovaDisciplina(){

    const [titulo, setTitulo] = useState('')
    const [sigla, setSigla] = useState('')
    const [creditos, setCreditos] = useState(0)
    const [aulas, setAulas] = useState(0)

    const handleSubmit = async (titulo: string, sigla: string, creditos: number, aulas: number) => {
        const objDisciplina: Disciplina = { titulo, sigla, creditos, aulas, frequencia: 100 }
        addDisciplina(objDisciplina)
    }

    return(
        <div className="form-disc">
            <div className="input-group">
                <label htmlFor="">Titulo</label>
                <input type="text" name="" id="" value={titulo} onChange={(e) => setTitulo(e.target.value)}/>
            </div>
            <div className="input-group">
                <label htmlFor="">Sigla</label>
                <input type="text" name="" id="" value={sigla} onChange={(e) => setSigla(e.target.value)}/>
            </div>
            <div className="input-group">
                <label htmlFor="">Créditos</label>
                <input type="number" name="" id="" value={creditos} onChange={(e) => setCreditos(Number(e.target.value))}/>
            </div>
            <div className="input-group">
                <label htmlFor="">Quantidade de Aulas</label>
                <input type="number" name="" id="" value={aulas} onChange={(e) => setAulas(Number(e.target.value))}/>
            </div>
            <div className="btn-group">
                <Link href='/'>
                    <button type="button">Voltar</button>
                </Link>
                <button onClick={() => {
                    handleSubmit(titulo, sigla, creditos, aulas)
                    setAulas(0)
                    setCreditos(0)
                    setSigla('')
                    setTitulo('')
                }}>Cadastrar</button>
            </div>
        </div>
    )
}

async function addDisciplina(newDisc: Disciplina) {
    try{
        const response = await fetch('/api/disciplina', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newDisc)
        })

        const data = await response.json()
        alert(`Disciplina adicionada com sucesso | ${data}`)
    } catch(error) {
        alert(`Erro ao adicionar nova disciplina | ${error}`)
    }
}