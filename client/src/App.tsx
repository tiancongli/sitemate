import './App.css';
import IssueList from './components/IssueList';
import Controller from './components/controller';
import { mockIssues } from './mockData';

function App() {
  return (
    <div className="container">
      <h1>Issues Board</h1>
      <Controller/>
      <IssueList issues={mockIssues}/>
    </div>
  );
}

export default App;
