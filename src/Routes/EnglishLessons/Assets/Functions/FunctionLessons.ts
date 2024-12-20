export const readText = (
  text: string,
  restart: boolean,
  lang?: string,
  voiceNumber?: boolean
) => {
  // Gerenciar o objeto evenOdd no localStorage
  const evenOddKey = "evenOdd";
  const currentEvenOdd = localStorage.getItem(evenOddKey);

  if (currentEvenOdd === null) {
    // Se não existir, cria com valor inicial 1
    localStorage.setItem(evenOddKey, "1");
    console.log(`Criado ${evenOddKey}: 1`);
  } else {
    // Alterna o valor entre 0 e 1
    const newValue = currentEvenOdd === "1" ? "0" : "1";
    localStorage.setItem(evenOddKey, newValue);
    console.log(`Atualizado ${evenOddKey}:`, Number(newValue));
  }

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
    utterance.rate = Number(currentEvenOdd) ? 0.8 : Number(currentEvenOdd); // Velocidade normal
    utterance.pitch = 1; // Tom neutro
    utterance.volume = 1; // Volume máximo

    // Selecionar a voz (se especificada)
    const voices = synth.getVoices();
    const filteredVoices = voices.filter(
      (voice) => voice.lang === "en-US" || voice.lang === "en-GB"
    );
    // const filteredVoices = voices

    console.log(filteredVoices);

    if (voiceNumber) {
      var voiceEdge = voiceNumber ? filteredVoices[7] : filteredVoices[10];
      var voiceChrome = voiceNumber ? filteredVoices[2] : filteredVoices[3];

      utterance.rate = 1; // Velocidade normal
    } else {
      var voiceEdge = Number(currentEvenOdd)
        ? filteredVoices[7]
        : filteredVoices[10];
      var voiceChrome = filteredVoices[3];
    }

    if (voiceEdge) {
      const selectedVoice = voices.find(
        (voice) => voice.name === voiceEdge.name
      );
      if (selectedVoice) {
        utterance.voice = selectedVoice;
        console.log(selectedVoice);
      }
    } else if (voiceChrome) {
      const selectedVoice = voices.find(
        (voice) => voice.name === voiceChrome.name
      );
      if (selectedVoice) {
        utterance.voice = selectedVoice;
        console.log(selectedVoice);
      }
    } else {
      console.log(
        `Voz "${
          voiceChrome + " and " + voiceEdge
        }" não encontrada. Usando a padrão.`
      );
    }

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

// Exemplo de como obter as vozes disponíveis
export const listVoices = () => {
  if ("speechSynthesis" in window) {
    const voices = window.speechSynthesis.getVoices();
    console.log("Vozes disponíveis:", voices);
    return voices;
  } else {
    console.error("speechSynthesis não está disponível no navegador.");
    return [];
  }
};
