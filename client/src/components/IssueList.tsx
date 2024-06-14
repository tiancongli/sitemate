import React from 'react';
import { Issue } from '../types';

interface IssueListProps {
  issues: Issue[];
}

const IssueList: React.FC<IssueListProps> = ({ issues }) => {
  return (
    <div>
      {issues.map((issue, idx) => (
        <div key={idx}>
            {issue.title + ": " + issue.description}
        </div>
      ))}
    </div>
  );
};

export default IssueList;
