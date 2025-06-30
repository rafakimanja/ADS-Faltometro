import { getDisciplinaById } from "@/services/disciplina_service";
import { getFaltas } from "@/services/falta_service";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, context: { params: { id_disc: string } }) {
    const { id_disc } = context.params
    const idNum = Number(id_disc)

    if(isNaN(idNum)) {
        return new NextResponse("Invalid ID", {
            status: 400,
        })
    }

    const disc = getDisciplinaById(idNum)

    if(!disc){
        return new NextResponse("Disciplina não encontrada", {
            status: 404, 
        })
    }

    const faltas = getFaltas()

    const faltasDaDisc = faltas.filter((falta) => falta.disciplinaID === disc.id)

    return new NextResponse(JSON.stringify(faltasDaDisc), {
        status: 200,
    })
}