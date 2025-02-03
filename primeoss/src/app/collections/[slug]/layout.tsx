import { Skeleton } from "@/components/ui/skeleton";
import WixImage from "@/components/WixImage";
import { cn, delay } from "@/lib/utils";
import { getWixServerClient } from "@/lib/wix-client-server";
import { getCollectionBySlug } from "@/wix-api/collection";
import { notFound } from "next/navigation";
import { Suspense } from "react";

// Como o Next.js pode passar os parâmetros de forma assíncrona,
// definimos a propriedade "params" como podendo ser um objeto ou uma Promise.
interface LayoutProps {
  children: React.ReactNode;
  params: { slug: string } | Promise<{ slug: string }>;
}

// Um tipo específico para o componente que usará somente o "slug"
interface CollectionsLayoutProps {
  children: React.ReactNode;
  slug: string;
}

// Agora, o layout padrão é uma função assíncrona
export default async function Layout({ children, params }: LayoutProps) {
  // Se "params" já não for uma Promise, o await resolverá normalmente
  const resolvedParams = await Promise.resolve(params);
  
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <CollectionsLayout slug={resolvedParams.slug}>{children}</CollectionsLayout>
    </Suspense>
  );
}

// O componente que carrega os dados da coleção também é assíncrono
async function CollectionsLayout({ children, slug }: CollectionsLayoutProps) {
  // Simula um atraso (por exemplo, para demonstrar o Suspense)
  await delay(2000);

  const collection = await getCollectionBySlug(getWixServerClient(), slug);

  if (!collection) {
    notFound();
  }

  const banner = collection.media?.mainMedia?.image;

  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <div className="flex flex-col gap-10">
        {banner && (
          <div className="relative hidden sm:block">
            <WixImage
              mediaIdentifier={banner.url}
              width={1280}
              height={400}
              alt={banner.altText}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
            <h1 className="absolute bottom-10 left-1/2 -translate-x-1/2 text-4xl font-bold text-white lg:text-5xl">
              {collection.name}
            </h1>
          </div>
        )}
        <h1
          className={cn(
            "text-3x1 mx-auto font-bold md:text-4xl",
            banner && "sm:hidden"
          )}
        >
          {collection.name}
        </h1>
      </div>
      {children}
    </main>
  );
}

function LoadingSkeleton() {
  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <Skeleton className="mx-auto h-10 w-48 sm:block sm:aspect-[1280/400] sm:h-full sm:w-full" />
      <div className="space-y-5">
        <h2 className="text-2xl font-bold">Products</h2>
        <div className="flex grid-cols-2 flex-col gap-5 sm:grid md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-[26rem] w-full" />
          ))}
        </div>
      </div>
    </main>
  );
}
