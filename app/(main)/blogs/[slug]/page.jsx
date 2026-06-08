export const revalidate = 3600;
import fs from "fs";
import path from "path";

const postsDir = path.join(process.cwd(), "app/(main)/blogs/posts");

export async function generateParams() {
  const files = fs.readdirSync(postsDir);
  return files
    .filter((file) => file.endsWith(".jsx"))
    .map((file) => ({ slug: file.replace(".jsx", "") }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const postModule = await import(`../posts/${slug}.jsx`);
    return {
      title: postModule.metadata?.title || "Статья",
      description: postModule.metadata?.description || "",
    };
  } catch {
    return { title: "Статья не найдена" };
  }
}

export default async function BlogPage({ params }) {
  const { slug } = await params;

  try {
    const postModule = await import(`../posts/${slug}.jsx`);
    const PostComponent = postModule.default;
    return (
      <>
        <PostComponent />
      </>
    );
  } catch (error) {
    console.error("Ошибка загрузки статьи:", error);
    return <div>Статья не найдена</div>;
  }
}
