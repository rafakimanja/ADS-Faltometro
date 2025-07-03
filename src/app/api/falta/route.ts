import { getDisciplinaById } from "@/services/disciplina_service";
import { createFalta, getFaltas } from "@/services/falta_service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = new URL(req.url)
    const id_disc = url.searchParams.get('disciplina')
    const idNum = Number(id_disc)

    if (!id_disc) {
        return new NextResponse(JSON.stringify({ error: "Parâmetro 'disciplina' é obrigatório" }), 
            { status: 400 }
        )
    }

    if(isNaN(idNum)) {
        return new NextResponse(JSON.stringify({ error: "Invalid ID" }), 
            { status: 400 }
        )
    }

    const disc = await getDisciplinaById(idNum)

    if(!disc){
        return new NextResponse(JSON.stringify({ error: "Disciplina não encontrada" }), 
            { status: 404 }
        )
    }

    const faltas = await getFaltas()

    const faltasDaDisc = faltas.filter((falta) => falta.disciplinaID === disc.id)

    return new NextResponse(JSON.stringify(faltasDaDisc), { status: 200 })
}

export async function POST(req: NextRequest) {
    const body = await req.json()

    const resp = await createFalta(body)

    if(resp)
        return new NextResponse(JSON.stringify({ message: 'Falta registrada com sucesso'}), { status: 201 })
    else
        return new NextResponse(JSON.stringify({ error: 'Erro ap registrar falta'}), { status: 500 })
}