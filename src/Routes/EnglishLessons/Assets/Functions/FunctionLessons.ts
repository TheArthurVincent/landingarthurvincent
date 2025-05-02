import { toast } from "react-toastify";
const notifyError = (message: string) => {
  const existing = document.getElementById("voice-error-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "voice-error-toast";
  toast.innerText = message;
  toast.style.position = "fixed";
  toast.style.top = "20px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "#f44336";
  toast.style.color = "white";
  toast.style.padding = "10px 20px";
  toast.style.borderRadius = "8px";
  toast.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
  toast.style.zIndex = "9999";
  toast.style.fontFamily = "sans-serif";

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
};
export const readText = (
  text: string,
  restart: boolean,
  lang?: string,
  chosenVoice?: string,
  voiceBoolean?: boolean
) => {
  if (!("speechSynthesis" in window)) {
    notifyError("Seu navegador não suporta a síntese de fala!");
    return;
  }

  const numberReviewsToday = JSON.parse(
    localStorage.getItem("loggedIn") || "{}"
  ).flashCardsReviewsToday;
  const ehPar = (nm: number) => nm % 2 === 0;
  const isEven = ehPar(numberReviewsToday);
  const synth = window.speechSynthesis;

  if (!synth) {
    console.error("speechSynthesis não está disponível.");
    return;
  }

  if (restart) {
    synth.cancel();
  }

  const loadVoices = (): Promise<SpeechSynthesisVoice[]> => {
    return new Promise((resolve) => {
      let voices = synth.getVoices();
      if (voices.length !== 0) {
        resolve(voices);
      } else {
        synth.addEventListener("voiceschanged", () => {
          voices = synth.getVoices();
          resolve(voices);
        });
      }
    });
  };

  const speak = async () => {
    const voices = await loadVoices();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = getLanguageCode(lang);
    utterance.rate = 0.9;
    utterance.pitch = 0.9;
    utterance.volume = 1;

    const detectBrowser = () => {
      var ua = navigator.userAgent;

      if (/Edg/.test(ua)) return "Edge";
      if (/OPR/.test(ua)) return "Opera";
      if (/Chrome/.test(ua) && !/Edg/.test(ua)) return "Chrome";
      if (/Safari/.test(ua) && !/Chrome/.test(ua)) return "Safari";
      if (/Firefox/.test(ua)) return "Firefox";
      if (/MSIE|Trident/.test(ua)) return "Internet Explorer";

      return "Desconhecido";
    };
    const userAgent = detectBrowser();
    let selectedVoice;

    if (chosenVoice) {
      selectedVoice = voices.find((v) => v.name === chosenVoice);
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    } else {
      const voicesHere = voices.filter((v) => v.lang.includes(lang || ""));
      if (userAgent === "Opera") {
        notifyError(
          "Seu navegador não suporta este recurso de voz. Tente o Edge ou o Chrome"
        );
        console.log(
          "Seu navegador não suporta este recurso de voz. Tente o Edge ou o Chrome"
        );

        return;
      }

      if (userAgent === "Edge" && !isEven && voicesHere[1]) {
        utterance.voice = voicesHere[1];
      } else if (userAgent === "Chrome" && !isEven && voicesHere[2]) {
        utterance.voice = voicesHere[2];
      } else {
        utterance.voice = voicesHere[0];
      }
    }

    utterance.onerror = (e) => {
      synth.speak(e.utterance);
    };

    synth.speak(utterance);
  };

  speak();
};

const getLanguageCode = (lang?: string): string => {
  switch (lang) {
    case "en":
      return "en-US";
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

export const listVoices = () => {
  if ("speechSynthesis" in window) {
    const voices = window.speechSynthesis.getVoices();
    return voices;
  } else {
    console.error("speechSynthesis não está disponível no navegador.");
    return [];
  }
};
