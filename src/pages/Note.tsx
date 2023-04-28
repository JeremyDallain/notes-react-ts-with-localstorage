import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useNavigate, useOutletContext } from "react-router-dom";
import useNoteStore, { Note as NodeType } from "../store/noteStore";

export const Note = () => {
  const navigate = useNavigate();
  const { deleteNote, getTagsForNote } = useNoteStore();
  const note = useOutletContext<NodeType>();
  const tags = getTagsForNote(note.id);

  return (
    <Row className="justify-content-center my-5">
      <Col xs={12} lg={8}>
        <div className="mt-5">
          {tags.map((tag) => (
            <Badge className="m-1 bg-success" key={tag.id}>
              {tag.label}
            </Badge>
          ))}
        </div>
        <Stack direction="horizontal" gap={3} className="mb-5">
          <h1>{note.title}</h1>
          <Button
            className="btn-sm"
            onClick={() => navigate(`/${note.id}/edit`)}
          >
            Modifier
          </Button>
          <Button
            className="btn-sm"
            onClick={() => {
              deleteNote(note.id);
              navigate(`/`);
            }}
            variant="danger"
          >
            Supprimer
          </Button>
        </Stack>

        <ReactMarkdown>{note.markdown}</ReactMarkdown>
      </Col>
    </Row>
  );
};