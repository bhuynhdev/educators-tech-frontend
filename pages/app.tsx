import rehypeHighlight from "rehype-highlight";
import ReactMarkdown from "react-markdown";
import remarkDirective from "remark-directive";
import remarkDirectiveRehype from "remark-directive-rehype";
import { rehypeCodeQuiz, remarkCreateCodeQuiz } from "../lib/utils/markdownPlugins";
import { useEffect, useState } from "react";
import Test from "../lib/components/Quiz";
import MonacoEditor from "@monaco-editor/react";
import CrossWord from "../lib/components/CrossWord";
import { useAuth } from "../src/context/auth-context";
import { useRouter } from "next/router";

const componentsOptions = {
  /* @ts-ignore */
  quiz: ({ node }) => {
    return <Test target={node.answer} language={node.language} />;
  },

  cw: ({ children }) => {
    return <CrossWord children={children} />;
  }
};

const MarkdownApp = ({ markdown, setMarkdown, handleUpdate }) => {
  const [toRender, setToRender] = useState("");

  const handleCompile = () => {
    setToRender(markdown);
    handleUpdate();
  };

  return (
    <div className="grid grid-cols-2 h-screen">
      <div>
        <div>
          <button onClick={handleCompile}>Compile</button>
        </div>

        <div id="markdown" className="h-full">
          <MonacoEditor
            height="90vh"
            theme="vs-dark"
            defaultLanguage="markdown"
            value={markdown}
            onChange={(value) => {
              setMarkdown(value || "");
            }}
          />
        </div>
      </div>

      <div>
        <div id="markdown-result" className="bg-slate-200 w-full h-full text-black flex flex-col gap-1">
          <ReactMarkdown
            remarkPlugins={[remarkCreateCodeQuiz, remarkDirective, remarkDirectiveRehype]}
            remarkRehypeOptions={{ passThrough: ["quiz"] }}
            rehypePlugins={[rehypeCodeQuiz, rehypeHighlight]}
            components={componentsOptions}
          >
            {toRender}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default MarkdownApp;
