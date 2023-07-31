/*---------------------------------------------------------------------------------------------
 *  Copyright (C) 2023 Brian Lambert. All rights reserved.
 *--------------------------------------------------------------------------------------------*/

import { TEST_ZEROS } from "./constants";
import { makeCUP, makeED } from "./ansi";
import { checkOutputPosition, setupStandardScreen } from "./helpers";

test("Tests end of screen ED using implicit 0", () => {
    // Setup.
    const ansiOutput = setupStandardScreen();
    ansiOutput.processOutput(makeCUP(13, 41));

    // Test.
    ansiOutput.processOutput(makeED("end-of-screen"))
    for (let i = 0; i < 12; i++) {
        expect(ansiOutput.outputLines[i].outputRuns.length).toBe(1);
        expect(ansiOutput.outputLines[i].outputRuns[0].text).toBe(TEST_ZEROS);
    }
    expect(ansiOutput.outputLines[12].outputRuns.length).toBe(2);
    expect(ansiOutput.outputLines[12].outputRuns[0].text).toBe("0000000000000000000000000000000000000000");
    expect(ansiOutput.outputLines[12].outputRuns[1].text).toBe("                                        ");
    const spaces = " ".repeat(80);
    for (let i = 13; i < 24; i++) {
        expect(ansiOutput.outputLines[i].outputRuns.length).toBe(1);
        expect(ansiOutput.outputLines[i].outputRuns[0].text).toBe(spaces);
    }
});

test("Tests end of screen ED using explicit 0", () => {
    // Setup.
    const ansiOutput = setupStandardScreen();
    ansiOutput.processOutput(makeCUP(13, 41));

    // Test.
    checkOutputPosition(ansiOutput, 12, 40);
    ansiOutput.processOutput(makeED("end-of-screen-explicit-0"))
    for (let i = 0; i < 12; i++) {
        expect(ansiOutput.outputLines[i].outputRuns.length).toBe(1);
        expect(ansiOutput.outputLines[i].outputRuns[0].text).toBe(TEST_ZEROS);
    }
    expect(ansiOutput.outputLines[12].outputRuns.length).toBe(2);
    expect(ansiOutput.outputLines[12].outputRuns[0].text).toBe("0000000000000000000000000000000000000000");
    expect(ansiOutput.outputLines[12].outputRuns[1].text).toBe("                                        ");
    const spaces = " ".repeat(80);
    for (let i = 13; i < 24; i++) {
        expect(ansiOutput.outputLines[i].outputRuns.length).toBe(1);
        expect(ansiOutput.outputLines[i].outputRuns[0].text).toBe(spaces);
    }
});

test("Tests ED 1", () => {
    // Setup.
    const ansiOutput = setupStandardScreen();
    ansiOutput.processOutput(makeCUP(13, 41));

    // Test.
    checkOutputPosition(ansiOutput, 12, 40);
    ansiOutput.processOutput(makeED("beginning-of-screen"))
    const spaces = " ".repeat(80);
    for (let i = 0; i < 12; i++) {
        expect(ansiOutput.outputLines[i].outputRuns.length).toBe(1);
        expect(ansiOutput.outputLines[i].outputRuns[0].text).toBe(spaces);
    }
    expect(ansiOutput.outputLines[12].outputRuns.length).toBe(2);
    expect(ansiOutput.outputLines[12].outputRuns[0].text).toBe("                                        ");
    expect(ansiOutput.outputLines[12].outputRuns[1].text).toBe("0000000000000000000000000000000000000000");
    for (let i = 13; i < 24; i++) {
        expect(ansiOutput.outputLines[i].outputRuns.length).toBe(1);
        expect(ansiOutput.outputLines[i].outputRuns[0].text).toBe(TEST_ZEROS);
    }
});

test("Tests ED 2 from the bottom", () => {
    // Setup.
    const ansiOutput = setupStandardScreen();

    // Test.
    ansiOutput.processOutput(makeED("entire-screen"));
    checkOutputPosition(ansiOutput, 24, 80);
    expect(ansiOutput.outputLines.length).toBe(25);
    for (let i = 0; i < 25; i++) {
        expect(ansiOutput.outputLines[i].outputRuns.length).toBe(1);
        expect(ansiOutput.outputLines[i].outputRuns[0].text).toBe(" ".repeat(80));
    }
});

test("Tests ED 2 from the top", () => {
    // Setup.
    const ansiOutput = setupStandardScreen();
    ansiOutput.processOutput(makeCUP());

    // Test.
    ansiOutput.processOutput(makeED("entire-screen"));
    checkOutputPosition(ansiOutput, 0, 0);
    expect(ansiOutput.outputLines.length).toBe(25);
    for (let i = 0; i < 25; i++) {
        expect(ansiOutput.outputLines[i].outputRuns.length).toBe(1);
        expect(ansiOutput.outputLines[i].outputRuns[0].text).toBe(" ".repeat(80));
    }
});
