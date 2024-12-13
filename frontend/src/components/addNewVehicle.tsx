import { SERVER_BASE_URL } from "@/utils";
import React from "react";
import { Link, useNavigate } from "react-router";
import useSWRMutation from "swr/mutation";

type IVehicle = {
  _id?: string;
  name: string;
  status: string;
  lastUpdated: Date;
};

export const AddNewVehicle: React.FC = () => {
  const nagivate = useNavigate();
  const { trigger: addVehicle, isMutating } = useSWRMutation(
    `${SERVER_BASE_URL}/api/vehicles/add`,
    async (_: string, { arg }: { arg: IVehicle }) => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return fetch(`${SERVER_BASE_URL}/api/vehicles/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arg),
      });
    }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const status = formData.get("status") as string;
    const lastUpdated = new Date();
    const newVehicle: IVehicle = {
      name,
      status,
      lastUpdated,
    };
    try {
      const response = await addVehicle(newVehicle);
      if (response.ok) {
        return nagivate("/");
      }
      if (!response.ok) throw new Error("Failed to add vehicle");
    } catch (error) {
      const message = (error as Error).message;
      alert(message);
      console.error("Error adding vehicle:", error);
    }
  };

  return (
    <div className="bg-white flex flex-col justify-center items-center h-dvh   rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Add New Vehicle</h2>
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Name"
            name="name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="status"
          >
            Status
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="status"
            name="status"
          >
            <option value="active">Active</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div className="flex items-center justify-between space-x-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {isMutating ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Adding...
              </div>
            ) : (
              "Add Vehicle"
            )}
          </button>
          <Link to="/">
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Back to List
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};
