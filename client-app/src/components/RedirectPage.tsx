import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUrl } from "../services/dbServices.ts";

interface IRedirectPageProps {}

const RedirectPage: React.FunctionComponent<IRedirectPageProps> = () => {
  const { shortUrl } = useParams();
  const navigate = useNavigate();
  React.useEffect(() => {
    const run = async () => {
      const { data } = await getUrl(shortUrl!);

      if (!data) {
        navigate("/404");
        return;
      }
      console.log(data);
      window.location.href = data.fullUrl;
    };

    run();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

      <p className="mt-6 text-black text-lg">
        Redirecting you to your destination...
      </p>
    </div>
  );
};

export default RedirectPage;
