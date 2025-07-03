import type { FaltaDTO } from "@/@types/faltaDTO"; 
import { prisma } from "@/db/conector";

export async function createFalta(falta: FaltaDTO): Promise<boolean> {
    try{
        await prisma.falta.create({
            data: {
                data: falta.data,
                periodosFaltados: falta.periodosFaltados,
                disciplinaID: falta.disciplinaID
            },
        })
        return true
    } catch(err) {
        console.error("Erro ao criar a falta: ", err)
        return false
    }
}

export async function getFaltas(): Promise<FaltaDTO[]>{
    return prisma.falta.findMany({
        select: {
            id: true,
            data: true,
            periodosFaltados: true,
            disciplinaID: true
        }
    })
}

export async function getFaltaById(id: number): Promise<FaltaDTO | null> {
    return await prisma.falta.findUnique({
        where: { id },
        select: {
            id: true,
            data: true,
            periodosFaltados: true,
            disciplinaID: true
        }
    })
}

export async function updateFalta(id: number, falta: FaltaDTO): Promise<FaltaDTO | null>{
    try{
        const updated = await prisma.falta.update({
            where: { id },
            data: {
                data: falta.data,
                periodosFaltados: falta.periodosFaltados,
            },
            select: {
                id: true,
                data: true,
                periodosFaltados: true,
                disciplinaID: true
            }
        })

        return updated
    } catch (error) {
        console.error('Erro ao atualizar a falta: ', error)
        return null
    }
}

export async function deleteFalta(id: number): Promise<boolean> {
    try{
        await prisma.falta.delete({ where: { id } })
        return true
    } catch (error) {
        console.error('Erro ao excluir a falta: ', error)
        return false
    }
}