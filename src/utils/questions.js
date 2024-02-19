const questions = [
  {
    id: generateUniqueID(),
    question:
      "WHO IS THE PLAYER WITH THE HIGHEST RATING ON PISTOLS DURING THE 2023 COMPETITIVE SEASON?",
    answers: ["ZYWOO", "S1MPLE", "MONESY", "NIKO"],
    correctAnswer: 0,
  },
  {
    id: generateUniqueID(),
    question: "HOW MUCH MONEY DO YOU GET FOR A KILL WITH A MAC-10?",
    answers: ["475", "450", "500", "600"],
    correctAnswer: 3,
  },
  {
    id: generateUniqueID(),
    question: "FIRST TO HOW MANY ROUNDS IN CS2?",
    answers: ["13", "15", "16", "12"],
    correctAnswer: 0,
  },
  {
    id: generateUniqueID(),
    question: "WHAT IS THE MAX RUNNING SPEED OF THE MODEL WITH A KNIFE?",
    answers: ["240", "250", "260", "230"],
    correctAnswer: 1,
  },
  {
    id: generateUniqueID(),
    question: "HOW MUCH MONEY DO YOU GET FOR A KILL WITH A KNIFE?",
    answers: ["1300", "1350", "1500", "1400"],
    correctAnswer: 2,
  },
  {
    id: generateUniqueID(),
    question: "WHO WAS THE TOP-RANKED CS:GO PLAYER IN 2022?",
    answers: ["SH1RO", "NIKO", "S1MPLE", "ZYWOO"],
    correctAnswer: 2,
  },
  {
    id: generateUniqueID(),
    question:
      "HOW MANY TIMES DID NIKO APPEAR IN THE TOP 10 RANKINGS BETWEEN 2017 AND 2021?",
    answers: ["2", "5", "4", "3"],
    correctAnswer: 0,
  },
  {
    id: generateUniqueID(),
    question:
      "WHO IS THE ONLY PLAYER FROM ISRAEL TO HAVE APPEARED IN THE TOP 20 RANKINGS?",
    answers: ["STYKO", "FLAMEZ", "JAME", "SPINX"],
    correctAnswer: 3,
  },
  {
    id: generateUniqueID(),
    question:
      "WHICH PLAYER FROM DENMARK CONSISTENTLY RANKED IN THE TOP 10 FROM 2017 TO 2019?",
    answers: ["GLA1VE", "DUPREEH", "DEVICE", "MAGISK"],
    correctAnswer: 2,
  },
  {
    id: generateUniqueID(),
    question: "WHAT CALIBER IS THE DESERT EAGLE IN CS:GO?",
    answers: [".50", ".47", ".52", ".53"],
    correctAnswer: 0,
  },
  {
    id: generateUniqueID(),
    question:
      "WHAT IS THE CAPPED DAMAGE OF A MOLOTOV AFTER THE FIRST 3 SECONDS?",
    answers: ["10 DMG/S", "8 DMG/S", "6 DMG/S", "12 DMG/S"],
    correctAnswer: 1,
  },
  {
    id: generateUniqueID(),
    question: "IN WHICH MONTH OF 2024 IS THE FIRST CS2 MAJOR GONNA BE HELD?",
    answers: ["JUNE", "MAY", "JULY", "MARCH"],
    correctAnswer: 3,
  },
];

export default questions;

function generateUniqueID() {
  return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
}
