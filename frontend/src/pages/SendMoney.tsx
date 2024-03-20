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
import { toast } from "sonner";
import { AvatarLg } from "@/components/Avatars";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendMoney } from "@/lib/api-client";
import { spinnerSm } from "@/assets/images";

const SendMoney = () => {
  const { state } = useLocation();
  const [amount, setAmount] = useState<number>(0);
  const [isSending, setIsSending] = useState<boolean>(false);
  const navigate = useNavigate();

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setIsSending(true);

      const response = await sendMoney({
        amount: Math.round(Math.abs(amount)),
        to: state.friend._id,
      });
      if (response.message) {
        toast.success(response.message);
        navigate(-1);
      }
      if (response.error) {
        toast.error(response.error);
        setAmount(0);
      }
    } catch (err) {
      console.log(err);
      toast.error("Can't process payments at this moment");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <main className="flex-1 px-4">
      <h1 className="text-center text-3xl font-bold py-6">
        Send Money <span aria-hidden="true">💸</span>
      </h1>
      <section className="py-6">
        <Card className="overflow-hidden w-[90%] max-w-[420px] mx-auto pb-5">
          <div className="bg-primary h-20 w-full"></div>
          <CardHeader className="text-center relative pt-7 lg:pt-9">
            <AvatarLg initial={state.friend.firstName[0]} />
            <CardTitle className="capitalize font-bold md:text-xl lg:text-2xl">
              {state.friend.firstName} {state.friend.lastName}
            </CardTitle>
            <CardDescription className="">
              {state.friend.username}
            </CardDescription>
          </CardHeader>
          <hr className="w-[90%] border-secondary mx-auto" />
          <CardContent className="py-4">
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="amount" className="text-lg">
                    Enter Amount
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    min="1"
                    value={amount > 0 ? amount : ""}
                    required
                    onChange={(e) => setAmount(+e.target.value)}
                  />
                </div>
                {!isSending && <Button type="submit">Send</Button>}
                {isSending && (
                  <Button className="flex space-x-1" disabled>
                    <img
                      className="block"
                      src={spinnerSm}
                      alt=""
                      aria-hidden="true"
                    />
                    <span className="block">Please wait</span>
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default SendMoney;
