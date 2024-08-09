import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';
import CodeEditor from './CodeEditor';

function InterviewSimulator() {
  const { user } = useUser();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [codeChallenge, setCodeChallenge] = useState(null);

  const getNewQuestion = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/get_question');
      const questionData = response.data;
      setQuestion(questionData.question);
      if (questionData.challenge) {
        setCodeChallenge(questionData);
      } else {
        setCodeChallenge(null);
      }
    } catch (error) {
      console.error('Error fetching question:', error.response ? error.response.data : error.message);
    }
  };

  const submitAnswer = async () => {
    if (codeChallenge) {
      try {
        const response = await axios.post('http://127.0.0.1:5000/compile', {
          code: answer,
          language: 'javascript',
          expected_outputs: codeChallenge.expected_outputs
        });
        setFeedback(response.data);
      } catch (error) {
        console.error('Error compiling code:', error.response ? error.response.data : error.message);
      }
    } else {
      try {
        const response = await axios.post('http://127.0.0.1:5000/submit_answer', {
          userId: user.id,
          question,
          answer
        });
        setFeedback(response.data.feedback);
      } catch (error) {
        console.error('Error submitting answer:', error.response ? error.response.data : error.message);
      }
    }
  };

  return (
    <div>
      <h2>Interview Simulator</h2>
      <button onClick={getNewQuestion}>Get New Question</button>
      {question && (
        <div>
          <p>{question}</p>
          {codeChallenge ? (
            <CodeEditor exercise={codeChallenge} onSubmit={submitAnswer} />
          ) : (
            <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} />
          )}
          <button onClick={submitAnswer}>Submit Answer</button>
          {feedback && <p>Feedback: {feedback}</p>}
        </div>
      )}
    </div>
  );
}

export default InterviewSimulator;
