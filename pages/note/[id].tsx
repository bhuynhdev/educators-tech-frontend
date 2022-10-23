import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { Note } from "../../lib/types/Note";
import { Axios, backendUrl } from "../../lib/utils/backend";
import { useState } from "react";
import MarkdownApp from "../app";

const NoteApp = () => {
  const router = useRouter();
  const { id } = router.query;
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("New Note");

  const { data: thisNote } = useQuery(["note", id], async () => {
    const note = await Axios.get<Note>(backendUrl(`note/${id}`)).then((data) => data.data);
    setMarkdown(note.markdown);
    setTitle(note.title || "New note");
    return note;
  });

  const { data: updatedNote, refetch: updateNoteQuery } = useQuery(
    ["note/update"],
    async () => {
      const note = await Axios.put<Note>(backendUrl("note"), { markdown: markdown, title: title, id: thisNote!.id }).then((data) => data.data);
      setMarkdown(note.markdown);
      return note;
    },
    { enabled: false }
  );

  return (
    <div>
      <p>Post: {id}</p>;<label htmlFor="note-title">TITLE:</label>
      <input type="text" id="note-title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <MarkdownApp markdown={markdown} setMarkdown={setMarkdown} handleUpdate={updateNoteQuery} />
    </div>
  );
};

export default NoteApp;
