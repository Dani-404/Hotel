import { useEffect, useState } from "react";
import { clientInstance } from "../..";

export function useUser() {
  const [user, setUser] = useState(clientInstance.user.value);

  useEffect(() => {
    return clientInstance.user.subscribe(setUser);
  }, []);

  return user;
}
