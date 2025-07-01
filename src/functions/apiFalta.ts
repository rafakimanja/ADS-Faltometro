import { Falta } from "@/@types/falta";

export async function fetchFaltas(id: number): Promise<Falta[]> {
    const response = await fetch(`/api/falta?disciplina=${id}`)
    const data = await response.json()
    if(!response.ok) {
        console.table(data)
        throw new Error('Erro ao buscar as faltas')
    }
    return data
}

export async function createFalta(falta: Falta): Promise<Falta> {
    const response = await fetch('/api/falta', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(falta)
    })

    const { data } = await response.json()

    if(!response.ok){
        console.table(data)
        throw new Error('Erro ao criar nova falta')
    }

    return data
}