import { Navigate, Outlet, useParams } from "react-router-dom";
import useNoteStore from "../store/noteStore";


export const NoteLayout = () => {
  const { getNote } = useNoteStore();
  
  const { id } = useParams();
  if (!id) return <Navigate to="/" replace />;

  const note = getNote(id);
  if (!note) return <Navigate to="/" replace />;

  return <Outlet context={note} />
}