"use server";

import { isMatch } from "date-fns";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import TimeSelect from "./_components/time-select";

interface HomeProps {
  searchParams: { month: string };
}

export default async function HomePage({ searchParams: { month } }: HomeProps) {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  const monthIsInvalid = !month || !isMatch(month, "MM");

  if (monthIsInvalid) {
    redirect(`?month=${new Date().getMonth() + 1}`);
  }

  return (
    <>
      <Navbar />
      <div className="flex h-full flex-col space-y-6 overflow-hidden p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-3">
            <TimeSelect />
          </div>
        </div>
        <div className="grid h-full grid-cols-[2fr,1fr] gap-6 overflow-hidden">
          <div className="flex flex-col gap-6 overflow-hidden">
            {/* CARDS DE RESUMO DOS PRODUTOS */}
            <div className="grid h-full grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
              {/* GRÁFICOS  */}
            </div>
          </div>
          {/* TABELA DE ULTIMAS VENDAS */}
        </div>
      </div>
    </>
  );
}
