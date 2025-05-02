import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { secondaryColor } from "../../Styles/Styles";

interface ProgressCounterProps {
  flashcardsToday: number;
}

export const ProgressCounter: React.FC<ProgressCounterProps> = ({
  flashcardsToday,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (flashcardsToday >= 25) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [flashcardsToday]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {showConfetti && <Confetti numberOfPieces={200} />}
      <div
        style={{
          width: "100%",
          height: "10px",
          backgroundColor: "#e0e0e0",
          borderRadius: "12px",
          overflow: "hidden",
          margin: "5px",
        }}
      >
        <motion.div
          style={{
            height: "100%",
            backgroundColor: secondaryColor(),
            borderRadius: "12px",
          }}
          initial={{ width: "0%" }}
          animate={{ width: `${(flashcardsToday / 25) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <p
        style={{
          marginTop: "10px",
          fontSize: "12px",
          fontStyle: "italic",
        }}
      >
        {flashcardsToday < 25
          ? `Faltam ${25 - flashcardsToday} flashcards a serem revisados hoje!`
          : `${flashcardsToday} flashcards já revisados hoje!`}
      </p>
    </div>
  );
};
