import React from 'react';
import axios from 'axios';
import { Issue } from '../types';

interface IssueListProps {
  issues: Issue[];
  openModal: (issue: Issue) => void;
  deleteIssue: (id: string) => void;
}

const IssueList: React.FC<IssueListProps> = ({ issues, openModal, deleteIssue }) => {
  const handleDelete = async (issueId: string) => {
    await axios.delete(`http://localhost:3001/issues/${issueId}`);
    deleteIssue(issueId);
  }
  return (
    <div>
      {issues.map((issue, idx) => (
        <div className="issue-item" key={idx}>
          <span>{issue.title}</span>
          <div>
            <button className="edit-button" onClick={() => openModal(issue)}>Edit</button>
            <button onClick={() => handleDelete(issue.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IssueList;
