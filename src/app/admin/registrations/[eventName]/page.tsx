import { events } from "@/server/db/schema";
import { api } from "@/trpc/server";
import { notFound } from "next/navigation";

export default async function EventNamePage({
  params: { eventName },
}: {
  params: {
    eventName: string;
  };
}) {
  if (!events.enumValues.includes(eventName as events)) {
    return notFound();
  }
  const entry = await api.registration.getRegistrationByEvent.query(
    eventName as events,
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-[url(/bg.jpg)] bg-cover bg-center bg-no-repeat p-12">
      {entry.length === 0 ? (
        <span className="text-2xl font-bold text-white">No registrations</span>
      ) : (
        <div className="w-full overflow-x-auto rounded">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  College
                </th>
                <th scope="col" className="px-6 py-3">
                  Department
                </th>
                <th scope="col" className="px-6 py-3">
                  Contact
                </th>
              </tr>
            </thead>
            <tbody>
              {entry.map((data) => (
                <tr
                  className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={data.registration.userId + "-" + data.registration.event}
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    {data.user?.name}
                  </th>
                  <td className="px-6 py-4">{data.user?.college}</td>
                  <td className="px-6 py-4">{data.user?.department}</td>
                  <td className="px-6 py-4">{data.user?.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
