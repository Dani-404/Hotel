import "./DimmerDialogSlider.css";

export type DimmerDialogSliderProps = {
    value: number;
    onChange: (value: number) => void;
}

export default function DimmerDialogSlider({ value, onChange }: DimmerDialogSliderProps) {
    return (
        <div className="dimmer-dialog-slider">
            <input type="range" min="1" max="100" value={value} onChange={(event) => onChange(parseInt((event.target as HTMLInputElement).value))}/>
        </div>
    );
}
