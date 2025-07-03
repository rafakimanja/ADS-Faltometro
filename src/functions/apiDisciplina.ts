import type { DisciplinaDTO } from "@/@types/disciplinaDTO";

export async function fetchDisciplinas(): Promise<DisciplinaDTO[]> {
    const response = await fetch('/api/disciplina')
    const data = await response.json()
    if(!response.ok) {
        console.table(data)
        throw new Error('Erro ao buscar por disciplinas')
    }
    return data
}

export async function getDisciplinaById(id: number): Promise<DisciplinaDTO>{
    const response = await fetch(`/api/disciplina/${id}`)
    const data = await response.json()
    if(!response.ok) {
        console.table(data)
        throw new Error(data.error)
    }
    return data
}

export async function createDisciplina(disciplina: DisciplinaDTO){
    const response = await fetch('/api/disciplina', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(disciplina)
    })

    const data = await response.json()

    if(!response.ok){
        console.table(data)
        throw new Error(data.error)
    }

    return data.message
}

export async function updateDisciplina(id: number, disciplina: DisciplinaDTO) {
    const response = await fetch(`/api/disciplina/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(disciplina)
    })

    const data = await response.json()
    if(!response.ok){
        console.table(data)
        throw new Error(data.error)
    }
    return data
}

export async function deleteDisciplina(id: number) {
    const response = await fetch(`/api/disciplina/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
    const data = await response.json()
    if(!response.ok) {
        console.table(data)
        throw new Error(data.error)
    }
    return data.message
}