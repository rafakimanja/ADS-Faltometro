import { Disciplina } from '@/types/disciplina'
import { fakeDisciplinas } from '@/db/disciplinas'

export function createDisciplina(nova: Omit<Disciplina, 'id'>): Disciplina {
    const novaDisciplina: Disciplina = {       
        id: fakeDisciplinas.length + 1,
        ...nova
    }
    fakeDisciplinas.push(novaDisciplina)
    return novaDisciplina
}

export function getDisciplinas(): Disciplina[] {
    return fakeDisciplinas
}

export function getDisciplinaById(id: number): Disciplina | undefined {
    return fakeDisciplinas.find(d => d.id === id)
}

export function updateDisciplina(id: number, dados: Disciplina) {
    const disc = fakeDisciplinas.find(d => d.id === id)
    if (!disc) return null

    const updateDisc = {
        id: disc.id,
        ...dados
    }

    const index = fakeDisciplinas.indexOf(disc)
    fakeDisciplinas[index] = updateDisc
}

export function deleteDisciplina(id: number): boolean {
    const disc = fakeDisciplinas.find((d) => d.id === id)
    if(!disc)return false
        
    const index = fakeDisciplinas.indexOf(disc)
    fakeDisciplinas.splice(index, 1)

    return true
}
