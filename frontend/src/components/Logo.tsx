import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className="text-primary text-3xl font-bold flex gap-1 justify-center"
    >
      <span
        aria-hidden="true"
        className="h-0 w-0 mb-5 border-b-[30px] border-l-[20px] border-r-[20px] border-b-primary border-l-transparent border-r-transparent"
      ></span>
      PayUp
    </Link>
  );
};

export default Logo;
