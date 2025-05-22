"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllNotes } from "@/lib/indexedDb";

import {
  Container,
  Typography,
  Button,
  Stack,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";

export default function NotesList() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getAllNotes().then(setNotes);
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">Your Notes</Typography>
        <Link href="/edit/new" passHref>
          <Button variant="contained">+ New Note</Button>
        </Link>
      </Stack>

      <Stack spacing={2}>
        {notes?.map((note) => (
          <Link href={`/edit/${note.id}`} key={note.id} passHref>
            <Card variant="outlined">
              <CardActionArea>
                <CardContent>
                  <Typography variant="h6">
                    {note.title || "Untitled"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Last updated: {new Date(note.updatedAt).toLocaleString()}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        ))}
      </Stack>
    </Container>
  );
}
