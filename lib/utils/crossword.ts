import type { CrossWordDataInputItem } from "../components/CrossWord";

import crosswordLayoutGenerate from "crossword-layout-generator";

import { compileCrossword } from "crosswords-js";

type CrosswordLayoutDataItem = {
  clue: string;
  answer: string;
  startx: number;
  starty: number;
  position: number;
  orientation: "across" | "down" | "none";
};

type CrosswordLayoutDataResult = {
  rows: number;
  cols: number;
  result: Array<CrosswordLayoutDataItem>;
};

// Data type to for https://github.com/dwmkerr/crosswords-js
type CrosswordInfoItem = {
  x: number;
  y: number;
  clue: string;
};

type CrossWordDefinition = {
  width: number;
  height: number;
  acrossClues: Array<CrosswordInfoItem>;
  downClues: Array<CrosswordInfoItem>;
};

const generateCrosswordLayout = (inputData: Array<CrossWordDataInputItem>) => {
  const generated: CrosswordLayoutDataResult = crosswordLayoutGenerate.generateLayout(inputData);
  return generated;
};

// Transform input data to fit with https://github.com/dwmkerr/crosswords-js
const transformLayoutData = (layoutData: CrosswordLayoutDataResult) => {
  let acrossItems: Array<CrosswordInfoItem> = [];
  let downItems: Array<CrosswordInfoItem> = [];
  layoutData.result.forEach(({ orientation, ...layout }) => {
    const infoItem: CrosswordInfoItem = { x: layout.startx, y: layout.starty, clue: `${layout.position}. ${layout.clue} (${layout.answer.length})` };
    if (orientation === "across") {
      acrossItems.push(infoItem);
    } else if (orientation === "down") {
      downItems.push(infoItem);
    }
  });

  return {
    width: Math.max(layoutData.cols, layoutData.rows),
    height: Math.max(layoutData.cols, layoutData.rows),
    acrossClues: acrossItems,
    downClues: downItems
  } as CrossWordDefinition;
};

export function generateCrosswordFinalData(inputData: Array<CrossWordDataInputItem>) {
  const layoutData = generateCrosswordLayout(inputData);
  const crosswordDefinition = transformLayoutData(layoutData);
  console.log("definition", crosswordDefinition);
  const compiledData = compileCrossword(crosswordDefinition);
  console.log("Compiled data", compiledData);
  return compiledData;
}
