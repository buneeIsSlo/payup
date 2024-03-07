import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="container min-h-[100dvh] grid place-content-center">
      <div className="flex flex-col py-6 lg:py-8">
        <h1 className="text-4xl font-bold mx-auto lg:text-8xl">404</h1>
        <p className="text-base text-muted-foreground mx-auto lg:text-2xl">
          Sorry, this page does not exist.
        </p>
      </div>
      <Button variant={"outline"} className="w-fit mx-auto">
        <Link to={"/"}>Go Home</Link>
      </Button>
    </main>
  );
};

export default NotFound;
