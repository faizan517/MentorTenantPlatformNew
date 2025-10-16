import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TableWidgetProps {
  title: string;
  headers: string[];
  data: Record<string, any>[];
  testId?: string;
}

export default function TableWidget({ title, headers, data, testId }: TableWidgetProps) {
  return (
    <Card data-testid={testId}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header, idx) => (
                <TableHead key={idx}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow key={idx} data-testid={`${testId}-row-${idx}`}>
                {headers.map((header, cellIdx) => (
                  <TableCell key={cellIdx}>
                    {row[header.toLowerCase().replace(/\s+/g, "_")]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
