import * as React from "react";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import CopyButton from "./CopyButton";
interface IUrlDisplayProps {
  fullUrl: string;
  clicks: number;
  shortId: string;
}

const UrlDisplay: React.FunctionComponent<IUrlDisplayProps> = ({
  fullUrl,
  clicks,
  shortId,
}) => {
  const icon = `https://www.google.com/s2/favicons?domain=${fullUrl}&sz=32`;

  return (
    <div className="bg-slate-300  grid w-full grid-cols-6 gap-0 items-center border rounded-lg shadow-md">
      <div className="flex justify-center">
        <img src={icon} alt="image" />
      </div>{" "}
      <div className="text-justify col-span-3 m-0">
        <a className="cursor-pointer" href={window.location.href + shortId}>
          {window.location.href}
          {shortId}
        </a>
        <p className="text-ellipsis text-nowrap overflow-hidden text-pink-700">
          {fullUrl}
        </p>
      </div>
      <div className="flex gap-4 ml-9">
        <p
          className="cursor-pointer pt-3"
          onClick={() => {
            alert("del");
          }}
        >
          <MdDelete />
        </p>
        <p
          className="cursor-pointer justify-center pt-3 hidden sm:block"
          onClick={() => {}}
        >
          <MdModeEdit />
        </p>
        <div className="flex justify-center">
          <CopyButton textToCopy={window.location.href + shortId} />
        </div>
        <div className="text-center pl-6 text-slate-800">
          clicks <br /> {clicks}
        </div>
      </div>
    </div>
  );
};

export default UrlDisplay;
