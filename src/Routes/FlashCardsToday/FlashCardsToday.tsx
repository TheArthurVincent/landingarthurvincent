import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

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
      setTimeout(() => setShowConfetti(false), 1000);
    }
  }, [flashcardsToday]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px",
        border: "1px solid #ccc",
        borderRadius: "12px",
        boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
        backgroundColor: "white",
        width: "320px",
      }}
    >
      {showConfetti && <Confetti numberOfPieces={200} />}
      <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Progress Counter</h2>
      <div
        style={{
          width: "100%",
          height: "24px",
          backgroundColor: "#e0e0e0",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{
            height: "100%",
            backgroundColor: "#007bff",
            borderRadius: "12px",
          }}
          initial={{ width: "0%" }}
          animate={{ width: `${(flashcardsToday / 25) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <p style={{ fontSize: "16px" }}>
        {flashcardsToday < 25
          ? `Faltam ${25 - flashcardsToday} pontos!`
          : "Parabéns! 🎉"}
      </p>
    </div>
  );
};
