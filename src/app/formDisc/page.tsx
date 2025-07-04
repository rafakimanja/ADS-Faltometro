'use client'

import type { DisciplinaDTO } from "@/@types/disciplinaDTO"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createDisciplina } from "@/functions/apiDisciplina"
import './form.css'

export default function NovaDisciplina(){
    const router = useRouter()

    const [titulo, setTitulo] = useState('')
    const [sigla, setSigla] = useState('')
    const [creditos, setCreditos] = useState(0)
    const [aulas, setAulas] = useState(0)
    

    const handleSubmit = async (titulo: string, sigla: string, creditos: number, aulas: number) => {
        const objDisciplina: DisciplinaDTO = { titulo, sigla, creditos, aulas }

        try{
            const msg = await createDisciplina(objDisciplina)
            alert(msg)
            router.push('/')
        } catch(err){
            alert(err)
        }
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
                    <button type="button" className="btn" id="cancel">Voltar</button>
                </Link>
                <button className="btn" id="submit" onClick={() => {
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
