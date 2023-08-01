/*---------------------------------------------------------------------------------------------
 *  Copyright (C) 2023 Brian Lambert. All rights reserved.
 *--------------------------------------------------------------------------------------------*/

import { ANSIOutput } from "../src/ansi-output";
import { makeCUB, makeCUF } from "./ansi";
import { CRLF, LF, PANGRAM, TEST_ZEROS } from "./constants";

test("Tests the static processOutput method", () => {
    // Setup.
    const outputLines = ANSIOutput.processOutput(PANGRAM);

    // Tests.
    expect(outputLines.length).toBe(1);
    expect(outputLines[0].outputRuns.length).toBe(1);
    expect(outputLines[0].outputRuns[0].text).toBe(PANGRAM);
});

test("Tests that there will be one output line with no output runs when there is no processed output", () => {
    // Setup.
    const ansiOutput = new ANSIOutput();
    const outputLines = ansiOutput.outputLines;

    // Tests.
    expect(outputLines.length).toBe(1);
    expect(outputLines[0].outputRuns.length).toBe(0);
});

test("Tests that there will be one output line with one output run", () => {
    // Setup.
    const ansiOutput = new ANSIOutput();
    ansiOutput.processOutput(PANGRAM);
    const outputLines = ansiOutput.outputLines;

    // Tests.
    expect(outputLines.length).toBe(1);
    expect(outputLines[0].outputRuns.length).toBe(1);
    expect(outputLines[0].outputRuns[0].text).toBe(PANGRAM);
});

test("Tests two output lines separated by LF", () => {
    // Setup.
    const ansiOutput = new ANSIOutput();
    ansiOutput.processOutput(`${PANGRAM}${LF}${PANGRAM}`);
    const outputLines = ansiOutput.outputLines;

    // Test
    expect(outputLines.length).toBe(2);
    expect(outputLines[0].outputRuns.length).toBe(1);
    expect(outputLines[0].outputRuns[0].id.length).toBe(16);
    expect(outputLines[0].outputRuns[0].format).toBe(undefined);
    expect(outputLines[0].outputRuns[0].text).toBe(PANGRAM);
    expect(outputLines[1].outputRuns.length).toBe(1);
    expect(outputLines[1].outputRuns[0].id.length).toBe(16);
    expect(outputLines[1].outputRuns[0].format).toBe(undefined);
    expect(outputLines[1].outputRuns[0].text).toBe(PANGRAM);
});

test("Tests two output lines separated by CRLF", () => {
    // Setup.
    const ansiOutput = new ANSIOutput();
    ansiOutput.processOutput(`${PANGRAM}${CRLF}${PANGRAM}`);
    const outputLines = ansiOutput.outputLines;

    // Test
    expect(outputLines.length).toBe(2);
    expect(outputLines[0].outputRuns.length).toBe(1);
    expect(outputLines[0].outputRuns[0].id.length).toBe(16);
    expect(outputLines[0].outputRuns[0].format).toBe(undefined);
    expect(outputLines[0].outputRuns[0].text).toBe(PANGRAM);
    expect(outputLines[1].outputRuns.length).toBe(1);
    expect(outputLines[1].outputRuns[0].id.length).toBe(16);
    expect(outputLines[1].outputRuns[0].format).toBe(undefined);
    expect(outputLines[1].outputRuns[0].text).toBe(PANGRAM);
});

test("Tests 2,500 output lines", () => {
    // Setup.
    const lines = 2500;
    const ansiOutput = new ANSIOutput();
    for (let i = 0; i < lines; i++) {
        ansiOutput.processOutput(`${PANGRAM}${CRLF}`);
    }
    const outputLines = ansiOutput.outputLines;

    // Test
    expect(outputLines.length).toBe(lines);
    for (let i = 0; i < lines; i++) {
        expect(outputLines[i].outputRuns.length).toBe(1);
        expect(outputLines[i].outputRuns[0].id.length).toBe(16);
        expect(outputLines[i].outputRuns[0].format).toBe(undefined);
        expect(outputLines[i].outputRuns[0].text).toBe(PANGRAM);
    }
});

test("Tests overwrite at beginning of output run", () => {
    // Setup.
    const ansiOutput = new ANSIOutput();
    ansiOutput.processOutput(TEST_ZEROS);
    ansiOutput.processOutput(makeCUB(80));
    ansiOutput.processOutput("XXXXXXXXXX");
    const outputLines = ansiOutput.outputLines;

    // Test.
    expect(outputLines.length).toBe(1);
    expect(outputLines[0].outputRuns.length).toBe(1);
    expect(outputLines[0].outputRuns[0].id.length).toBe(16);
    expect(outputLines[0].outputRuns[0].format).toBe(undefined);
    expect(outputLines[0].outputRuns[0].text).toBe("XXXXXXXXXX0000000000000000000000000000000000000000000000000000000000000000000000");
});

test("Tests overwrite into middle of output run", () => {
    // Setup.
    const ansiOutput = new ANSIOutput();
    ansiOutput.processOutput(TEST_ZEROS);
    ansiOutput.processOutput(makeCUB(45));
    ansiOutput.processOutput("XXXXXXXXXX");
    const outputLines = ansiOutput.outputLines;

    // Test.
    expect(outputLines.length).toBe(1);
    expect(outputLines[0].outputRuns.length).toBe(1);
    expect(outputLines[0].outputRuns[0].id.length).toBe(16);
    expect(outputLines[0].outputRuns[0].format).toBe(undefined);
    expect(outputLines[0].outputRuns[0].text).toBe("00000000000000000000000000000000000XXXXXXXXXX00000000000000000000000000000000000");
});

test("Tests overwrite at end of output run", () => {
    // Setup.
    const ansiOutput = new ANSIOutput();
    ansiOutput.processOutput(TEST_ZEROS);
    ansiOutput.processOutput(makeCUB(10));
    ansiOutput.processOutput("XXXXXXXXXX");
    const outputLines = ansiOutput.outputLines;

    // Test.
    expect(outputLines.length).toBe(1);
    expect(outputLines[0].outputRuns.length).toBe(1);
    expect(outputLines[0].outputRuns[0].id.length).toBe(16);
    expect(outputLines[0].outputRuns[0].format).toBe(undefined);
    expect(outputLines[0].outputRuns[0].text).toBe("0000000000000000000000000000000000000000000000000000000000000000000000XXXXXXXXXX");
});

test("Tests append at end of output run", () => {
    // Setup.
    const ansiOutput = new ANSIOutput();
    ansiOutput.processOutput("XXXXXXXXXX");
    ansiOutput.processOutput("XXXXXXXXXX");
    const outputLines = ansiOutput.outputLines;

    // Test.
    expect(outputLines.length).toBe(1);
    expect(outputLines[0].outputRuns.length).toBe(1);
    expect(outputLines[0].outputRuns[0].id.length).toBe(16);
    expect(outputLines[0].outputRuns[0].format).toBeUndefined();
    expect(outputLines[0].outputRuns[0].text).toBe("XXXXXXXXXXXXXXXXXXXX");
});

test("Tests spacer", () => {
    // Setup.
    const ansiOutput = new ANSIOutput();
    ansiOutput.processOutput(makeCUF(10));
    ansiOutput.processOutput("XXXXXXXXXX");
    const outputLines = ansiOutput.outputLines;

    // Test.
    expect(outputLines.length).toBe(1);
    expect(outputLines[0].outputRuns.length).toBe(1);
    expect(outputLines[0].outputRuns[0].id.length).toBe(16);
    expect(outputLines[0].outputRuns[0].format).toBeUndefined();
    expect(outputLines[0].outputRuns[0].text).toBe("          XXXXXXXXXX");
});
