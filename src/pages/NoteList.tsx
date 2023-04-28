import { useMemo, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import ReactSelect from "react-select";
import { NoteCard } from "../components/NoteCard";
import useNoteStore, { Tag } from "../store/noteStore";

export const NoteList = () => {
  const { notes, tags } = useNoteStore();
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every(tag =>
            note.tagIds.some(tagId => tagId === tag.id)
          ))
      )
    })
  }, [title, selectedTags, notes])

  return (
    <>
      <h1 className="text-center">Mes notes</h1>
      <Row  className="my-5">
        <Col>
          <Form.Group controlId="title">
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Filtrer par titre"
            />
          </Form.Group>
        </Col>
        <Col>
          <ReactSelect
            value={selectedTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            options={tags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            onChange={(tags) => {
              setSelectedTags(
                tags.map((tag) => {
                  return { label: tag.label, id: tag.value };
                })
              );
            }}
            isMulti
            placeholder="Filtrer par tag"
          />
        </Col>
      </Row>
      <Row>
        {filteredNotes.map((note) => (
          <Col md={6} className="mb-3" key={note.id}>
            <NoteCard key={note.id} note={note} />
          </Col>
        ))}
      </Row>
    </>
  );
};
