import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Issue } from '../types';

interface IssueFormProps {
  issue: Issue | null;
  addIssue: (issue: Issue) => void;
  updateIssue: (issue: Issue) => void;
  closeModal: () => void;
}

const IssueForm: React.FC<IssueFormProps> = ({ addIssue, updateIssue, issue: editingIssue, closeModal }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    if (editingIssue) {
      setTitle(editingIssue.title);
      setDescription(editingIssue.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [editingIssue]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (editingIssue) {
      const updatedIssue = { id: editingIssue.id, title, description };
      await axios.put(`http://localhost:3001/issues/${editingIssue.id}`, updatedIssue);
      updateIssue(updatedIssue);
    } else {
      const newIssue = { id: Date.now().toString(), title, description };
      await axios.post('http://localhost:3001/issues', newIssue);
      addIssue(newIssue);
    }
    setTitle('');
    setDescription('');
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="modal-close" onClick={closeModal}>&times;</span>
        <h2>{editingIssue ? 'Edit Issue' : 'Add Issue'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            required
          />
          <button type="submit">{editingIssue ? 'Update Issue' : 'Add Issue'}</button>
        </form>
      </div>
    </div>
  );
};

export default IssueForm;
