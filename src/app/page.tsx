"use client"

import Paper from "@/components/Paper";
import ToolsSection from "@/components/ToolsSection";
import { useState } from "react";

export default function App() {
  const [tool, setTool] = useState<Tool>("mountain");

  return (
    <div className="w-screen h-screen flex flex-col">
      <section className="w-full p-3 flex justify-center bg-gray-100 border-b-2 border-gray-200">
        <h1 className="font-bold text-xl">
          Flashigami
        </h1>
      </section>
      <section className="w-full flex-grow flex justify-center items-center flex-col">
        <Paper {...{tool}} />
        <ToolsSection {...{tool, setTool}} />
      </section>
    </div>
  )
}