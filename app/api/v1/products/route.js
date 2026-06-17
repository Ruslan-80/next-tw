import { NextResponse } from "next/server";
import { getDbConnection } from "@/lib/db_conf";

const DEVICE_TABLE_MAP = {
  breaker: "products_breaker",
  power_breaker: "products_power_breaker",
  switch: "products_switch",
  diff: "products_diff",
  rcd: "products_rcd",
  surge: "products_surge",
  contactor: "products_contactor",
  relay: "products_relay",
  meter: "products_meter",
  transformer: "products_transformer",
  busbar: "products_busbar",
  other: "products_other",
};

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const deviceType = searchParams.get("device_type") ?? "breaker";
  const brand = searchParams.get("brand");
  const poles = searchParams.get("poles");
  const curve = searchParams.get("curve");
  const breakingCapacity = searchParams.get("breaking_capacity");
  const nominalCurrent = searchParams.get("nominal_current");
  const diffCurrent = searchParams.get("diff_current");
  const diffType = searchParams.get("diff_type");

  const table = DEVICE_TABLE_MAP[deviceType];
  if (!table) {
    return NextResponse.json(
      { success: false, error: `Неизвестный device_type: ${deviceType}` },
      { status: 400 },
    );
  }

  let connection;
  try {
    connection = await getDbConnection();
    let query = `SELECT * FROM \`${table}\` WHERE price > 0`;
    const params = [];

    if (brand) {
      query += " AND brand LIKE ?";
      params.push(`%${brand.trim()}%`);
    }
    if (poles) {
      const cleanPoles = poles.replace(/[ПP]/g, "").trim();
      query += " AND poles = ?";
      params.push(cleanPoles);
    }
    if (nominalCurrent) {
      query += " AND rating = ?";
      params.push(nominalCurrent.trim());
    }
    if (curve) {
      query += " AND LOWER(curve) = LOWER(?)";
      params.push(curve.trim());
    }
    if (breakingCapacity) {
      query += " AND breaking_capacity = ?";
      params.push(breakingCapacity.trim());
    }
    if (diffCurrent) {
      query += " AND diff_current = ?";
      params.push(diffCurrent.trim());
    }
    if (diffType) {
      query += " AND diff_type LIKE ?";
      params.push(`%${diffType.trim()}%`);
    }

    // console.log(`Table: ${table} | SQL: ${query} | params:`, params);

    const [rows] = await connection.execute(query, params);
    return NextResponse.json({
      success: true,
      data: rows,
      count: rows.length,
    });
  } catch (err) {
    console.error("Filter error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  } finally {
    if (connection) connection.release();
  }
}
