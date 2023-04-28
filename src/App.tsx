import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navigation } from "./components/Navigation";
import { NoteLayout } from "./components/NoteLayout";
import { AddNote } from "./pages/AddNote";
import { EditNote } from "./pages/EditNote";
import { Note } from "./pages/Note";
import { NoteList } from "./pages/NoteList";
import { Tags } from "./pages/Tags";

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
