import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./Application/SelectLanguage/SelectLanguage";
import AppFooter from "./Routes/Footer/Footer";
import { backDomain, LogoSVG } from "./Resources/UniversalComponents";
import { primaryColor, secondaryColor } from "./Styles/Styles";
import axios from "axios";

function App() {
  const myLogo = LogoSVG(primaryColor(), secondaryColor(), 4);

  const styles = {
    section: {
      width: "100%",
      padding: "60px 20px",
      backgroundColor: "#f5f5f5",
      textAlign: "center",
    },
    heading: {
      fontSize: "28px",
      marginBottom: "30px",
      color: "#333",
    },
    videoWrapper: {},
    iframe: {},
  };
  const videos = [
    {
      title: "🃏 Flashcards",
      description: "Memorize vocabulário com técnica de repetição espaçada.",
      url: "https://www.youtube.com/embed/bobVcB0crX4",
    },
    {
      title: "🎧 Listening",
      description:
        "Melhore sua compreensão auditiva com conteúdos adaptados ao seu nível.",
      url: "https://www.youtube.com/embed/4wFkC5XOytI",
    },
    {
      title: "📚 Conteúdo Completo",
      description:
        "Acesse cursos organizados do nível básico ao avançado. Aprenda gramática, vocabulário, leitura, escuta e conversação com métodos práticos, objetivos e eficientes.",
      url: "https://www.youtube.com/embed/Bz7c-kT6tyE",
    },
    {
      title: "🗣️ Clube de Conversação",
      description:
        "Participe de encontros ao vivo para praticar o inglês com outros alunos e professores.",
      url: "https://www.youtube.com/embed/g4YGm9G9SUw",
    },

    {
      title: "🧠 Sentence Mining",
      description:
        "Aprenda vocabulário e gramática a partir de frases reais e úteis.",
      url: "https://www.youtube.com/embed/a3IOJN_n5VI",
    },
  ];
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const [booleanLeadsCapture, setLeadsCapture] = useState<boolean>(true);
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });
  const leadsCapture = async () => {
    if (
      booleanLeadsCapture &&
      form.name !== "" &&
      form.phoneNumber !== "" &&
      form.email !== ""
    ) {
      try {
        const theContent = {
          name: form.name,
          phoneNumber: form.phoneNumber,
          email: form.email,
        };
        const response = await axios.post(
          `${backDomain}/api/v1/leads`,
          theContent
        );
        console.log("Foi pro banco!", response);
        setLeadsCapture(false);
      } catch (error) {
        console.error("Erro ao capturar lead", error);
      }
    }
  };

  useEffect(() => {
    const allFilled =
      form.name.trim() !== "" &&
      form.phoneNumber.trim().length >= 11 &&
      form.email.trim().includes("@");

    if (booleanLeadsCapture && allFilled) {
      leadsCapture();
    }
  }, [form.name, form.phoneNumber, form.email]);

  const routes = [
    {
      path: "/*",
      element: (
        <div className="container">
          <section className="hero-section thesection-1">
            <div className="hero-grid">
              <div
                style={{
                  padding: "1rem",
                  display:"grid",
                  justifyContent:"right",
                justifyItems:"center"
                }}
                className="hero-text"
              >
                {myLogo}
                <p className="hero-subtitle">
                  Você precisa aprender inglês! <br />
                  Você quer aprender inglês! <br />
                  Você vai aprender inglês!
                </p>
                <a
                  style={{ backgroundColor: secondaryColor() }}
                  target="_blank"
                  href="https://portal.arthurvincent.com.br/signup"
                  className="cta-button"
                >
                  Quero, preciso e vou aprender inglês!
                </a>
              </div>

              <div className="hero-image">
                <img
                  src="https://ik.imagekit.io/vjz75qw96/assets/icons/eu?updatedAt=1749480447421"
                  alt="Arthur"
                />
              </div>
            </div>
          </section>

          {/* Benefícios */}
          <section className="benefits-section thesection-2">
            <h2 className="section-title">
              Por que aprender em minha plataforma?
            </h2>
            <div className="benefits-cards">
              {videos.map((video: any, index: any) => (
                <div
                  key={index}
                  className="benefit-card"
                  onClick={() => setSelectedVideo(video)}
                  style={{ cursor: "pointer" }}
                >
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                </div>
              ))}

              {selectedVideo && (
                <div
                  className="modal-overlay"
                  onClick={() => setSelectedVideo(null)}
                >
                  <div
                    className="modal-content"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <iframe
                      width="100%"
                      height="315"
                      src={selectedVideo.url}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <button
                      className="close-button"
                      onClick={() => setSelectedVideo(null)}
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
          <section className="hero-section thesection-1 padding-yes">
            <h2 className="section-title">🎥 Tudo sobre a plataforma!</h2>
            <div
              style={{
                position: "relative",
                paddingBottom: "56.25%", // 16:9 aspect ratio
                paddingTop: "25px",
                height: 0,
                maxWidth: "960px",
                margin: "0 auto",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              <iframe
                src="https://www.youtube.com/embed/qUiHhLsyiIw"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
              />
            </div>
            <a
              style={{
                textAlign: "center",
                backgroundColor: secondaryColor(),
              }}
              target="_blank"
              href="https://portal.arthurvincent.com.br/signup"
              className="cta-button"
            >
              Quero, preciso e vou aprender inglês!
            </a>
          </section>
          <section className="benefits-section thesection-2">
            <h2 className="section-title">💬 Veja o que dizem os alunos</h2>
            <div className="testimonial-scroller">
              {[
                "https://www.youtube.com/embed/-eSmGb2CkPY",
                "https://www.youtube.com/embed/X0T1y17ycN8",
                "https://www.youtube.com/embed/hPnj2UgXZUU",
                "https://www.youtube.com/embed/uLl_ak4AMOk",
              ].map((url, index) => (
                <div className="testimonial-video" key={index}>
                  <iframe
                    src={url}
                    title={`Depoimento ${index + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          </section>
          <AppFooter see={true} />
        </div>
      ),
    },
  ];

  return (
    <div>
      <UserProvider>
        <Router>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
