import reactInnerText from "react-innertext";
import { generateCrosswordFinalData } from "../utils/crossword";
import { CrosswordDOM } from "crosswords-js";
import { useEffect, useRef } from "react";

type CrossWordProps = {
  children: any;
};

//  Object {clue: ..., answer: ...} to suit with "crossword-layout-generator" library
export type CrossWordDataInputItem = {
  clue: string;
  answer: string;
};

const CrossWord: React.FC<CrossWordProps> = ({ children }) => {
  const lines = reactInnerText(children).trim().split("\r\n");
  const crossWordData: Array<CrossWordDataInputItem> = lines.map((lineText) => {
    const [definition, explanation] = lineText.split(";");
    return { clue: explanation, answer: definition };
  });

  const cwRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // console.log(CrosswordsDOM);
    if (typeof window !== "undefined" && cwRef.current !== null) {
      const crosswordModel = generateCrosswordFinalData(crossWordData);
      new CrosswordDOM(window, crosswordModel, cwRef.current);
    }

    // Remove all child element: https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
    return () => {
      const myNode = cwRef.current;
      if (myNode !== null) {
        while (myNode.firstChild) {
          myNode.removeChild(myNode.lastChild!);
        }
      }
    };
  }, [crossWordData]);

  return <div className="w-56 h-56" ref={cwRef}></div>;
};

export default CrossWord;
