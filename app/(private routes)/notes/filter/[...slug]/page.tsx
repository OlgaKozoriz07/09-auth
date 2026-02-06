import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/serverApi";
import NoteClient from "./Notes.client";
import { Metadata } from "next";

interface NotesByCategoryProps {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{
    page?: string;
    query?: string;
  }>;
}

export async function generateMetadata({
  params,
}: NotesByCategoryProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] === "all" ? "all" : slug[0];
  return {
    title: `${tag} notes`,
    description: `All notes ${tag}`,
    openGraph: {
      title: `${tag} notes`,
      description: `All notes ${tag}`,
      url: `https://08-zustand-aedg.vercel.app//notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `${tag}`,
        },
      ],
    },
  };
}

const NotesByCategory = async ({
  params,
  searchParams,
}: NotesByCategoryProps) => {
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];

  const { page, query } = await searchParams;

  const pageNumber = Math.max(1, Number(page) || 1);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", pageNumber, query, tag],
    queryFn: () => fetchNotes(pageNumber, query, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesByCategory;