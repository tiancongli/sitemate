import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IssueForm from './components/IssueForm';
import IssueList from './components/IssueList';
import { Issue } from './types';
import './App.css';

const App: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [editingIssue, setEditingIssue] = useState<Issue | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchIssues = async () => {
    const response = await axios.get('http://localhost:3001/issues');
    setIssues(response.data);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const openModal = (issue: Issue | null = null) => {
    setEditingIssue(issue);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addIssue = (issue: Issue) => {
    setIssues([...issues, issue]);
  };

  const updateIssue = (updatedIssue: Issue) => {
    setIssues(issues.map(issue => (issue.id === updatedIssue.id ? updatedIssue : issue)));
  };

  const deleteIssue = async (id: string) => {
    setIssues(issues.filter(issue => issue.id !== id));
  };

  return (
    <div className="container">
      <h1>Issue Management</h1>
      <button onClick={() => openModal()}>Add Issue</button>
      <IssueList issues={issues} openModal={openModal} deleteIssue={deleteIssue} />
      {isModalOpen && (
        <IssueForm
          addIssue={addIssue}
          updateIssue={updateIssue}
          issue={editingIssue}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default App;
