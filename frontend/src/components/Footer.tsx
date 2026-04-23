import { appName } from "../utils/appName.ts";

const Footer = () => {
  const github="https://github.com/hlakokabelo/url-shortner"
  return (
    <footer className="border-t bg-slate-200 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-700">
        
        <p>
          © {new Date().getFullYear()} {appName}
        </p>

        <p className="text-center">
          Built with React • Node • TypeScript
        </p>

        <a
          href={github}
          target="_blank"
          className="hover:text-blue-600"
        >
          GitHub
        </a>

      </div>
    </footer>
  );
};

export default Footer;