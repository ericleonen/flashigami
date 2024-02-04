import ToolButton from "./ToolButton";

const MountainIcon = () => <span>^</span>;
const ValleyIcon = () => <span>v</span>;
const EraserIcon = () => <span>x</span>;

type ToolSelectionProps = {
    tool: Tool,
    setTool: React.Dispatch<React.SetStateAction<Tool>>
}

export default function ToolsSection({ tool, setTool }: ToolSelectionProps) {
    return (
        <div className="flex items-center rounded-md mt-6 pr-2">
            <ToolButton 
                Icon={MountainIcon}
                label="Mountain creaser"
                onClick={() => setTool("mountain")}
                selected={tool === "mountain"}
            />
            <ToolButton 
                Icon={ValleyIcon}
                label="Valley creaser"
                onClick={() => setTool("valley")}
                selected={tool === "valley"}
            />
            <ToolButton 
                Icon={EraserIcon}
                label="Eraser"
                onClick={() => setTool("eraser")}
                selected={tool === "eraser"}
            />
        </div>
    )
}