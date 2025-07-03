'use client'

import { useState, useEffect } from 'react'
import './ModalUpdate.css'
import type { FaltaDTO } from '@/@types/faltaDTO'
import type { DisciplinaDTO } from '@/@types/disciplinaDTO'


interface ModalUpdateProps {
  isOpen: boolean
  onClose: () => void
  formType: 'disciplina' | 'falta'
  objType: DisciplinaDTO | FaltaDTO
  onSubmit: (obj: DisciplinaDTO | FaltaDTO) => void
}

export default function ModalUpdate({ isOpen, onClose, formType, objType, onSubmit }: ModalUpdateProps) {
    const [titulo, setTitulo] = useState('')
    const [sigla, setSigla] = useState('')
    const [creditos, setCreditos] = useState(0)
    const [aulas, setAulas] = useState(0)
    const [creditosFalta, setCreditosFalta] = useState(0)
    const [data, setData] = useState<Date>()
    const [idDisc, setIddisc] = useState(0)
    
    
    useEffect(() => {
        if (formType === 'disciplina') {
            const disciplina = objType as DisciplinaDTO
            setTitulo(disciplina.titulo)
            setSigla(disciplina.sigla)
            setCreditos(disciplina.creditos)
            setAulas(disciplina.aulas)
        } else {
            const falta = objType as FaltaDTO
            setCreditosFalta(falta.periodosFaltados)
            setData(new Date(falta.data)) // garantir instância válida
            setIddisc(falta.disciplinaID)
        }
    }, [formType, objType])

    if (!isOpen) return null

    const handleSalvar = (formType: 'disciplina' | 'falta') => {
      if(formType === 'disciplina'){
        onSubmit({ titulo, sigla, creditos, aulas })
      }

      if (formType === 'falta') {
        if (!data) {
          alert("Data não informada");
          return;
        }
        onSubmit({ data, periodosFaltados: creditosFalta, disciplinaID: idDisc });
      }
      onClose()
    }

  /* --- render dos dois forms --- */
  const renderDisciplinaForm = () => (
    <>
      <div className="input-group">
        <label>Título</label>
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required/>
      </div>
      <div className="input-group">
        <label>Sigla</label>
        <input type="text" value={sigla} onChange={(e) => setSigla(e.target.value)} required />
      </div>
      <div className="input-group">
        <label>Créditos</label>
        <input type="number" value={creditos} onChange={(e) => setCreditos(Number(e.target.value))} required />
      </div>
      <div className="input-group">
        <label>Quantidade de Aulas</label>
        <input type="number" value={aulas} onChange={(e) => setAulas(Number(e.target.value))} required />
      </div>
    </>
  )

  const renderFaltaForm = () => (
    <>
      <div className="input-group">
        <label>Data</label>
        <input type="date" value={data ? data.toISOString().slice(0, 10) : ''} onChange={(e) => setData(new Date(e.target.value))} required />
      </div>
      <div className="input-group">
        <label>Créditos</label>
        <input type="number" value={creditosFalta} onChange={(e) => setCreditosFalta(Number(e.target.value))} required />
      </div>
    </>
  )

  return (
    <div className='overlay' onClick={onClose}>
      <div className='modal' onClick={(e) => e.stopPropagation()}>
        <h2>{formType === 'disciplina' ? 'Editar Disciplina' : 'Registrar Falta'}</h2>
        <br/>
        <div className='formBody'>
          {formType === 'disciplina' ? renderDisciplinaForm() : renderFaltaForm()}
        </div>

        <div className='btnGroup'>
          <button type="button" className='cancel' onClick={onClose}>
            Cancelar
          </button>
          <button type="button" className='save' onClick={() => handleSalvar(formType)}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}
