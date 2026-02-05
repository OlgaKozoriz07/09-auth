import { cookies } from "next/headers";
import { nextServer } from "./api";
import type { User } from "@/types/user";
import type { Note } from "@/types/note";


interface NotesHTTPResponse{
    notes: Note[];
    totalPages: number;
}

async function fetchNotes(
  page: number = 1,
  search?: string,
  tag?: string,
): Promise<NotesHTTPResponse> {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<NotesHTTPResponse>("/notes", {
    params: {
      search,
      page,
      perPage: 12,
      tag,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

async function fetchNoteById(id: string): Promise<Note> {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}
async function checkSession() {
  const cookieStore = await cookies();
  const response = await nextServer.get<{ success: boolean }>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response;
}

async function fetchCurrentUser() {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
}

export { fetchNotes, fetchNoteById, checkSession, fetchCurrentUser };