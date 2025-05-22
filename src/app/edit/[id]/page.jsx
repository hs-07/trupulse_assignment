"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import {
  Container,
  TextField,
  Button,
  Typography,
  Stack,
  Box,
  Divider,
} from "@mui/material";

import { getNote, saveNote, deleteNote } from "@/lib/indexedDb";

export default function Editor() {
  const router = useRouter();
  const { id } = useParams();

  const [noteId, setNoteId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saveTimeout, setSaveTimeout] = useState(null);

  useEffect(() => {
    if (id && id !== "new") {
      getNote(id).then((note) => {
        if (note) {
          setNoteId(note.id);
          setTitle(note.title);
          setContent(note.content);
        }
      });
    } else {
      setNoteId(crypto.randomUUID());
    }
  }, [id]);

  useEffect(() => {
    if (noteId) {
      if (saveTimeout) clearTimeout(saveTimeout);
      const timeout = setTimeout(() => {
        saveNote({
          id: noteId,
          title,
          content,
          updatedAt: Date.now(),
          isSynced: false,
        });
      }, 600);
      setSaveTimeout(timeout);
    }
  }, [title, content]);

  const handleDelete = async () => {
    await deleteNote(noteId);
    router.push("/");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Stack spacing={2}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label="Markdown Content"
          multiline
          minRows={10}
          variant="outlined"
          fullWidth
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={() => router.push("/")}>
            Back
          </Button>
          {id !== "new" && (
            <Button variant="outlined" color="error" onClick={handleDelete}>
              Delete
            </Button>
          )}
        </Stack>

        <Divider />

        <Box>
          <Typography variant="h6" gutterBottom>
            Markdown Preview
          </Typography>
          <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: 1 }}>
            <ReactMarkdown>{content}</ReactMarkdown>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
}
