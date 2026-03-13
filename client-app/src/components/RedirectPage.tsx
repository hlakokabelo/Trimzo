import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUrl } from "../util/dbServices";
import LinkNotFound from "./LinkNotFound";

interface IRedirectPageProps {}

const RedirectPage: React.FunctionComponent<IRedirectPageProps> = () => {
  const { shortUrl } = useParams();
  const [urlData, setUrlData] = React.useState<string>("");
  const navigate = useNavigate();
  React.useEffect(() => {
    const run = async () => {
      const data = await getUrl(shortUrl!);

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

      {/* Text */}
      <p className="mt-6 text-gray-600 text-sm">
        Redirecting you to your destination...
      </p>
    </div>
  );
};

export default RedirectPage;
