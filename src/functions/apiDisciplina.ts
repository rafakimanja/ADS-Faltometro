import { Disciplina } from "@/@types/disciplina";

export async function fetchDisciplinas(): Promise<Disciplina[]> {
    const response = await fetch('/api/disciplina')
    const data = await response.json()
    if(!response.ok) {
        console.table(data)
        throw new Error('Erro ao buscar por disciplinas')
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
        throw new Error('Erro ao deletar disciplina')
    }
    return data
}