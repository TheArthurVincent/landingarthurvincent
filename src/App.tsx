import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./Application/SelectLanguage/SelectLanguage";
import NewStudentAsaas from "./Routes/NewStudentAsaas/NewStudentAsaas";
import { HOne } from "./Resources/Components/RouteBox";
import AppFooter from "./Routes/Footer/Footer";

function App() {
  const routes = [
    { path: "/cadastro", element: <NewStudentAsaas /> },
    {
      path: "/*",
      element: (
        <>
          <div className="container">
            {/* Hero */}
            <section className="hero">
              <HOne className="title">Domine o Inglês com Confiança!</HOne>
              <p className="subtitle">
                Você vai precisa inglês!
                <br />
                Você vai quer inglês!
                <br />
                Você vai aprender inglês!
              </p>
              <a href="#formbelow" className="ctaButton">
                Quero começar agora
              </a>
              <h2 className="sectionTitle">Inscreva-se Gratuitamente</h2>
              <form className="form">
                <input type="text" placeholder="Seu nome" required />
                <input type="email" placeholder="Seu e-mail" required />
                <button type="submit">Enviar</button>
              </form>
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
            <section id="formbelow">
              <NewStudentAsaas />
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
