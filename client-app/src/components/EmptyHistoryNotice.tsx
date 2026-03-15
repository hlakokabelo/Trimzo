import { FiInfo } from "react-icons/fi";

export default function EmptyHistoryNotice() {
  return (
    <div className="w-full bg-slate-200 border border-slate-300 text-slate-800 rounded-md px-4 py-3 flex items-center gap-2">
      <FiInfo className="text-slate-700" />
      <span className="text-sm font-medium">
        No links yet in your history
      </span>
    </div>
  );
}