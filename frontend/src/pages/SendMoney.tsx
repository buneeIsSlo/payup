import { useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Avatar({ initial }: { initial: string }) {
  return (
    <span className="absolute -top-[50%] translate-y-6 md:translate-y-6 lg:translate-y-5 left-[50%] -translate-x-[50%] h-14 w-14 lg:h-[4.5rem] lg:w-[4.5rem] bg-white outline outline-2 outline-primary grid place-items-center rounded-full">
      <span className="text-primary text-xl font-semibold lg:text-2xl h-full flex items-center leading-[0]">
        {initial.toLocaleUpperCase()}
      </span>
    </span>
  );
}

const SendMoney = () => {
  const { state } = useLocation();

  if (!state) {
    return (
      <main className="flex-1 h-full px-4 grid place-content-center">
        <div>
          <h1 className="text-xl">
            Please select a recipient first to send money.
          </h1>
        </div>
      </main>
    );
  }
  return (
    <main className="flex-1 px-4">
      <h1 className="text-center text-3xl font-bold py-6">Send Money</h1>
      <section className="py-6">
        <Card className="overflow-hidden w-[90%] max-w-[420px] mx-auto pb-5">
          <div className="bg-primary h-20 w-full"></div>
          <CardHeader className="text-center relative pt-7 lg:pt-9">
            <Avatar initial={state.friend.firstName[0]} />
            <CardTitle className="capitalize font-bold md:text-xl lg:text-2xl">
              {state.friend.firstName} {state.friend.lastName}
            </CardTitle>
            <CardDescription className="">
              {state.friend.username}
            </CardDescription>
          </CardHeader>
          <hr className="w-[90%] border-secondary mx-auto" />
          <CardContent className="py-4">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="amount" className="text-lg">
                  Enter Amount
                </Label>
                <Input id="amount" type="number" min="1" />
              </div>
              <Button>Send</Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default SendMoney;
