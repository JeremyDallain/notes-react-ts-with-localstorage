import { Link } from "react-router-dom";
import useNoteStore, { Note } from "../store/noteStore";
import { Badge, Button, Card } from "react-bootstrap";

interface Props {
  note: Note;
}

export const NoteCard = ({ note }: Props) => {
  const { getTagsForNote } = useNoteStore();
  const tags = getTagsForNote(note.id);

  return (
    <Card
      as={Link}
      to={`/${note.id}`}
      className={`h-100 text-reset text-decoration-none note-card`}
    >
      <Card.Header>
        {tags.map((tag) => (
          <Badge className="m-2 bg-success" key={tag.id}>{tag.label}</Badge>
        ))}
      </Card.Header>
      <Card.Body>
        <Card.Title>
          <h2>{note.title}</h2>
        </Card.Title>
      </Card.Body>
    </Card>
  );
};
