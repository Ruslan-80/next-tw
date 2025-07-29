import { prisma } from "@/lib/prisma";
import { parseSlug } from "@/utils/slugParser";
import Breadcrumbs from "@/components/Breadcrumbs";
import seoMetadata from "@/app/data/seoMetadata.json";

export default async function LandingContent({ slug, searchParams }) {
  const resolvedSearchParams = await searchParams;
  const {
    baseSlug,
    selectedAttribute,
    selectedValue,
    categoryMetadata,
    h1Text,
    fullDescription,
    advantageText,
  } = parseSlug(slug, resolvedSearchParams);

  const category = await prisma.category.findUnique({
    where: { slug: baseSlug },
    include: {
      parent: {
        include: {
          parent: true,
        },
      },
      children: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });

  if (!category) {
    return <p className="text-center py-8">Категория не найдена</p>;
  }

  const displaySuffix =
    selectedAttribute === "kolichestvo-kvartir-schetchikov"
      ? ` на ${selectedValue} квартиры`
      : selectedValue
      ? ` (${selectedValue})`
      : "";
  const finalH1 = h1Text || `${category.name}${displaySuffix}`;

  const breadcrumbs = [];
  let currentCategory = category;
  while (currentCategory) {
    breadcrumbs.unshift({
      name: currentCategory.name,
      slug: currentCategory.slug,
    });
    currentCategory = currentCategory.parent;
  }

  return (
    <div className="container mx-auto px-4">
      <Breadcrumbs items={breadcrumbs} />
      <h1 className="flex items-center justify-center text-base sm:text-2xl font-bold mb-6 mt-4">
        {finalH1}
      </h1>
      {fullDescription && (
        <div className="bg-blue-300/20 shadow-xl text-2xl rounded-4xl px-8 py-12 mx-auto border border-blue-200 mb-12">
          {fullDescription}
        </div>
      )}
      {advantageText && (
        <div dangerouslySetInnerHTML={{ __html: advantageText }} />
      )}
    </div>
  );
}
