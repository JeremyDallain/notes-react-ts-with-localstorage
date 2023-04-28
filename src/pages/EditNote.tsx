import { FormEvent, useEffect, useRef, useState } from "react";
import useNoteStore, { Note, Tag } from "../store/noteStore";
import { useNavigate, useOutletContext } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { Form, Button, Row, Col } from "react-bootstrap";

export const EditNote = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const { editNote, deleteNote, addTag, tags, getTagsForNote } = useNoteStore();
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const note = useOutletContext<Note>();

  useEffect(() => {
    setSelectedTags(getTagsForNote?.(note.id) ?? []);
  }, [note.id, getTagsForNote]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (titleRef.current && markdownRef.current) {
      editNote(note.id, {
        title: titleRef.current.value,
        markdown: markdownRef.current.value,
        tagIds: selectedTags.map((tag) => tag.id),
      });
    }

    navigate(`/${note.id}`);
  };
  return (
    <>
      <h1 className="text-center my-5">Modifier la note #{note.id}</h1>
      <Row className="justify-content-center">
        <Col xs={12} lg={8}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                ref={titleRef}
                defaultValue={note.title}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                onCreateOption={(label) => {
                  const tagId = Date.now().toString();
                  addTag(tagId, label);
                  setSelectedTags([...selectedTags, { label, id: tagId }]);
                }}
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
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Markdown</Form.Label>
              <Form.Control
                as="textarea"
                name="markdown"
                rows={10}
                ref={markdownRef}
                defaultValue={note.markdown}
              />
            </Form.Group>
            <Button type="submit">Modifier</Button>{" "}
            <Button
              variant="danger"
              onClick={() => {
                deleteNote(note.id);
                navigate(`/`);
              }}
            >
              Supprimer
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};
