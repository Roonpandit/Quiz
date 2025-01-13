import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/Home.css"
const Home = () => {
  const [quizData, setQuizData] = useState({
    name: '',
    category: '',
    difficulty: 'easy',
    numQuestions: 10,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    localStorage.setItem('quizSetup', JSON.stringify(quizData));
    const { category, difficulty, numQuestions } = quizData;
    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`
      );
      localStorage.setItem('quizQuestions', JSON.stringify(response.data.results));
      navigate('/quiz');
    } catch (error) {
      console.error('Error fetching quiz questions', error);
    }
  };

  return (
    <div className="setup-quiz">
      <h1>Setup Your Quiz</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={quizData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Category:
          <select name="category" value={quizData.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="9">General Knowledge</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="25">Art</option>
          </select>
        </label>
        <label>
          Difficulty:
          <select name="difficulty" value={quizData.difficulty} onChange={handleChange} required>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <label>
          Number of Questions:
          <input
            type="number"
            name="numQuestions"
            value={quizData.numQuestions}
            onChange={handleChange}
            min="1"
            max="50"
            required
          />
        </label>
        <button type="submit">Start Quiz</button>
      </form>
    </div>
  );
};

export default Home;