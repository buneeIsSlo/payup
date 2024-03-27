import DataTable from "@/components/ui/data-table";
import columns from "@/components/ui/columns";
import { Input } from "@/components/ui/input";
import { fetchBalance, fetchUsers } from "@/lib/api-client";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounceValue";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debounceSearch = useDebounce(searchQuery, 500);
  const [balance, setBalance] = useState<number>(0);
  const [isFetchingBalance, setIsFetchingBalance] = useState<boolean>(false);

  useEffect(() => {
    async function getUsers() {
      const response =
        debounceSearch === ""
          ? await fetchUsers()
          : await fetchUsers(debounceSearch);

      if (response.users) {
        setUsers(response.users);
      }
      return;
    }

    getUsers();
  }, [debounceSearch]);

  useEffect(() => {
    async function getBalance() {
      try {
        setIsFetchingBalance(true);
        const response = await fetchBalance();
        if (response.balance) {
          setBalance(response.balance);
        }
      } catch (err) {
        toast.error("Failed to load bank balance");
        console.error(err);
      } finally {
        setIsFetchingBalance(false);
      }
    }

    getBalance();
  }, []);

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
          <div className="text-right w-[15%]">
            <span className="capitalize text-slate-400 text-sm">
              your balance:
            </span>
            {isFetchingBalance ? (
              <Skeleton className="w-full h-10" />
            ) : (
              <h1 className="text-4xl font-semibold leading-none">
                {`$${balance.toLocaleString("en-US")}`}
              </h1>
            )}
          </div>
        </div>
        {users && <DataTable columns={columns} data={users} />}
      </div>
    </main>
  );
};

export default Dashboard;
