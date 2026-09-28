import { getDashboard } from "../data";

// Registrations as CSV (UTF-8 with BOM so Excel shows Cyrillic correctly).
export async function GET() {
  const { registrations } = await getDashboard("90d");
  const rows = [
    ["Огноо", "Төрөл", "Нэр", "И-мэйл", "Дэлгэрэнгүй"],
    ...registrations.map((r) => [r.createdAt.toISOString(), r.kind, r.name, r.email, r.detail]),
  ];
  // Visitor-entered text: quote it, and neutralise leading = + - @ so spreadsheets don't run it as a formula.
  const cell = (v: string) => `"${(/^[=+\-@]/.test(v) ? `'${v}` : v).replaceAll('"', '""')}"`;
  const csv = rows.map((r) => r.map(cell).join(",")).join("\r\n");
  return new Response(`﻿${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="mindmaze-registrations.csv"',
    },
  });
}
