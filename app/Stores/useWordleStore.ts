import { create } from "zustand";
import type { LetterColor } from "../Types/Types";
import { wordsData, secretWord } from "../Data/Data";
import { GameState } from "../Enum/Enum";

type WordleState = {
  displayEndGameMessage: boolean;
  errorMessage: { display: boolean; message: string };
  gameState: GameState;
  history: string[];
  historyColor: LetterColor[][];
  letters: string;
  lettersColor: { [key: string]: LetterColor };
  letterState: { [key: string]: number };
  remainingTry: number;
  word: string;
};

type WordleScoreState = {
  wordFind: number[];
  score: number;
};

type WordleAction = {
  addLetterToWord: (letter: string) => void;
  changeEndGameMessageState: (newState: boolean) => void;
  changeErrorMessage: (newDisplayValue: boolean, newMessage: string) => void;
  deleteLastLetter: () => void;
  replay: () => void;
  resetScore: () => void;
  selectWord: () => void;
  verifWord: () => void;
};

const MAXTRY = 6;

const initialState: WordleState = {
  displayEndGameMessage: false,
  errorMessage: {
    display: false,
    message: "",
  },
  gameState: GameState.PENDING,
  letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lettersColor: {
    A: "notPlayed",
    B: "notPlayed",
    C: "notPlayed",
    D: "notPlayed",
    E: "notPlayed",
    F: "notPlayed",
    G: "notPlayed",
    H: "notPlayed",
    I: "notPlayed",
    J: "notPlayed",
    K: "notPlayed",
    L: "notPlayed",
    M: "notPlayed",
    N: "notPlayed",
    O: "notPlayed",
    P: "notPlayed",
    Q: "notPlayed",
    R: "notPlayed",
    S: "notPlayed",
    T: "notPlayed",
    U: "notPlayed",
    V: "notPlayed",
    W: "notPlayed",
    X: "notPlayed",
    Y: "notPlayed",
    Z: "notPlayed",
  },
  letterState: { notPlayed: 0, unknown: 1, wrong: 2, good: 3 },
  history: new Array(MAXTRY).fill(""),
  historyColor: new Array(MAXTRY).fill(new Array(5).fill("notPlayed")),
  remainingTry: MAXTRY,
  word: "",
};

const initialScoreState = {
  wordFind: new Array(MAXTRY).fill(0),
  score: 0,
};

export const useWordleStore = create<
  WordleState & WordleScoreState & WordleAction
>()((set) => ({
  ...initialState,
  ...initialScoreState,
  addLetterToWord: (letter) =>
    set((state) => {
      const newHistory = [...state.history];
      if (newHistory[MAXTRY - state.remainingTry].length >= 5) {
        return {};
      }
      newHistory[MAXTRY - state.remainingTry] += letter.toUpperCase();
      return { history: newHistory };
    }),
  changeEndGameMessageState: (newState) =>
    set(() => ({ displayEndGameMessage: newState })),
  changeErrorMessage: (newDisplayValue: boolean, newMessage: string) =>
    set(() => ({
      errorMessage: {
        display: newDisplayValue,
        message: newMessage,
      },
    })),
  deleteLastLetter: () =>
    set((state) => {
      const newHistory = [...state.history];
      if (newHistory[MAXTRY - state.remainingTry].length <= 0) {
        return {
          errorMessage: {
            display: true,
            message: "Aucune lettre à effacer",
          },
        };
      }
      newHistory[MAXTRY - state.remainingTry] = newHistory[
        MAXTRY - state.remainingTry
      ].slice(0, -1);
      return { history: newHistory };
    }),
  replay: () => set(initialState),
  resetScore: () => set(initialScoreState),
  selectWord: () =>
    set(() => {
      const wordIndex = Math.floor(Math.random() * secretWord.length);
      return { word: secretWord[wordIndex] };
    }),
  verifWord: () =>
    set((state) => {
      if (state.history[MAXTRY - state.remainingTry].length < 5) {
        return {
          errorMessage: {
            display: true,
            message: "Le mot saisi doit contenir 5 lettres",
          },
        };
      }
      if (!wordsData.includes(state.history[MAXTRY - state.remainingTry])) {
        return {
          errorMessage: {
            display: true,
            message: "Le mot proposé est invalide",
          },
        };
      }
      let score = state.score;
      const wordFind = [...state.wordFind];
      const lettersColor = { ...state.lettersColor };
      let gameState: GameState = state.gameState;
      const historyColor = [...state.historyColor];
      const secretWord = state.word.toUpperCase();
      const proposition = state.history[MAXTRY - state.remainingTry];
      const controlLetter = secretWord.split("");
      const propositionColor: LetterColor[] = [
        "notPlayed",
        "notPlayed",
        "notPlayed",
        "notPlayed",
        "notPlayed",
      ];

      for (let i = 0; i < 5; i++) {
        if (proposition[i] === controlLetter[i]) {
          propositionColor[i] = "good";
          lettersColor[proposition[i]] = "good";
          controlLetter[i] = "_";
        }
      }

      for (let i = 0; i < 5; i++) {
        if (propositionColor[i] === "good") {
          continue;
        }
        if (controlLetter.includes(proposition[i])) {
          propositionColor[i] = "wrong";
          lettersColor[proposition[i]] =
            lettersColor[proposition[i]] === "notPlayed"
              ? "wrong"
              : lettersColor[proposition[i]];
          controlLetter[controlLetter.indexOf(proposition[i])] = "_";
        } else {
          propositionColor[i] = "unknown";
          lettersColor[proposition[i]] =
            lettersColor[proposition[i]] === "notPlayed"
              ? "unknown"
              : lettersColor[proposition[i]];
        }
      }

      if (proposition === state.word.toUpperCase()) {
        gameState = GameState.WON;
        wordFind[MAXTRY - state.remainingTry] += 1;
        score += state.remainingTry * 10;
      } else if (state.remainingTry - 1 === 0) {
        gameState = GameState.LOST;
      }
      historyColor[MAXTRY - state.remainingTry] = [...propositionColor];

      return {
        score: score,
        wordFind: wordFind,
        gameState: gameState,
        lettersColor: lettersColor,
        historyColor: historyColor,
        remainingTry: state.remainingTry - 1,
      };
    }),
}));
