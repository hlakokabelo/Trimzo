import * as React from 'react';

interface IFooterProps {
}

const Footer: React.FunctionComponent<IFooterProps> = () => {
  return(
    <div className="bg-slate-900 text-white text-base text-center py-5 absolute bottom-0 w-full">
        Copyright &#169; URLShortner | Kabelo Industries
    </div>
  )
};

export default Footer;
