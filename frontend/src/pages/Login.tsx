import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/Logo";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <main className="grid place-content-center h-[100svh]">
      <div className="absolute inset-0 -z-10 h-full w-full bg-slate-50 bg-[radial-gradient(#e6e6e6_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <Card className="w-[350px]">
        <CardHeader>
          <Logo />
          <CardTitle className="text-center text-xl sm:text-2xl">
            Log In
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="coolname@mail.com"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" />
              </div>
              <Button type="submit" className="w-full">
                Log in
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p>Don't have an account?</p>
          <Button variant={"link"} className="px-1">
            <Link to={"/signup"}>Sign Up</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
};

export default Login;
