import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { NoteList } from "./pages/NoteList";
import { AddNote } from "./pages/AddNote";
import { NoteLayout } from "./components/NoteLayout";
import { Note } from "./pages/Note";
import { EditNote } from "./pages/EditNote";
import { Tags } from "./pages/Tags";
import { Container } from "react-bootstrap";
import { Navigation } from "./components/Navigation";

function App() {
  return (
    <>
      <Container>
        <Navigation />
        <Routes>
          <Route path="/" element={<NoteList />} />
          <Route path="/new" element={<AddNote />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/:id" element={<NoteLayout />}>
            <Route index element={<Note />} />
            <Route path="edit" element={<EditNote />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
