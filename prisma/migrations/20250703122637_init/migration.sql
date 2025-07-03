-- CreateTable
CREATE TABLE "Disciplina" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "creditos" INTEGER NOT NULL,
    "aulas" INTEGER NOT NULL,

    CONSTRAINT "Disciplina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Falta" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "periodosFaltados" INTEGER NOT NULL,
    "disciplinaID" INTEGER NOT NULL,

    CONSTRAINT "Falta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Falta" ADD CONSTRAINT "Falta_disciplinaID_fkey" FOREIGN KEY ("disciplinaID") REFERENCES "Disciplina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
