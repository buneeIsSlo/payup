import DataTable from "@/components/ui/data-table";
import columns from "@/components/ui/columns";
import { Input } from "@/components/ui/input";
import { fetchUsers } from "@/lib/api-client";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounceValue";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const debounceSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    async function getUsers() {
      const response =
        debounceSearch === ""
          ? await fetchUsers()
          : await fetchUsers(debounceSearch);

      if (response.user) {
        setUsers(response.user);
      }
      return;
    }

    getUsers();
  }, [debounceSearch]);

  return (
    <main className="flex-1 h-full px-4">
      <div className="">
        <div className="flex justify-between items-end py-6">
          <div className="min-w-[50%]">
            <Input
              type="text"
              placeholder="Find friends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="text-right">
            <span className="capitalize text-slate-400 text-sm">
              your balance:
            </span>
            <h1 className="text-4xl font-semibold leading-none">$5000</h1>
          </div>
        </div>
        {users && <DataTable columns={columns} data={users} />}
      </div>
    </main>
  );
};

export default Dashboard;
