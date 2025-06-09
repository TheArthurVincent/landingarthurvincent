import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./Application/SelectLanguage/SelectLanguage";
import { HOne } from "./Resources/Components/RouteBox";
import AppFooter from "./Routes/Footer/Footer";

function App() {
  const routes = [
    {
      path: "/*",
      element: (
        <>
          <div className="container">
            {/* Hero */}
            <section className="hero-section">
              <h1 className="hero-title">Domine o Inglês com Confiança!</h1>
              <p className="hero-subtitle">
                Você vai precisar inglês! <br />
                Você vai querer inglês! <br />
                Você vai aprender inglês!
              </p>

              <div className="hero-content">
                <div className="form-container">
                  <h2 className="form-title">Inscreva-se Gratuitamente</h2>
                  <form className="signup-form">
                    <input type="text" placeholder="Seu nome" required />
                    <input type="email" placeholder="Seu e-mail" required />
                    <input type="tel" placeholder="Seu telefone" required />
                    <button type="submit">Enviar</button>
                  </form>
                  <a
                    target="_blank"
                    href="https://portal.arthurvincent.com.br/signup"
                    className="cta-button"
                  >
                    Quero começar agora
                  </a>
                </div>

                <div className="image-container">
                  <img
                    src="https://ik.imagekit.io/vjz75qw96/assets/icons/Captura%20de%20tela%202025-06-09%20114556.png?updatedAt=1749480668327"
                    alt="Arthur"
                  />
                </div>
              </div>
            </section>

            {/* Benefícios */}
            <section className="benefits">
              <h2 className="sectionTitle">Por que aprender com a gente?</h2>
              <div className="cards">
                <div className="card">
                  <h3>📚 Conteúdo Completo</h3>
                  <p>
                    Da gramática ao vocabulário do dia a dia, tudo o que você
                    precisa para falar inglês.
                  </p>
                </div>
                <div className="card">
                  <h3>🎧 Aulas Interativas</h3>
                  <p>
                    Aprenda com diálogos, exercícios com áudio e vídeos
                    dinâmicos.
                  </p>
                </div>
                <div className="card">
                  <h3>💬 Suporte Individual</h3>
                  <p>
                    Tire dúvidas diretamente com o professor e tenha feedback
                    personalizado.
                  </p>
                </div>
              </div>
            </section>
            <AppFooter see={true} />
          </div>
        </>
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
