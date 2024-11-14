import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRedo, FaCheck } from "react-icons/fa";
import Confetti from "react-confetti";
import CountUp from "react-countup";
import { useMediaQuery } from "react-responsive";
import { Button, TextField } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4CAF50",
    },
    secondary: {
      main: "#FF7043",
    },
  },
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  text-align: center;
`;

const Message = styled(motion.p)`
  font-size: 1.25rem;
  color: ${({ success }) => (success ? "#4CAF50" : "#FF7043")};
  margin: 1rem 0;
`;

function App() {
  const [numberToGuess, setNumberToGuess] = useState(generateRandomNumber());
  const [userGuess, setUserGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const handleGuess = () => {
    const guess = parseInt(userGuess, 10);
    setAttempts(attempts + 1);

    if (isNaN(guess)) {
      toast.error("Por favor, introduce un número válido.");
    } else if (guess < numberToGuess) {
      setMessage("Demasiado bajo. ¡Intenta con un número más alto!");
    } else if (guess > numberToGuess) {
      setMessage("Demasiado alto. ¡Intenta con un número más bajo!");
    } else {
      setMessage(`¡Felicidades! Adivinaste el número.`);
      setGameWon(true);
      toast.success(`¡Ganaste en ${attempts + 1} intentos!`);
    }
  };

  const handleReset = () => {
    setNumberToGuess(generateRandomNumber());
    setUserGuess("");
    setMessage("");
    setAttempts(0);
    setGameWon(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <ToastContainer />
        <Title>Juego de Adivinanza</Title>
        {gameWon && <Confetti />}
        <p>Adivina el número entre 1 y 100</p>
        <TextField
          variant="outlined"
          label="Tu Adivinanza"
          type="number"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          style={{ margin: "10px", width: isMobile ? "80%" : "300px" }}
          color="primary"
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<FaCheck />}
          onClick={handleGuess}
          style={{ margin: "5px" }}
        >
          Adivinar
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<FaRedo />}
          onClick={handleReset}
          style={{ margin: "5px" }}
        >
          Reiniciar
        </Button>
        <Message
          success={gameWon}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {message}
        </Message>
        <p>
          Intentos:{" "}
          <CountUp start={0} end={attempts} duration={0.5} />
        </p>
      </Container>
    </ThemeProvider>
  );
}

export default App;
