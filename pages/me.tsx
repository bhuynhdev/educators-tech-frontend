import { useAuth } from "../src/context/auth-context";
import { useQuery } from "react-query";
import { Axios, backendUrl } from "../lib/utils/backend";
import { useState } from "react";
import { Note } from "../lib/types/Note";
import { useRouter } from "next/router";

const Me: React.FC<{}> = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const { data: allNotes } = useQuery("documentall", async () => {
    const notes = await Axios.get<Note[]>(backendUrl("note/all")).then((data) => data.data);
    setNotes(notes);
    return notes;
  });

  const { data: newNote, refetch: createNoteQuery } = useQuery(
    "note/create",
    async () => {
      const note = await Axios.post<Note>(backendUrl("note")).then((data) => data.data);
      console.log(note);
      return note;
    },
    {
      refetchOnWindowFocus: false,
      enabled: false // disable this query from automatically running
    }
  );

  const handleCreateNote = () => {
    createNoteQuery();
  };

  if (newNote) {
    router.push("/note/" + newNote.id);
    return <></>;
  }

  return (
    <div>
      <h2>Me</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      {notes.map(({ title }, i) => (
        <h3 key={i}>{title}</h3>
      ))}
      <button onClick={handleCreateNote}>Create Note +</button>
    </div>
  );
};

export default Me;
