import { Button, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav className="my-3">
      <Stack direction="horizontal" gap={3}>
        <Link to="/">
          <Button>Mes notes</Button>
        </Link>
        <Link to="/new">
          <Button>Ajouter une note</Button>
        </Link>
        <Link to="/tags">
          <Button>Gestion des tags</Button>
        </Link>
      </Stack>
    </nav>
  );
};
