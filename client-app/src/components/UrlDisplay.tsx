import * as React from "react";
import { MdDelete } from "react-icons/md";
import CopyButton from "./CopyButton";
import type { ShortUrlData } from "../types/url.types";
import { useAuth } from "../hooks/useAuth";
import { deleteUrl } from "../services/dbServices";
import { useQueryClient } from "@tanstack/react-query";

interface IUrlDisplayProps {
  urlData: ShortUrlData;
   className?: string;
}

const UrlDisplay: React.FunctionComponent<IUrlDisplayProps> = ({ urlData,className }) => {
  const { user } = useAuth();
  const icon = `https://www.google.com/s2/favicons?domain=${urlData.fullUrl}&sz=32`;
  const shortLink = window.location.origin + "/" + urlData.shortId;
  const canEdit = user ? true : false;
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    const { success } = await deleteUrl(urlData._id);

    if (success) {
      queryClient.invalidateQueries({ queryKey: ["myUrls"] });
    }
  };

  return (
    <div className=
    {`${className || ""} bg-slate-300 w-full border rounded-lg shadow-md p-3 flex flex-row sm:flex-row sm:items-center sm:justify-between gap-3`}>
      {/* left section */}
      <div className="flex items-center gap-3 flex-1 w-1 sm:min-w-0">
        <img src={icon} alt="favicon" className="w-6 h-6" />

        <div className="min-w-0">
          <a
            className="cursor-pointer text-blue-700 break-all"
            href={shortLink}
          >
            {shortLink}
          </a>

          <p className="truncate text-pink-700 text-sm">{urlData.fullUrl}</p>
        </div>
      </div>

      {/* right section */}
      <div className="flex items-center gap-4 justify-between sm:justify-end">
        {canEdit && (
          <button
            className="cursor-pointer hover:text-red-600"
            onClick={handleDelete}
          >
            <MdDelete size={20} />
          </button>
        )}

        {/*{canEdit && (
          <button
            className="cursor-pointer hover:text-blue-600"
            onClick={() => {
              alert("coming soon");
            }}
          >
            <MdModeEdit size={20} />
          </button>
        )} */}

        <CopyButton textToCopy={shortLink} />
        {canEdit && (
          <div className="text-center text-slate-800 text-sm hidden sm:block">
            clicks <br /> {urlData.clicks}
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlDisplay;
