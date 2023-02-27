import * as React from "react";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  type Person = {
    name: string;
    age: number;
  };

  const defaultData: Person[] = [
    { name: "hugo", age: 21 },
    { name: "damian", age: 92 },
    { name: "brian", age: 237 },
    { name: "elma", age: 19 },
    { name: "megan", age: 27 },
  ];
  const [data, setData] = React.useState(() => [...defaultData]);

  const ch = createColumnHelper<Person>();
  const columns = [
    ch.accessor("name", {
      cell: (info) => info.getValue(),
    }),
    ch.accessor("age", {
      cell: (info) => info.getValue,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <main className={styles.main}>
      <h1>HELLO WORLD</h1>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
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
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
