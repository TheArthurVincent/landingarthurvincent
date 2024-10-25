import React, { useEffect, useState } from "react";
import axios from "axios";
import { backDomain } from "../../../Resources/UniversalComponents";
import { HeadersProps } from "../../../Resources/types.universalInterfaces";
import { CircularProgress } from "@mui/material";
import { HOne } from "../../../Resources/Components/RouteBox";

const FlashcardsHistory = ({ headers }: HeadersProps) => {
  const [flashcardHistory, setFlashcardHistory] = useState<any[]>([]);
  const [listeningFlashcardHistory, setListeningFlashcardHistory] = useState<
    any[]
  >([]);

  const [expandedFlashcardsDays, setExpandedFlashcardsDays] = useState<Record<string, boolean>>({});
  const [expandedListeningDays, setExpandedListeningDays] = useState<Record<string, boolean>>({});


  const [loading, setLoading] = useState<boolean>(true);
  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>({});
  const toggleDay = (date: string) => {
    setExpandedDays((prevState) => ({
      ...prevState,
      [date]: !prevState[date], // Alterna entre expandido e contraído
    }));
  };


  const toggleFlashcardDay = (date: string) => {
    setExpandedFlashcardsDays((prevState) => ({
      ...prevState,
      [date]: !prevState[date], // Alterna entre expandido e contraído
    }));
  };

  const toggleListeningDay = (date: string) => {
    setExpandedListeningDays((prevState) => ({
      ...prevState,
      [date]: !prevState[date], // Alterna entre expandido e contraído
    }));
  };


  const actualHeaders = headers || {};
  const getNewCards = async (id?: string) => {
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/flashcardscore/${id}`,
        {
          headers: actualHeaders,
        }
      );
      console.log(response.data); // Log the response
      setFlashcardHistory(
        Array.isArray(response.data.flashcardReviewHistory)
          ? response.data.flashcardReviewHistory
          : []
      );
      setListeningFlashcardHistory(
        Array.isArray(response.data.listeningReviewHistory)
          ? response.data.listeningReviewHistory
          : []
      );
      setLoading(false);
    } catch (error) {
      console.log("Erro ao obter cards", error);
      setFlashcardHistory([]); // Ensure it's an empty array on error
      setLoading(false);
    }
  };

  const groupByDay2 = (data: any[]) => {
    if (!Array.isArray(data)) return {}; // Return an empty object if data is not an array
    return data.reduce((acc, curr) => {
      const date = new Date(curr.date).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = { items: [], totalScore: 0 };
      }
      acc[date].items.push(curr);
      acc[date].totalScore += curr.score;
      return acc;
    }, {} as Record<string, { items: any[]; totalScore: number }>);
  };

  useEffect(() => {
    const user = localStorage.getItem("loggedIn");
    const { id } = JSON.parse(user || "");
    if (user) {
      getNewCards(id);
    }
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  const groupedHistory = groupByDay2(flashcardHistory);
  const groupedListeningHistory = groupByDay2(listeningFlashcardHistory);

  return (
    <div className="flashcard-history-upper">
      <div>
        <HOne>Flashcard Reviews</HOne>{" "}
        {flashcardHistory.length > 0 ? (
          <div className="flashcard-history-list">
            {Object.entries(groupedHistory).map(([date, group]) => (
              <div key={date} className="flashcard-day">
                <h2 className="flashcard-date" onClick={() => toggleFlashcardDay(date)}>
                  {/* @ts-ignore */}
                  {date} - Total Points: {group.totalScore}
                </h2>
                {expandedFlashcardsDays[date] && ( // Exibe ou esconde os itens com base no estado
                  <div className="flashcard-items">
                    {/* @ts-ignore */}
                    {group.items.map((item) => (
                      <div key={item._id} className="flashcard-item">
                        <p>
                          <strong>Description:</strong> {item.description}
                        </p>
                        <p>
                          <strong>Score:</strong> {item.score}
                        </p>
                        <p>
                          <strong>Date:</strong>{" "}
                          {new Date(item.date).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No flashcard history found.</p>
        )}
      </div>
      <div>
        <HOne>Listening Exercises</HOne>
        {listeningFlashcardHistory.length > 0 ? (
          <div className="flashcard-history-list">
            {Object.entries(groupedListeningHistory).map(([date, group]) => (
              <div key={date} className="flashcard-day">
                <h2 className="flashcard-date" onClick={() => toggleListeningDay(date)}>
                  {/* @ts-ignore */}
                  {date} - Total Points: {group.totalScore}
                </h2>
                {expandedListeningDays[date] && ( // Exibe ou esconde os itens com base no estado
                  <div className="flashcard-items">
                    {/* @ts-ignore */}
                    {group.items.map((item) => (
                      <div key={item._id} className="flashcard-item">
                        <p>
                          <strong>Description:</strong> {item.description}
                        </p>
                        <p>
                          <strong>Score:</strong> {item.score}
                        </p>
                        <p>
                          <strong>Date:</strong>{" "}
                          {new Date(item.date).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No listening flashcard history found.</p>
        )}
      </div>
    </div>
  );
};

export default FlashcardsHistory;
