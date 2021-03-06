import { useEffect, useState } from "react";
import { useTriviaQuestions } from "../context/questionContext";

const useFetchQuestionsAPI = () => {
  const [url, setURL] = useState(
    "https://opentdb.com/api.php?amount=1&difficulty=hard&type=boolean"
  );
  const { setTriviaQuestions } = useTriviaQuestions();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  // const API = `${process.env.TRIVIA_QUESTIONS}?amount=${amountQuestions}&difficulty=${difficultyLevel}&type=${typeQuestions}`;

  useEffect(() => {
    setLoading(true);
    const fetchAPI = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setTriviaQuestions(json.results);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };
    fetchAPI();
  }, [url, setTriviaQuestions]);

  return [{ error, loading }, setURL];
};

export { useFetchQuestionsAPI };
