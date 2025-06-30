'use client'

import { useEffect, useState } from 'react'
import { Disciplina } from '@/types/disciplina'
import { Falta } from '@/types/falta'
import Link from 'next/link'
import './formFalta.css'

export default function FormFalta(){

    const [data, setData] = useState<Date | null>(null)
    const [idDisc, setIdDisc] = useState(0)
    const [disciplinas, setDisciplinas] = useState<Disciplina[] | null>(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/disciplina')
                const data = await response.json()
                setDisciplinas(data)
            } catch (error) {
                alert(`Erro ao buscar por disciplinas | ${error}`)
            }
        }
        
        fetchData()
    }, [])


    const handleSubmit =  async (data: Date, idDisc: number) => {

        if(data === null){
            alert('Adicione uma data válida!')
            return
        }

        if(idDisc === 0){
            alert('Escolha uma disciplina válida')
            return
        }

        const objFalta: Falta = {data, disciplinaID: idDisc}
        await addFalta(objFalta)
    }


    return(
        <div className="bg-formFalta">
            <div className="input-group">
                <label htmlFor="">Data</label>
                <input type="date" name="" id="" onChange={(e) => setData(new Date(e.target.value))} required />
            </div>
            <div className="input-group">
                <label htmlFor="">Disciplina</label>
                <select name="" id="" value={idDisc} onChange={(e) => setIdDisc(Number(e.target.value))} required >
                    <option value="">Escolha</option>
                    {
                        disciplinas ? (
                            disciplinas.map((disc) => {
                                return <option key={disc.id} value={disc.id}>{disc.titulo}</option>
                            })
                        ) : ''
                    }
                </select>
            </div>
            <div className="btn-group">
                <Link href='/'>
                    <button type="button" className="btn" id="cancel">Voltar</button>
                </Link>
                <button className='btn' id='submit' onClick={() => {
                    handleSubmit(data!, idDisc)
                }}>Cadastrar</button>
            </div>
        </div>
    )
}

async function addFalta(newFalta: Falta){
    alert(`Nova falta cadastrada: ${JSON.stringify(newFalta)}`)
}