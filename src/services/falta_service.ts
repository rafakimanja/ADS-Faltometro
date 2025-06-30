import { Falta } from "@/types/falta";
import { fakeFaltas } from "@/db/faltas";

export function createFalta(falta: Falta): Falta {
    const novaFalta: Falta = {
        id: fakeFaltas.length + 1,
        ...falta
    }
    fakeFaltas.push(novaFalta)
    return novaFalta
}

export function getFaltas(): Falta[]{
    return fakeFaltas
}

export function getFaltaById(id: number): Falta | undefined {
    return fakeFaltas.find(f => f.id === id)
}

export function updateFalta(id: number, dados: Falta): Falta | null{
    const falta = fakeFaltas.find(f => f.id === id)
    if(!falta) return null

    const updateFalta = {
        id: falta.id,
        ...dados
    }

    const index = fakeFaltas.indexOf(falta)
    fakeFaltas[index] = updateFalta
    return falta
}

export function deleteFalta(id: number): boolean {
    const falta = fakeFaltas.find(f => f.id === id)
    if(!falta) return false

    const index = fakeFaltas.indexOf(falta)
    fakeFaltas.splice(index, 1)

    return true
}