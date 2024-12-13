import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Link } from "react-router";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { useDebouncedCallback } from "use-debounce";
import { SERVER_BASE_URL } from "../utils";
import { useRef } from "react";

type IVehicle = {
  _id: string;
  name: string;
  status: string;
  lastUpdated: Date;
};

const columnHelper = createColumnHelper<IVehicle>();
const fetcher = (_args: Parameters<typeof fetch>) =>
  fetch(`${SERVER_BASE_URL}/api/vehicles/all`).then((res) => res.json());

function ViewVehicles() {
  const randomKey = useRef(new Date());

  const {
    data: response,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<{ status: boolean; data: IVehicle[] }>(
    [`${SERVER_BASE_URL}/api/vehicles/all`, randomKey],
    fetcher,
    {
      keepPreviousData: false,
      revalidateOnFocus: true,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
    }
  );

  const { trigger, isMutating } = useSWRMutation(
    `${SERVER_BASE_URL}/api/vehicles/update`,
    async (
      url,
      { arg }: { arg: { id: string; name: string; status: string } }
    ) => {
      const response = await fetch(`${url}/${arg.id}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: arg.name,
          status: arg.status,
        }),
      });
      if (response.ok) {
        await mutate();
      }
      return response;
    }
  );

  const debouncedTrigger = useDebouncedCallback(trigger, 500);

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <select
          defaultValue={info.getValue()}
          onChange={async (e) => {
            await debouncedTrigger({
              id: info.row.original._id,
              name: info.row.original.name,
              status: e.target.value,
            });
          }}
          className="border px-2 py-1 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="active">Active</option>
          <option value="pending">Pending</option>
        </select>
      ),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("lastUpdated", {
      header: "Last Updated",
      cell: (info) => {
        const date = new Date(info.getValue());
        return new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }).format(date);
      },

      footer: (info) => info.column.id,
    }),
  ];

  const table = useReactTable({
    data: response?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (error) return <div>failed to load</div>;
  if (isLoading || isValidating) return <div>loading...</div>;

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="text-right">
        <Link
          to="/add"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Vehicle
        </Link>
      </div>
      {isMutating && (
        <div className="animate-pulse text-center text-gray-500">
          <span className="font-bold">updating...</span>
        </div>
      )}
      <table className="table w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-100">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 text-left font-sans text-lg font-bold tracking-wide"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="bg-white hover:bg-gray-50 focus-within:bg-gray-100 border-t border-b border-gray-200"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 text-sm font-sans">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewVehicles;
