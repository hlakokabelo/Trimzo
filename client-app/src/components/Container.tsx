import * as React from "react";
import FormContainer from "./FormContainer";
import type { ShortUrlData } from "../types/url.types";
import { useMyUrls } from "../hooks/useMyUrls";
import { useAuth } from "../hooks/useAuth"; // assuming this exists
import UrlListDisplay from "./UrlListDisplay";

const Container: React.FunctionComponent = () => {
  const { user } = useAuth();

  const { data: cloudUrls = [] } = useMyUrls(!!user);

  const [links, setLinks] = React.useState<ShortUrlData[]>([]);

  React.useEffect(() => {
    if (!user) {
      const stored = JSON.parse(localStorage.getItem("guestUrls") || "[]");
      setLinks(stored);
    }
  }, [user]);

  const urls = user ? cloudUrls : links;

  return (
    <div>
      <FormContainer setLinks={setLinks} isLoggedIn={!!user} />

      <div className="flex-col w-7/8 m-2 justify-center mt-8">
        <h2 className="text-3xl mb-2 text-slate-950">Your Recent Links:</h2>
        <UrlListDisplay urls={urls} />
      </div>
    </div>
  );
};

export default Container;
