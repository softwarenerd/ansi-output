/*---------------------------------------------------------------------------------------------
 *  Copyright (C) 2023 Brian Lambert. All rights reserved.
 *--------------------------------------------------------------------------------------------*/

import { CR, CRLF } from "./constants";
import { makeCUB, makeCUD, makeCUF, makeCUP, makeCUU } from "./ansi";
import { ANSIOutput } from "../src/ansi-output";
import { checkOutputPosition, getOutputColumn, getOutputLine, setOutputColumn, setOutputPosition } from "./helpers";

test("Tests CUU", () => {
    // Setup.
    const rows = 25;
    const test0s = "0".repeat(80);
    const ansiOutput = new ANSIOutput();
    for (let i = 0; i < rows; i++) {
        ansiOutput.processOutput(test0s);
        ansiOutput.processOutput(i === rows - 1 ? CR : CRLF);
    }
    
    // Test.
    checkOutputPosition(ansiOutput, 24, 0);
    ansiOutput.processOutput(makeCUU());
    checkOutputPosition(ansiOutput, 23, 0);
    ansiOutput.processOutput(makeCUU(10));
    checkOutputPosition(ansiOutput, 13, 0);
    ansiOutput.processOutput(makeCUU(20));
    checkOutputPosition(ansiOutput, 0, 0);
});

test("Tests CUD", () => {
    // Setup.
    const rows = 25;
    const test0s = "0".repeat(80);
    const ansiOutput = new ANSIOutput();
    for (let i = 0; i < rows; i++) {
        ansiOutput.processOutput(test0s);
        ansiOutput.processOutput(i === rows - 1 ? CR : CRLF);
    }
    setOutputPosition(ansiOutput, 0, 0);
       
    // Test.
    expect(getOutputLine(ansiOutput)).toBe(0);
    expect(getOutputColumn(ansiOutput)).toBe(0);
    ansiOutput.processOutput(makeCUD());
    expect(getOutputLine(ansiOutput)).toBe(1);
    ansiOutput.processOutput(makeCUD(10));
    expect(getOutputLine(ansiOutput)).toBe(11);
    ansiOutput.processOutput(makeCUD(100));
    expect(getOutputLine(ansiOutput)).toBe(111);
});

test("Tests CUF", () => {
    // Setup.
    const ansiOutput = new ANSIOutput();
    ansiOutput.processOutput("0".repeat(80));
    setOutputColumn(ansiOutput, 0);
       
    // Test.
    expect(getOutputLine(ansiOutput)).toBe(0);
    expect(getOutputColumn(ansiOutput)).toBe(0);
    ansiOutput.processOutput(makeCUF());
    expect(getOutputLine(ansiOutput)).toBe(0);
    expect(getOutputColumn(ansiOutput)).toBe(1);
    ansiOutput.processOutput(makeCUF(10));
    expect(getOutputLine(ansiOutput)).toBe(0);
    expect(getOutputColumn(ansiOutput)).toBe(11);    
    ansiOutput.processOutput(makeCUF(100));
    expect(getOutputLine(ansiOutput)).toBe(0);
    expect(getOutputColumn(ansiOutput)).toBe(111);
});

test("Tests CUB", () => {
    // Setup.
    const ansiOutput = new ANSIOutput();
    ansiOutput.processOutput("0".repeat(80));
       
    // Test.
    checkOutputPosition(ansiOutput, 0, 80);
    ansiOutput.processOutput(makeCUB());
    checkOutputPosition(ansiOutput, 0, 79);
    ansiOutput.processOutput(makeCUB(10));
    checkOutputPosition(ansiOutput, 0, 69);
    ansiOutput.processOutput(makeCUB(100));
    checkOutputPosition(ansiOutput, 0, 0);
});

test("Tests CUP", () => {
    // Setup.
    const rows = 25;
    const test0s = "0".repeat(80);
    const ansiOutput = new ANSIOutput();
    for (let i = 0; i < rows; i++) {
        ansiOutput.processOutput(test0s);
        ansiOutput.processOutput(i === rows - 1 ? CR : CRLF);
    }

    // Test.
    checkOutputPosition(ansiOutput, 24, 0);
    ansiOutput.processOutput(makeCUP());
    checkOutputPosition(ansiOutput, 0, 0);
    ansiOutput.processOutput(makeCUP(10, 10));
    checkOutputPosition(ansiOutput, 9, 9);
    ansiOutput.processOutput(makeCUP(100, 100));
    checkOutputPosition(ansiOutput, 99, 99);
});