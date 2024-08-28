import Loader from "@/components/Loader.jsx";

import { useContext, useEffect, useState } from "react";

import { StateContext } from "../Main.jsx";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation.js";

export default function Page() {
  const router = useRouter();
  const [loading, setloading] = useState(true);
  const { userId } = useAuth();
  const { socket } = useContext(StateContext);

  useEffect(() => {
    const check = async () => {
      socket.current.emit("logout", userId);
    };
    check();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return <></>;
}
