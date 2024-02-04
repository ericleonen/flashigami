import React from "react"

type ToolButtonProps = {
    Icon: React.ElementType,
    label: string,
    onClick: Trigger,
    selected: boolean
}

export default function ToolButton({ Icon, label, onClick, selected }: ToolButtonProps) {
    return (
        <button 
            {...{onClick}}
            style={selected ? {
                backgroundColor: "yellow"
            } : {}}
            className="p-2 rounded-md flex items-center border-black border-2 font-medium ml-2 hover:bg-gray-200"
        >
            <Icon/>
            <span className="ml-2">{label}</span>
        </button>
    )
}