import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

interface Issue {
    id: string;
    title: string;
    description: string;
}

let issues: Issue[] = [];

// Create a new issue
app.post('/issues', (req: Request, res: Response) => {
    const issue: Issue = req.body;
    issues.push(issue);
    res.status(201).send(issue);
});

// Get an issue by ID
app.get('/issues/:id', (req: Request, res: Response) => {
    const issueId = req.params.id;
    const issue = issues.find(_issue => _issue.id === issueId);
    if (issue) {
        res.status(200).send(issue);
    } else {
        res.status(404).send({ message: 'Issue not found' });
    }
});

// Update an issue by ID
app.put('/issues/:id', (req: Request, res: Response) => {
    const issueId = req.params.id;
    const issueIndex = issues.findIndex(_issue => _issue.id === issueId);
    if (issueIndex !== -1) {
        issues[issueIndex] = req.body;
        res.status(200).send(issues[issueIndex]);
    } else {
        res.status(404).send({ message: 'Issue not found' });
    }
});

// Delete an issue by ID
app.delete('/issues/:id', (req: Request, res: Response) => {
    const issueId = req.params.id;
    const issueIndex = issues.findIndex(_issue => _issue.id === issueId);
    if (issueIndex !== -1) {
        const deletedIssue = issues.splice(issueIndex, 1);
        res.status(200).send(deletedIssue);
    } else {
        res.status(404).send({ message: 'Issue not found' });
    }
});

// Get all issues
app.get('/issues', (_: Request, res: Response) => {
    res.status(200).send(issues);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


