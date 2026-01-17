import { CSSProperties, useEffect, useRef, useState } from "react";
import RoomFurnitureRenderer, { RoomFurnitureRendererOptions } from "@Client/Room/RoomFurnitureRenderer";

export type RoomRendererProps = {
    style?: CSSProperties;
    options?: RoomFurnitureRendererOptions;
    furnitureData?: {
        type: string;
        size?: number;
        direction?: number;
        animation?: number;
        color?: number;
    };
};

export default function RoomRenderer({ style, options, furnitureData }: RoomRendererProps) {
    const roomRef = useRef<HTMLDivElement>(null);
    const roomRendererRequested = useRef<boolean>(false);
    const [roomFurnitureRenderer, setRoomFurnitureRenderer] = useState<RoomFurnitureRenderer>();

    useEffect(() => {
        if(!roomRef.current) {
            return;
        }

        if(roomRendererRequested.current) {
            return;
        }

        roomRendererRequested.current = true;

        setRoomFurnitureRenderer(
            new RoomFurnitureRenderer(roomRef.current, options ?? {})
        );
    }, [roomRef]);

    useEffect(() => {
        if(!roomFurnitureRenderer || !furnitureData) {
            return;
        }

        roomFurnitureRenderer.setFurniture(furnitureData.type, furnitureData.size ?? 64, furnitureData.direction, furnitureData.animation ?? 0, furnitureData.color ?? 0);
    }, [roomFurnitureRenderer, furnitureData]);

    useEffect(() => {
        if(!roomFurnitureRenderer) {
            return;
        }

        return () => {
            roomFurnitureRenderer.terminate();
        };
    }, [roomFurnitureRenderer]);

    return (
        <div ref={roomRef} style={style}/>
    );
}
