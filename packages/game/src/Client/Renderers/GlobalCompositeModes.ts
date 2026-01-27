export function getGlobalCompositeModeFromInkNumber(ink: number): GlobalCompositeOperation | undefined {
    switch(ink) {
        case 33: // ADD
            return "lighter";

        default:
            console.warn(`Ink number ${ink} is not recognized.`);

            return undefined;
    }
}

export function getGlobalCompositeModeFromInk(ink?: string): GlobalCompositeOperation | undefined {
    switch(ink) {
        case "ADD":
            return "lighter";

        case "SUBTRACT":
            return "luminosity";

        case "COPY":
            return "source-over";

        case undefined:
            return undefined;

        case "scrn":
            return "screen";

        default:
            console.warn(`Ink mode ${ink} is not recognized.`);

            return undefined;
    }
}
