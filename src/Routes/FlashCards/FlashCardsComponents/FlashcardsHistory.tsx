import React, { useEffect, useState } from "react";
import axios from "axios";
import { backDomain } from "../../../Resources/UniversalComponents";
import { HeadersProps } from "../../../Resources/types.universalInterfaces";
import { CircularProgress } from "@mui/material";
import { HThree } from "../../MyClasses/MyClasses.Styled";
import { HTwo } from "../../../Resources/Components/RouteBox";

const FlashcardsHistory = ({ headers }: HeadersProps) => {
  const [flashcardHistory, setFlashcardHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>({});

  const toggleDay = (date: string) => {
    setExpandedDays((prevState) => ({
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
      setFlashcardHistory(response.data.flashcardHistory);
      setLoading(false);
    } catch (error) {
      console.log("Erro ao obter cards");
      setLoading(false);
    }
  };

  // Função para agrupar os flashcards por dia e calcular os totais de pontos
  const groupByDay = (data: any[]) => {
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

  const groupedHistory = groupByDay(flashcardHistory);

  return (
    <>
      {" "}
      {flashcardHistory.length > 0 ? (
        <div className="flashcard-history-list">
          {Object.entries(groupedHistory).map(([date, group]) => (
            <div key={date} className="flashcard-day">
              <HTwo className="flashcard-date" onClick={() => toggleDay(date)}>
                {/* @ts-ignore */}
                {date} - Total Points: {group.totalScore}
              </HTwo>
              {expandedDays[date] && ( // Exibe ou esconde os itens com base no estado
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
    </>
  );
};

export default FlashcardsHistory;
