import * as React from "react";
import FormContainer from "../components/FormContainer";
import type { ShortUrlData } from "../types/url.types";
import { useMyUrls } from "../hooks/useMyUrls";
import UrlListDisplay from "../components/UrlListDisplay";
import EmptyHistoryNotice from "../components/EmptyHistoryNotice";
import { useAuthStore } from "../stores/authStore";

const LinksPage: React.FunctionComponent = () => {
  const { authUser } = useAuthStore();

  const { data: cloudUrls = [] } = useMyUrls(!!authUser);

  const [links, setLinks] = React.useState<ShortUrlData[]>([]);

  React.useEffect(() => {
    if (!authUser) {
      const stored = JSON.parse(localStorage.getItem("guestUrls") || "[]");
      setLinks(stored);
    }
  }, [authUser]);

  const urls = authUser ? cloudUrls : links;

  return (
    <div>
      <FormContainer setLinks={setLinks} isLoggedIn={!!authUser} />

      <div className="flex-col w-7/8 m-2 justify-center mt-8">
        <h2 className="text-3xl mb-2 text-slate-950">Your Recent Links:</h2>
        {urls.length !== 0 ? (
          <UrlListDisplay urls={urls} />
        ) : (
          <EmptyHistoryNotice />
        )}
      </div>
    </div>
  );
};

export default LinksPage;
