import { useState } from "react";

const questions = [
  {
    question: "She _____ to the office every day by train.",
    choices: ["A. commute", "B. commutes", "C. commuted", "D. commuting"],
    answer: "B",
    explanation: "主語がShe（三人称単数）なので、動詞にsをつけてcommutesが正解。"
  },
  {
    question: "The meeting has been _____ until next Monday.",
    choices: ["A. postponed", "B. postpone", "C. postponing", "D. postpones"],
    answer: "A",
    explanation: "has beenの後は過去分詞。postponedが正解。「延期された」という意味。"
  },
  {
    question: "Please submit your report _____ the end of this week.",
    choices: ["A. until", "B. by", "C. during", "D. while"],
    answer: "B",
    explanation: "期限を表すにはbyを使う。「今週末までに提出してください」という意味。"
  },
  {
    question: "The new product was well _____ by customers.",
    choices: ["A. received", "B. receive", "C. receiving", "D. reception"],
    answer: "A",
    explanation: "was well receivedで「好評だった」という意味の受動態。"
  },
  {
    question: "He is responsible _____ managing the entire project.",
    choices: ["A. of", "B. to", "C. for", "D. with"],
    answer: "C",
    explanation: "responsible forで「〜に責任がある」という意味の定型表現。"
  },
];

function App() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[current];

  const handleSelect = (choice) => {
    if (selected) return;
    setSelected(choice);
    if (choice.startsWith(q.answer)) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent(current + 1);
      setSelected(null);
    }
  };

  const handleReset = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif", padding: "0 20px", textAlign: "center" }}>
        <h1>結果発表</h1>
        <p style={{ fontSize: 32 }}>{score} / {questions.length} 問正解</p>
        <button onClick={handleReset} style={{ padding: "10px 24px", fontSize: 16, cursor: "pointer" }}>
          もう一度挑戦
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif", padding: "0 20px" }}>
      <h1>TOEIC練習アプリ</h1>
      <p style={{ color: "#888" }}>{current + 1} / {questions.length} 問</p>
      <p style={{ fontSize: 20, marginBottom: 24 }}>{q.question}</p>

      {q.choices.map((c, i) => (
        <button key={i} onClick={() => handleSelect(c)}
          style={{
            display: "block", width: "100%", textAlign: "left",
            padding: "12px 16px", margin: "8px 0", fontSize: 16,
            cursor: selected ? "default" : "pointer",
            borderRadius: 8, border: "1px solid #ddd",
            background: selected
              ? c.startsWith(q.answer)
                ? "#c8f7c5"
                : selected === c ? "#f7c5c5" : "#f9f9f9"
              : "#f9f9f9",
          }}>
          {c}
        </button>
      ))}

      {selected && (
        <div style={{ marginTop: 16, padding: 16, background: "#fffbe6", borderRadius: 8 }}>
          <strong>解説：</strong>{q.explanation}
        </div>
      )}

      {selected && (
        <button onClick={handleNext}
          style={{ marginTop: 16, padding: "10px 24px", fontSize: 16, cursor: "pointer" }}>
          {current + 1 >= questions.length ? "結果を見る" : "次の問題"}
        </button>
      )}
    </div>
  );
}

export default App;