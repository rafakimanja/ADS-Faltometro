'use client'

import React, { useEffect, useState } from 'react'
import { Disciplina } from '@/@types/disciplina'
import { Falta } from '@/@types/falta'
import Link from 'next/link'
import './formFalta.css'
import { fetchDisciplinas } from '@/functions/apiDisciplina'
import { createFalta } from '@/functions/apiFalta'

export default function FormFalta(){

    const [creditos, setCreditos] = useState(0)
    const [data, setData] = useState<Date | null>(null)
    const [disciplinas, setDisciplinas] = useState<Disciplina[] | null>(null)
    const [disciplina, setDisciplina] = useState<Disciplina | null>(null)

    useEffect(() => {
        fetchDisciplinas()
         .then(setDisciplinas)
         .catch(err => {
            alert(err)
         })
    }, [])

    useEffect(() => {
        if (disciplina) setCreditos(disciplina.creditos)
    }, [disciplina])

    const handleDisciplinaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = Number(e.target.value)
        const selecionada = disciplinas?.find((d) => d.id === id) ?? null
        setDisciplina(selecionada)
    }

    const handleSubmit = async () => {

        if(!data){
            alert('Adicione uma data válida!')
            return
        }

        if(!disciplina){
            alert('Escolha uma disciplina válida')
            return
        }

        if(creditos > disciplina.creditos){
            alert('A quantidade de créditos selecionados não condizem com a da disciplina')
            return
        }

        const objFalta: Falta = {data, periodosFaltados: creditos, disciplinaID: disciplina.id!}
        createFalta(objFalta)
         .then(() => alert(`Nova falta adicionada em ${disciplina.titulo}`))
         .catch(err => { 
            alert(err) 
        })
    }

    return(
        <div className="bg-formFalta">
            <div className="input-group">
                <label htmlFor="">Data</label>
                <input type="date" name="" id="" value={data ? data.toISOString().slice(0, 10) : ''} onChange={(e) => setData(new Date(e.target.value))} required />
            </div>
            <div className="input-group">
                <label htmlFor="">Disciplina</label>
                <select name="" id="" value={disciplina?.id ?? 0} onChange={handleDisciplinaChange} required >
                    <option value={0}>Escolha</option>
                    {
                        disciplinas ? (
                            disciplinas.map((disc) => {
                                return <option key={disc.id} value={disc.id}>{disc.titulo}</option>
                            })
                        ) : ''
                    }
                </select>
            </div>
            <div className="input-group">
                <label htmlFor="">Créditos</label>
                <input type="number" name="" id="" value={creditos} onChange={(e) => setCreditos(Number(e.target.value))} required />
            </div>
            <div className="btn-group">
                <Link href='/'>
                    <button type="button" className="btn" id="cancel">Voltar</button>
                </Link>
                <button className='btn' id='submit' onClick={() => {
                    handleSubmit(),
                    setCreditos(0),
                    setData(null),
                    setDisciplinas(null),
                    setDisciplina(null)
                }}>Cadastrar</button>
            </div>
        </div>
    )
}