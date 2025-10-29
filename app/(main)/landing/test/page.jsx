import { prisma } from "@/lib/prisma";
import { parseSlug } from "@/utils/slugParser";
import seoMetadata from "@/app/data/seoMetadata.json";
import LandingContent from "@/components/LandingContent";

export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;

  const { baseSlug, selectedAttribute, selectedValue, categoryMetadata } =
    parseSlug(slug, seoMetadata, resolvedSearchParams);

  const category = await prisma.category.findUnique({
    where: { slug: baseSlug },
    select: {
      name: true,
      descriptionSeo: true,
    },
  });

  if (!category) {
    return {
      title: "Категория не найдена | ЭЛЕКТРОЩИТ-ПРО",
      description: "Запрашиваемая категория не существует.",
    };
  }

  const page = resolvedSearchParams.page
    ? parseInt(resolvedSearchParams.page)
    : 1;

  let title, description;
  if (
    selectedAttribute &&
    selectedValue &&
    categoryMetadata[selectedAttribute]?.[selectedValue]
  ) {
    title = categoryMetadata[selectedAttribute][selectedValue].title;
    description =
      categoryMetadata[selectedAttribute][selectedValue].description;
  } else {
    title =
      categoryMetadata.default?.title || `${category.name} | ЭЛЕКТРОЩИТ-ПРО`;
    description =
      categoryMetadata.default?.description ||
      category.descriptionSeo ||
      `Информация о категории ${category.name}.`;
  }

  if (page > 1) {
    title = `${title} - Страница ${page}`;
  }

  const canonicalUrl = `/catalog/${slug}${page > 1 ? `?page=${page}` : ""}`;

  return {
    metadataBase: new URL("https://your-site.com"),
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: "/default-og-image.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/default-og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LandingPage({ params, searchParams }) {
  const { slug } = await params;
  return <LandingContent slug={slug} searchParams={searchParams} />;
}
