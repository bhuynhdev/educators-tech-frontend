import { visit } from "unist-util-visit";
import { map } from "unist-util-map";
import { h } from "hastscript";

export function remarkCreateCodeQuiz() {
  return (tree) => {
    visit(tree, "code", (node) => {
      if (node.meta === "quiz") {
        node.type = "quiz";
      }
    });
  };
}

export function rehypeCodeQuiz() {
  return (tree) => {
    return map(tree, (node) => {
      if (node.type === "quiz") {
        const hastNode = h("quiz", node.value);
        return {
          ...hastNode,
          answer: node.value,
          language: node.lang,
        };
      }

      return node;
    });
  };
}
