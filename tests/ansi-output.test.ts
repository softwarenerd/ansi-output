/*---------------------------------------------------------------------------------------------
 *  Copyright (C) 2023 Brian Lambert. All rights reserved.
 *--------------------------------------------------------------------------------------------*/

import { ANSIOutput } from "../src/ansi-output";

/**
 * Constants.
 */
const LF = "\n";
const CRLF = "\r\n";
const PANGRAM = "The quick brown fox jumps over the lazy dog";

/**
 * Tests that there will be one output line when there is no processed output.
 */
test("Tests that there will be one output line with no output runs when there is no processed output", () => {
    // Setup.
    const ansiOutput = new ANSIOutput();

    // Tests.
    expect(ansiOutput.outputLines.length).toBe(1);
    expect(ansiOutput.outputLines[0].outputRuns.length).toBe(0);
});

/**
 * Test a single output line.
 */
test("One output line", () => {
    // Setup.
    const ansiOutput = new ANSIOutput();
    ansiOutput.processOutput(PANGRAM);

    // Tests.
    expect(ansiOutput.outputLines.length).toBe(1);
    expect(ansiOutput.outputLines[0].outputRuns.length).toBe(1);
    expect(ansiOutput.outputLines[0].outputRuns[0].text).toBe(PANGRAM);
});

test("Two output lines LF", () => {
    // Setup.
    const ansiOutput = new ANSIOutput();
    ansiOutput.processOutput(`${PANGRAM}${LF}${PANGRAM}`);

    // Test
    expect(ansiOutput.outputLines.length).toBe(2);
});

test("Two output lines CRLF", () => {
    // Setup.
    const ansiOutput = new ANSIOutput();
    ansiOutput.processOutput(`${PANGRAM}${CRLF}${PANGRAM}`);

    // Test
    expect(ansiOutput.outputLines.length).toBe(2);
});