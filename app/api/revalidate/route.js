import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * POST /api/revalidate
 *
 * On-demand ISR revalidation webhook.
 * Triggers cache invalidation for specified paths or tags
 * after admin edits, product syncs, or CI/CD pipelines.
 *
 * Headers:
 *   x-revalidation-secret: process.env.REVALIDATION_SECRET
 *
 * Body (JSON):
 *   { "paths": ["/catalog", "/product/vru-1-11-10"], "tags": ["products"] }
 */
export async function POST(request) {
  const secret = request.headers.get("x-revalidation-secret");

  if (!secret || secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json(
      { error: "Unauthorized: invalid or missing revalidation secret" },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();
    const { paths, tags } = body;

    const revalidated = [];

    if (Array.isArray(paths)) {
      for (const p of paths) {
        revalidatePath(p);
        revalidated.push({ type: "path", value: p });
      }
    }

    if (Array.isArray(tags)) {
      for (const t of tags) {
        revalidateTag(t);
        revalidated.push({ type: "tag", value: t });
      }
    }

    if (revalidated.length === 0) {
      return NextResponse.json(
        { error: "No paths or tags provided in request body" },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      revalidated,
      timestamp: Date.now(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Revalidation failed", message: error.message },
      { status: 500 },
    );
  }
}
