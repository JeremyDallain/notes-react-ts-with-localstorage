import { FormEvent, useRef } from "react";
import useNoteStore, { Tag } from "../store/noteStore";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";

export const Tags = () => {
  const { tags, editTag, deleteTag, addTag } = useNoteStore();
  const tagRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (tagRef.current && tagRef.current.value) {
      addTag(Date.now().toString(), tagRef.current.value);

      tagRef.current.value = "";
    }
  };

  return (
    <>
      <h1 className="text-center">Gestion des tags</h1>
      <Row className="justify-content-center my-5">
        <Col xs={12} md={8} lg={6}>
          {tags.map((tag) => (
            <InputGroup key={tag.id} className="mb-3">
              <FormControl
                type="text"
                value={tag.label}
                onChange={(e) => editTag(tag.id, e.target.value)}
              />
              <Button
                variant="outline-danger"
                onClick={() => deleteTag(tag.id)}
              >
                X
              </Button>
            </InputGroup>
          ))}
          <Form onSubmit={handleSubmit} className="mt-3">
            <InputGroup>
              <FormControl
                type="text"
                name="tag"
                ref={tagRef}
                placeholder="Ajouter un tag"
              />
              <Button type="submit" variant="outline-primary">
                Ajouter
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    </>
  );
};
