import { useState } from "react";
import MonacoEditor from "@monaco-editor/react";

type TestProps = {
  target: any;
  language: string;
};

const Test: React.FC<TestProps> = ({ target, language }) => {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(false);

  const checkAnswer = () => {
    setResult(inputText === target);
  };

  // Credit: https://nextform.app/blog/syntax-highlighting-with-nextjs

  return (
    <div className="w-full flex flex-row">
      <MonacoEditor
        className="flex-1"
        language={language}
        value={inputText}
        theme="vs-dark"
        onChange={(v) => setInputText(v || "")}
        options={{ minimap: { enabled: false } }}
      />
      <div className="flex-1">
        <button onClick={checkAnswer}>Check</button>
        <p className={result === true ? "text-emerald-500" : "text-red-400"}>{String(result)}</p>
      </div>
    </div>
  );
};

export default Test;
