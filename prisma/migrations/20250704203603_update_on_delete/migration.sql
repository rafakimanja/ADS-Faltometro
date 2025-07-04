-- DropForeignKey
ALTER TABLE "Falta" DROP CONSTRAINT "Falta_disciplinaID_fkey";

-- AddForeignKey
ALTER TABLE "Falta" ADD CONSTRAINT "Falta_disciplinaID_fkey" FOREIGN KEY ("disciplinaID") REFERENCES "Disciplina"("id") ON DELETE CASCADE ON UPDATE CASCADE;
