import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AvatarMd } from "./Avatars";
import { Link } from "react-router-dom";
import { PiNotePencil, PiPower } from "react-icons/pi";
import { useAuthContext } from "@/hooks/useAuthContext";
import { TUserProfileData } from "@/lib/types";
import { clearAuthCookie } from "@/lib/api-client";
import { useState } from "react";

const Header = () => {
  const { state } = useAuthContext();
  return (
    <header className="w-full px-4 pt-4 flex justify-between items-center overflow-hidden">
      <Logo />
      <div className="mb-5">
        {state.user && <DropdownMenuDemo user={state.user} />}
      </div>
    </header>
  );
};

function DropdownMenuDemo({ user }: { user: TUserProfileData }) {
  const { dispatch } = useAuthContext();
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  const logOut = async () => {
    setIsLoggingOut(true);
    await clearAuthCookie();
    dispatch({ type: "logout" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="px-2" asChild disabled={isLoggingOut}>
        <Button variant="ghost" className="py-6">
          <span className="flex items-center space-x-2">
            <AvatarMd initial={user.firstName[0]} />
            <span className="flex flex-col items-start gap-0.5">
              <span className="capitalize leading-none">
                {user.firstName + " " + user.lastName}
              </span>
              <span className="leading-none text-muted-foreground font-thin">
                {user.username}
              </span>
            </span>
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuLabel>My account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link to={"edit-info"} className="w-full flex justify-between">
              Edit Profile
              <PiNotePencil size={"1.2em"} />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="focus:bg-red-50 cursor-pointer"
            onClick={logOut}
          >
            <span className="w-full flex justify-between text-destructive">
              Log out
              <PiPower size={"1.2em"} />
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Header;
