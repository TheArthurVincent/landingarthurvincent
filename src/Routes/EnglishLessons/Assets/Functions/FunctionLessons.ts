export const readText = (text: string, restart: boolean, lang?: string) => {
  if ("speechSynthesis" in window) {
    const synth = window.speechSynthesis;
    if (!synth) {
      console.error("speechSynthesis não está disponível.");
      return;
    }

    if (restart) {
      synth.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);

    // Definir o idioma
    utterance.lang = getLanguageCode(lang);

    // Configurações adicionais (opcional)
    utterance.rate = 1; // Velocidade normal
    utterance.pitch = 1; // Tom neutro
    utterance.volume = 1; // Volume máximo

    // Eventos de controle
    utterance.onstart = () => console.log("Leitura iniciada.");
    utterance.onend = () => console.log("Leitura finalizada.");
    utterance.onerror = (e) => console.error("Erro na leitura:", e);

    if (restart || !synth.speaking || synth.paused) {
      synth.speak(utterance);
    } else if (synth.speaking) {
      synth.pause();
    }
  } else {
    alert("Seu navegador não suporta a síntese de fala!");
    console.log("Erro: text-to-speech não suportado.");
  }
};

const getLanguageCode = (lang?: string): string => {
  switch (lang) {
    case "pt":
      return "pt-BR";
    case "fr":
      return "fr-FR";
    case "it":
      return "it-IT";
    case "de":
      return "de-DE";
    case "en":
    default:
      return "en-US";
  }
};

export const pauseSpeech = () => {
  if ("speechSynthesis" in window) {
    const synth = window.speechSynthesis;
    if (synth.speaking) {
      synth.pause();
      console.log("Fala pausada.");
    }
  } else {
    alert("Seu navegador não suporta a síntese de fala!");
    console.log("Erro: text-to-speech não suportado.");
  }
};


