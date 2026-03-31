import React, { useState, useEffect } from 'react';
import { db } from './firebase'; // Ensure your firebase.js exports 'db'
import { collection, addDoc, onSnapshot, query } from 'firebase/firestore';
import './App.css'; 

function App() {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [year, setYear] = useState('');
  const [students, setStudents] = useState([]);

  // Fetch data from Firestore
  useEffect(() => {
    const q = query(collection(db, "students"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const studentArr = [];
      querySnapshot.forEach((doc) => {
        studentArr.push({ ...doc.data(), id: doc.id });
      });
      setStudents(studentArr);
    });
    return () => unsubscribe();
  }, []);

  // Save data to Firestore
  const handleSave = async (e) => {
    e.preventDefault();
    if (name !== "" && course !== "" && year !== "") {
      await addDoc(collection(db, "students"), {
        name,
        course,
        year,
      });
      setName(''); setCourse(''); setYear('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Student Information Form</h2>
      <form onSubmit={handleSave}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" /><br/>
        <input value={course} onChange={(e) => setCourse(e.target.value)} placeholder="Course" /><br/>
        <input type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year Level" /><br/>
        <button type="submit">Save</button>
      </form>

      <hr />
      <h3>Saved Records</h3>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} - {student.course} (Year {student.year})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;