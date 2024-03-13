import { Spinner } from "../Icons";

export interface TableProps {
  columns: TableColumns[];
  rows: TableRows[];
  isLoading?: boolean;
}

interface TableRows {
  [key: string]: any;
}

interface TableColumns {
  field: string;
  label: string;
  width: string;
}

export const Table = ({ columns, rows, isLoading = false }: TableProps) => {
  return (
    <div className="overflow-x-auto my-8 sm:my-0 overflow-y-hidden">
      <table>
        <thead>
          <tr className="bg-white bg-opacity-5 rounded-full">
            {columns.map(({ width, label }, idx) => {
              return (
                <th style={{ width }} key={idx}>
                  {label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            return (
              <tr key={idx}>
                {columns.map(({ field }, idx) => (
                  <td key={idx}>{row[field]}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {isLoading && (
        <div className="flex justify-center mt-8">
          <Spinner width={48} height={48} />
        </div>
      )}
    </div>
  );
};
