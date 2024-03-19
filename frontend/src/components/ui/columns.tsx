import { ColumnDef } from "@tanstack/react-table";
import { AvatarSm } from "../Avatars";
import { Link } from "react-router-dom";
import { Button } from "./button";
import { PiArrowLineUpRight } from "react-icons/pi";

export type User = {
  firstName: string;
  lastName: string;
  username: string;
  _id: string;
};

const columns: ColumnDef<User>[] = [
  {
    id: "index",
    header: "No.",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize flex space-x-2 items-center select-none">
        <AvatarSm initial={row.original.firstName[0]} />
        <span className="max-w-[100px] truncate">
          {row.original.firstName + " " + row.original.lastName}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "username",
    header: "Email",
    cell: ({ row }) => (
      <div className="">
        <span>{row.original.username}</span>
      </div>
    ),
  },
  {
    id: "send",
    cell: ({ row }) => (
      <div>
        <Button variant={"link"}>
          <Link
            to={"send"}
            state={{ friend: row.original }}
            className="flex space-x-0 items-center"
          >
            <span className="leading-[0]">Send Money</span>
            <PiArrowLineUpRight size={"1.2em"} />
          </Link>
        </Button>
      </div>
    ),
  },
];

export default columns;
