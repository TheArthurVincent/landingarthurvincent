import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./Application/SelectLanguage/SelectLanguage";
import AppFooter from "./Routes/Footer/Footer";

function App() {
  const routes = [
    {
      path: "/*",
      element: (
        <div className="container">
          {/* Hero */}
          <section className="hero-section">
            <h1 className="hero-title">Domine o Inglês com Confiança!</h1>
            <p className="hero-subtitle">
              Você precisa aprender inglês! <br />
              Você quer aprender inglês! <br />
              Você vai aprender inglês!
            </p>
            <div className="hero-content">
              <div className="form-container">
                <h2 className="form-title">Inscreva-se</h2>
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


<section className="benefits-section">
  <h2 className="section-title">
    Por que aprender em minha plataforma?
  </h2>
  <div className="benefits-cards">

    <div className="benefit-card">
      <h3>📚 Conteúdo Completo</h3>
      <p>
        Acesse cursos organizados do nível básico ao avançado. Aprenda gramática, vocabulário, leitura, escuta e conversação com métodos práticos, objetivos e eficientes.
      </p>
    </div>

    <div className="benefit-card">
      <h3>🗣️ Conversação em Grupo</h3>
      <p>
        Participe de sessões semanais com outros alunos para praticar inglês em situações reais. Tenha apoio ao vivo para ganhar confiança ao se comunicar.
      </p>
    </div>

    <div className="benefit-card">
      <h3>🧠 Flashcards Inteligentes</h3>
      <p>
        Memorize vocabulário com o sistema de repetição espaçada. Aprenda de forma ativa, divertida e com retenção de longo prazo.
      </p>
    </div>

    <div className="benefit-card">
      <h3>🎧 Aulas Interativas</h3>
      <p>
        Vá além do tradicional: estude com frases com áudio, diálogos reais, vídeos contextualizados e exercícios que te colocam em contato com o inglês vivo.
      </p>
    </div>

    <div className="benefit-card">
      <h3>👂 Exercícios de Listening</h3>
      <p>
        Desenvolva sua escuta com atividades focadas em compreensão auditiva e pronúncia, usando áudios naturais e variados.
      </p>
    </div>

    <div className="benefit-card">
      <h3>🔎 Mineração de Sentenças</h3>
      <p>
        Aprenda a buscar frases reais com palavras que deseja aprender e transforme essas descobertas em novos flashcards personalizados.
      </p>
    </div>

    <div className="benefit-card">
      <h3>📞 Contato Direto com o Professor</h3>
      <p>
        Receba suporte pela plataforma.
      </p>
    </div>

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
