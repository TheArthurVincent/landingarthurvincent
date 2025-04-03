import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";
import { backDomain } from "../../Resources/UniversalComponents";
import { secondaryColor, textTitleFont } from "../../Styles/Styles";
import { HOne, HTwo } from "../../Resources/Components/RouteBox";

export default function Cadastro() {
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    username: "",
    phoneNumber: "",
    cpfCnpj: "",
    email: "",
    dateOfBirth: "",
    doc: "",
    address: "",
    password: "",
    creditCardNumber: "",
    creditCardHolderName: "",
    creditCardExpiryMonth: "",
    creditCardExpiryYear: "",
    creditCardCcv: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${backDomain}/api/v1/cadastro`, form);
      const { customer, subscription } = response.data;

      alert(`Pagamento aprovado! 
      ID da Assinatura: ${subscription.id} 
      Próxima Fatura: ${subscription.nextDueDate} 
      Status: ${subscription.status}`);

      console.log("Dados completos:", response.data);
    } catch (err) {
      setError("Erro ao cadastrar. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const styles: any = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      maxWidth: "900px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "20px",
    },
    grid2: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
    },
    column: {
      display: "flex",
      flexDirection: "column",
      background: "#f9f9f9",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
    input: {
      marginBottom: "10px",
      padding: "10px",
      fontSize: "16px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    button: {
      padding: "10px",
      fontSize: "16px",
      backgroundColor: "#007BFF",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      marginTop: "20px",
    },
    error: {
      color: "red",
      marginTop: "10px",
    },
    responsiveGrid: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <HOne>Cadastro</HOne>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.grid}>
          {/* 📌 COLUNA 1 - DADOS PESSOAIS */}
          <div style={styles.column}>
            <HTwo>Dados Pessoais</HTwo>
            <div style={styles.grid2}>
              <input
                type="text"
                name="name"
                placeholder="Nome"
                value={form.name}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <input
                type="text"
                name="lastname"
                placeholder="Sobrenome"
                value={form.lastname}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={form.email}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <input
                type="text"
                name="cpfCnpj"
                placeholder="CPF ou CNPJ"
                value={form.cpfCnpj}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <input
                type="text"
                name="username"
                placeholder="Nome de usuário"
                value={form.username}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Número de telefone"
                value={form.phoneNumber}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <input
                type="date"
                name="dateOfBirth"
                placeholder="Data de nascimento"
                value={form.dateOfBirth}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <input
                type="password"
                name="password"
                placeholder="Senha"
                value={form.password}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
          </div>

          {/* 📌 COLUNA 2 - ENDEREÇO */}
          <div style={styles.column}>
            <HTwo>Endereço</HTwo>
            <input
              type="text"
              name="address"
              placeholder="Endereço completo"
              value={form.address}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          {/* 📌 COLUNA 3 - DADOS DO CARTÃO */}
          <div style={styles.column}>
            <HTwo>Dados do Cartão</HTwo>
            <div style={styles.grid2}>
              <input
                type="text"
                name="creditCardNumber"
                placeholder="Número do Cartão"
                value={form.creditCardNumber}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <input
                type="text"
                name="creditCardHolderName"
                placeholder="Nome no Cartão"
                value={form.creditCardHolderName}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <input
                type="text"
                name="creditCardExpiryMonth"
                placeholder="Mês de Expiração (MM)"
                value={form.creditCardExpiryMonth}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <input
                type="text"
                name="creditCardExpiryYear"
                placeholder="Ano de Expiração (AAAA)"
                value={form.creditCardExpiryYear}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <input
                type="text"
                name="creditCardCcv"
                placeholder="CVV"
                value={form.creditCardCcv}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
          </div>
        </div>

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
}
