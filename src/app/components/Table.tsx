import clsx from "clsx";

interface HeaderDefinition {
  id: string;
  label: string;
  class?: string;
}

interface Content {
  columns: string[];
  class?: string;
}

interface TableProps {
  id: string;
  header: HeaderDefinition[];
  content: Content[];
  stickyFirstColumn?: boolean;
  stickyLastColumn?: boolean;
  stickyHeader?: boolean;
  bgContent?: string;
  bgHeader?: string;
}
export default function Table({
  id,
  header = [
    { label: "header1", id: "header1" },
    { label: "header2", id: "header2" },
    { label: "header3", id: "header3" },
  ],
  stickyFirstColumn = false,
  stickyLastColumn = false,
  stickyHeader = false,
  bgContent = "bg-white",
  bgHeader = "bg-gray-200",
  content = [
    {
      columns: ["col1", "col2", "col3"],
    },
    {
      columns: ["col1", "col2", "col3"],
    },
    {
      columns: ["col1", "col2", "col3"],
    },
  ],
}: TableProps) {
  return (
    <table id={id} className="table-auto whitespace-nowrap">
      <thead>
        <tr>
          {header.map((item, index) => (
            <th
              key={item.id}
              className={clsx(item.class, "p-3", "text-center", bgHeader, {
                "sticky left-0 z-20": index === 0 && stickyFirstColumn,
                "sticky top-0 z-10": stickyHeader,
                "sticky right-0":
                  index === header.length - 1 && stickyLastColumn,
              })}
            >
              {item.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {content.map((item, _indexTr) => (
          <tr key={item.columns[0]}>
            {item.columns.map((col, index) => (
              <td
                key={col}
                className={clsx(item.class, bgContent, "p-3", "text-center", {
                  "sticky left-0": index === 0 && stickyFirstColumn,
                  "sticky right-0":
                    index === item.columns.length - 1 && stickyLastColumn,
                })}
              >
                {col}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
