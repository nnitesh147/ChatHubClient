import { ReactNode } from "react";
import Loader from "../Loader.jsx";

export default function Button({
  loading,
  children,
  onChange,
}: {
  loading: boolean;
  children: ReactNode;
  onChange: any;
}) {
  return (
    <div>
      <button
        className="flex items-center justify-center gap-7 bg-gray-900 p-4 rounded-lg"
        disabled={loading}
        onClick={(e) => onChange(e)}
      >
        {loading && <Loader />}
        <div>{children}</div>
      </button>
    </div>
  );
}
