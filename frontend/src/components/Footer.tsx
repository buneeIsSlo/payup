import { PiLinkedinLogo, PiGithubLogo } from "react-icons/pi";

const Footer = () => {
  return (
    <footer className="w-full">
      <hr className="bg-primary-foreground" />
      <div className="py-2 px-4 flex justify-between">
        <p className="text-sm text-muted-foreground">
          All rights reserved to PayUp.
        </p>
        <span className="flex space-x-3 color:green">
          <a href="https://github.com/buneeIsSlo/payup" target="_blank">
            <PiGithubLogo size={"1.5em"} color="#404040" />
          </a>
          <a href="https://www.linkedin.com/in/bunee-dev/" target="_blank">
            <PiLinkedinLogo size={"1.5em"} color="#404040" />
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
