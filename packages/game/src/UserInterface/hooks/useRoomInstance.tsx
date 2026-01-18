import { useEffect, useState } from "react";
import { clientInstance } from "../..";

export function useRoomInstance() {
  const [room, setRoom] = useState(clientInstance.roomInstance);

  useEffect(() => {
    return clientInstance.subscribe(setRoom);
  }, [clientInstance]);

  return room;
}