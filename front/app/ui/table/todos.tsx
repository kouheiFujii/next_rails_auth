import { getTodos } from "@/app/lib/api";

export const TodosTable = async () => {
  const { data: todos } = await getTodos();
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            ID
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Title
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Completed
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {todos && todos.length > 0 ? (
          todos.map((todo) => (
            <tr key={todo.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {todo.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {todo.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {todo.completed ? "Yes" : "No"}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={3}
              className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
            >
              No data
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};