import Image from "next/image";
import { logo } from "../../context/constants.js";

export default function Logo() {
  return (
    <div className="flex items-center gap-1 p-2">
      <Image
        src={logo}
        alt=""
        height={30}
        width={40}
        className="rounded-full"
      />
      <h1>ChatHub</h1>
    </div>
  );
}
