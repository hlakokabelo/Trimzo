import * as React from "react";
import type { ShortUrlData } from "../types/url.types";
import UrlDisplay from "./UrlDisplay";

interface IUrlListDisplayProps {
  urls: ShortUrlData[];
}

const UrlListDisplay: React.FunctionComponent<IUrlListDisplayProps> = ({
  urls,
}) => {
  const [page, setPage] = React.useState<number>(1);
  const items: number = 6;
  let maxPage = Math.ceil(urls.length / items); //show 6 urls per page
  if (urls.length === 0) maxPage = 1;
  const handlePreviousPage = () => {
    if (page === 1) return;

    setPage((prev) => prev - 1);
  };
  const handleNextPage = () => {
    if (page === maxPage) return;
    setPage((prev) => prev + 1);
  };

  return (
    <div>
      <div className="grid gap-2 lg:grid-cols-2 min-w-50">
        {urls.slice((page - 1) * items, items * page).map((link) => (
          <UrlDisplay
            urlData={link}
            className={
              urls.slice((page - 1) * items, items * page).length === 1
                ? "col-span-2"
                : ""
            }
            key={link.shortId}
          />
        ))}
      </div>

      <div className="flex flex-row gap-3 justify-end pt-1">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className={`border rounded-xl text-lg border-blue-700 px-2 ${page === 1 ? "opacity-60" : "hover:bg-blue-400 cursor-pointer"}`}
        >
          prev
        </button>
        <button
          onClick={handleNextPage}
          disabled={page === maxPage}
          className={`border rounded-xl text-lg text-black border-blue-700 px-2 ${page === maxPage ? "opacity-60" : "hover:bg-blue-400 cursor-pointer"}`}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default UrlListDisplay;
