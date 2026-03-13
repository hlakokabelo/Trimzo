import * as React from "react";
import FormContainer from "./FormContainer";
import UrlDisplay from "./UrlDisplay";
interface IContainerProps {}
export interface ILink {
  fullUrl: string;
  clicks: number;
  shortId: string;
}

const Container: React.FunctionComponent<IContainerProps> = () => {
  const [links, setLinks] = React.useState<ILink[]>([]);
  React.useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recentLinks") || "[]");
    setLinks(stored);
  }, []);

  return (
    <div>
      <FormContainer setLinks={setLinks} />
      <div className=" flex-col w-7/8 m-2 justify-center mt-8">
        <h2 className="text-3xl mb-2 text-slate-950">Your Recent Links:</h2>

        <div className="grid gap-2 lg:grid-cols-2 flex-wrap flex-shrink min-w-50">
          {links.map((link) => (
            <UrlDisplay
              fullUrl={link.fullUrl}
              key={link.shortId}
              clicks={link.clicks}
              shortId={link.shortId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Container;
