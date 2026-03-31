import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import "./App.css";

function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const data = await getDocs(collection(db, "notes"));
    setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const saveNote = async () => {
    if (note.trim() === "") return;
    await addDoc(collection(db, "notes"), { text: note });
    setNote("");
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="container">
      <h1>💕 My Notes</h1>
      <div className="card">
        <input
          type="text"
          placeholder="Enter a note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button onClick={saveNote}>💾 Save Note</button>
      </div>
      <div className="notes-list">
        {notes.map((n) => (
          <div key={n.id} className="note">
            💗 {n.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;