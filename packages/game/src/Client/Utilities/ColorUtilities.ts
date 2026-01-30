export function hexToRgb(hex: string) {
    if(hex[0] === '#') {
        hex = hex.slice(1);
    }

    const bigint = parseInt(hex, 16);
    const red = (bigint >> 16) & 255;
    const green = (bigint >> 8) & 255;
    const blue = bigint & 255;

    return {
        red, green, blue
    };
}