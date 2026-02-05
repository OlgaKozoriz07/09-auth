"use client";

import css from "./NotePage.module.css";
import { useState, useEffect } from "react";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import NoteList from "@/components/NoteList/NoteList";
import toast, { Toaster } from "react-hot-toast";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import Pagination from "@/components/Pagination/Pagination";
import Link from "next/link";

type NoteDetailsClientProps = {
  tag?: string;
};

export default function NoteClient({ tag }: NoteDetailsClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentQuery, setCurrentQuery] = useState<string | undefined>(undefined);

  const { data, isSuccess, isPending } = useQuery({
    queryKey: ["notes", currentPage, currentQuery, tag],
    queryFn: () => fetchNotes(currentPage, currentQuery, tag),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPage = data?.totalPages ?? 0;

  useEffect(() => {
    if (isSuccess && !isPending && notes.length === 0) {
      toast.error("No notes");
    }
  }, [notes.length, isSuccess, isPending]);

  const handleChangeQuery = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentPage(1);
      setCurrentQuery(event.target.value);
    },
    600
  );

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleChangeQuery} />
        {totalPage > 1 && (
          <Pagination
            page={currentPage}
            totalPages={totalPage}
            setPage={setCurrentPage}
          />
        )}
        <Link href={"/notes/action/create"} className={css.button}>
          Create note +
        </Link>
      </header>

      {notes.length > 0 && <NoteList notes={notes} />}

      <Toaster />
    </div>
  );
}
