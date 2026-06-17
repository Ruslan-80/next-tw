import { NextResponse } from "next/server";
import { getDbConnection } from "@/lib/db_conf";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const catalogId = searchParams.get("catalog_id");
  const brand = searchParams.get("brand");
  const current = searchParams.get("current");
  const poles = searchParams.get("poles");

  if (!catalogId) {
    return NextResponse.json(
      { success: false, error: "catalog_id is required" },
      { status: 400 },
    );
  }

  let connection;
  try {
    connection = await getDbConnection();
    let query = "SELECT * FROM products WHERE catalog_id = ?";
    const params = [parseInt(catalogId, 10)];

    if (brand) {
      query += " AND brand = ?";
      params.push(brand);
    }
    if (current) {
      query += " AND nominal_current = ?";
      params.push(current);
    }
    if (poles) {
      query += " AND poles = ?";
      params.push(poles);
    }

    const [rows] = await connection.execute(query, params);
    return NextResponse.json({ success: true, data: rows });
  } catch (err) {
    console.error("DB error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  } finally {
    if (connection) connection.release();
  }
}
