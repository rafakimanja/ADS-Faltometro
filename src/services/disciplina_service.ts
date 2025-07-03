import { prisma } from '@/db/conector'
import type { DisciplinaDTO } from '@/@types/disciplinaDTO'

export async function createDisciplina(disc: DisciplinaDTO): Promise<boolean> {
   try {
        await prisma.disciplina.create({
            data: {
                titulo: disc.titulo,
                sigla: disc.sigla,
                creditos: disc.creditos,
                aulas: disc.aulas,
            },
        })
        return true
    } catch (err) {
        console.error("Erro ao criar disciplina: ",err)
        return false
    }
}

export async function getDisciplinas(): Promise<DisciplinaDTO[]> {
    return await prisma.disciplina.findMany({
        select: {
            id: true,
            titulo: true,
            sigla: true,
            creditos: true,
            aulas: true,
        }
    })
}

export async function getDisciplinaById(id: number): Promise<DisciplinaDTO | null> {
    return await prisma.disciplina.findUnique({
        where: { id },
        select: {
            id: true,
            titulo: true,
            sigla: true,
            creditos: true,
            aulas: true,
        }
    })
}

export async function updateDisciplina(id: number, dados: DisciplinaDTO): Promise<DisciplinaDTO | null> {
  try {
    const updated = await prisma.disciplina.update({
      where: { id },
      data: {
        titulo: dados.titulo,
        sigla: dados.sigla,
        creditos: dados.creditos,
        aulas: dados.aulas,
      },
      select: {
        id: true,
        titulo: true,
        sigla: true,
        creditos: true,
        aulas: true,
      }
    })

    return updated
  } catch (error) {
    console.error('Erro ao atualizar disciplina:', error)
    return null
  }
}

export async function deleteDisciplina(id: number): Promise<boolean> {
  try {
    await prisma.disciplina.delete({ where: { id } })
    return true
  } catch (error) {
    console.error('Erro ao deletar disciplina:', error)
    return false
  }
}
