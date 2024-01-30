import React from "react"

type ToolButtonProps = {
    Icon: React.ElementType,
    label: string,
    onClick: Trigger
}

export default function ToolButton({ Icon, label, onClick }: ToolButtonProps) {
    return (
        <button className="p-2 rounded-md flex items-center border-black border-2 font-medium ml-2 hover:bg-gray-200">
            <Icon/>
            <span className="ml-2">{label}</span>
        </button>
    )
}