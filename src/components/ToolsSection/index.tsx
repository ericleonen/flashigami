import ToolButton from "./ToolButton";

const MountainIcon = () => <span>^</span>;
const ValleyIcon = () => <span>v</span>;
const EraserIcon = () => <span>x</span>;

export default function ToolsSection() {
    return (
        <div className="flex items-center rounded-md mt-6 pr-2">
            <ToolButton 
                Icon={MountainIcon}
                label="Mountain creaser"
                onClick={() => {}}
            />
            <ToolButton 
                Icon={ValleyIcon}
                label="Valley creaser"
                onClick={() => {}}
            />
            <ToolButton 
                Icon={EraserIcon}
                label="Eraser"
                onClick={() => {}}
            />
        </div>
    )
}