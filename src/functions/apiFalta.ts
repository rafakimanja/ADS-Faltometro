import type { FaltaDTO } from "@/@types/faltaDTO";

export async function fetchFaltas(id: number): Promise<FaltaDTO[]> {
    const response = await fetch(`/api/falta?disciplina=${id}`)
    const data = await response.json()
    if(!response.ok) {
        console.table(data)
        throw new Error(data.error)
    }
    return data
}

export async function getFaltaById(id: number): Promise<FaltaDTO> {
    const response = await fetch(`/api/falta/${id}`)
    const data = await response.json()
    if(!response.ok) {
        console.table(data)
        throw new Error(data.error)
    }
    return data
}

export async function createFalta(falta: FaltaDTO){
    const response = await fetch('/api/falta', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(falta)
    })

    const data = await response.json()

    if(!response.ok){
        console.table(data)
        throw new Error(data.error)
    }

    return data.message
}

export async function updateFalta(id: number, falta: FaltaDTO) {
    const response = await fetch(`/api/falta/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(falta)
    })

    const data = await response.json()

    if(!response.ok){
        console.table(data)
        throw new Error(data.error)
    }

    return data.message
}

export async function deleteFalta(id: number) {
    const response = await fetch(`/api/falta/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    })

    const data = await response.json()

    if(!response.ok){
        console.table(data)
        throw new Error(data.error)
    }

    return data.message
}