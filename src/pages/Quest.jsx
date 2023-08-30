const Quest = ({ question, setQuestion }) => {
  return (
    <div>
      <h1>Write Quest Name</h1>
      <input
        autoFocus
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button>Enter</button>
    </div>
  );
};

export default Quest;
