import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import useNoteStore, { Tag } from "../store/noteStore";

export const AddNote = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const { addNote, addTag, tags } = useNoteStore();
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (
      titleRef.current &&
      markdownRef.current &&
      titleRef.current.value &&
      markdownRef.current.value
    ) {
      addNote({
        title: titleRef.current.value,
        markdown: markdownRef.current.value,
        tagIds: selectedTags.map((tag) => tag.id),
      });
    }

    navigate("/");
  };

  return (
    <>
      <h1 className="text-center my-5">Ajouter une note</h1>
      <Row className="justify-content-center">
        <Col xs={12} lg={8}>
          <Form onSubmit={handleSubmit} >
            <Form.Group className="mb-3">
              <Form.Label>Titre</Form.Label>
              <Form.Control type="text" name="title" ref={titleRef} />
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
              <Form.Label>Contenu ( Markdown )</Form.Label>
              <Form.Control
                as="textarea"
                name="markdown"
                rows={10}
                ref={markdownRef}
              />
            </Form.Group>

            <Button type="submit">Submit</Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};
