const DISPLAY_DIMS = 500;
const RESOLUTION_DIMS = 1000;

export default function Paper() {
    return (
        <canvas
            style={{
                height: `${DISPLAY_DIMS}px`,
                width: `${DISPLAY_DIMS}px`
            }}
            height={RESOLUTION_DIMS}
            width={RESOLUTION_DIMS}
            className="border-2 border-gray-200"
        />
    )
}