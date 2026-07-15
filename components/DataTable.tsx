import type { ReactNode } from "react";

type DataColumn<T> = {
  key: keyof T;
  label: string;
  render?: (row: T) => ReactNode;
};

type DataTableProps<T extends Record<string, unknown>> = {
  columns: DataColumn<T>[];
  rows: T[];
  page: number;
  totalPages: number;
  onPage: (page: number) => void;
};

export function DataTable<T extends Record<string, unknown>>({
  columns,
  rows,
  page,
  totalPages,
  onPage,
}: DataTableProps<T>) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={String(column.key)}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={String(column.key)}>
                  {column.render ? column.render(row) : String(row[column.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <nav aria-label="Pagination">
        <button type="button" onClick={() => onPage(page - 1)} disabled={page <= 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button type="button" onClick={() => onPage(page + 1)} disabled={page >= totalPages}>
          Next
        </button>
      </nav>
    </div>
  );
}
