import React, { FC, useEffect, useState } from "react";

interface VoiceTypes {
  changeB: boolean;
  setChangeB: (value: boolean) => void;
}

const Voice: FC<VoiceTypes> = ({ changeB, setChangeB }) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");

  useEffect(() => {
    const loadVoices = () => {
      let availableVoices = window.speechSynthesis.getVoices();
      const englishVoices = availableVoices.filter((voice) =>
        voice.lang.toLowerCase().includes("en")
      );

      if (englishVoices.length > 0) {
        setVoices(englishVoices);
      } else {
        window.speechSynthesis.onvoiceschanged = () => {
          availableVoices = window.speechSynthesis.getVoices();
          const englishVoices = availableVoices.filter((voice) =>
            voice.lang.toLowerCase().includes("en")
          );
          setVoices(englishVoices);
        };
      }
    };

    const storedVoice = localStorage.getItem("chosenVoice");
    if (storedVoice) {
      setSelectedVoice(storedVoice);
    }

    loadVoices();
  }, []);

  useEffect(() => {
    if (selectedVoice) {
      localStorage.setItem("chosenVoice", selectedVoice);
    }
  }, [selectedVoice, changeB]);

  return (
    <div
      style={{
        backgroundColor: "#fff",
        display: "grid",
        margin: "10px",
        padding: "10px",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        zIndex: 1000,
      }}
    >
      {voices.length > 0 && (
        <div>
          <label htmlFor="voice-select">🗣️ Voice:</label>
          <select
            id="voice-select"
            value={selectedVoice}
            onChange={(e) => {
              setSelectedVoice(e.target.value);
              setChangeB(!changeB);
            }}
            style={{ marginLeft: "8px" }}
          >
            {voices.map((voice, index) => (
              <option key={index} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Voice;
