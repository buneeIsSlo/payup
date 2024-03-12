import { ColumnDef } from "@tanstack/react-table";
import { FriendsAvatar } from "../Avatars";

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
    size: 50,
  },
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize flex space-x-2 items-center select-none">
        <FriendsAvatar initial={row.original.firstName[0]} />
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
];

export default columns;
