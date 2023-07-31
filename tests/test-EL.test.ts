/*---------------------------------------------------------------------------------------------
 *  Copyright (C) 2023 Brian Lambert. All rights reserved.
 *--------------------------------------------------------------------------------------------*/

import { CR, TEST_ZEROS } from "./constants";
import { ANSIOutput } from "../src/ansi-output";
import { makeCUP, makeEL } from "./ansi";

test("Tests EL 0 when there's nothing to clear", () => {
    // Setup.
    const ansiOutput = new ANSIOutput();

    // Test.
    ansiOutput.processOutput(makeEL("end-of-line"))

    expect(ansiOutput.outputLines[0].outputRuns.length).toBe(0);
});

test("Tests EL 0 using implicit 0", () => {
    // Setup.
    const ansiOutput = new ANSIOutput();
    ansiOutput.processOutput(TEST_ZEROS);
    ansiOutput.processOutput(CR);

    // Test.
    ansiOutput.processOutput(makeEL("end-of-line"))

    expect(ansiOutput.outputLines[0].outputRuns.length).toBe(1);
    expect(ansiOutput.outputLines[0].outputRuns[0].text).toBe(" ".repeat(80));
});

test("Tests EL 0 using explicit 0", () => {
    // Setup.
    const ansiOutput = new ANSIOutput();
    ansiOutput.processOutput(TEST_ZEROS);
    ansiOutput.processOutput(CR);

    // Test.
    ansiOutput.processOutput(makeEL("end-of-line-explicit-0"))

    expect(ansiOutput.outputLines[0].outputRuns.length).toBe(1);
    expect(ansiOutput.outputLines[0].outputRuns[0].text).toBe(" ".repeat(80));
});

test("Tests EL 1", () => {
    // Setup.
    const ansiOutput = new ANSIOutput();
    ansiOutput.processOutput(TEST_ZEROS);

    // Test.
    ansiOutput.processOutput(makeEL("beginning-of-line"))
    expect(ansiOutput.outputLines[0].outputRuns.length).toBe(1);
    expect(ansiOutput.outputLines[0].outputRuns[0].text).toBe(" ".repeat(80));
});

test("Tests EL 2", () => {
    // Setup.
    const ansiOutput = new ANSIOutput();
    ansiOutput.processOutput(TEST_ZEROS);
    ansiOutput.processOutput(makeCUP(1, 41));

    // Test.
    ansiOutput.processOutput(makeEL("entire-line"))
    expect(ansiOutput.outputLines[0].outputRuns.length).toBe(1);
    expect(ansiOutput.outputLines[0].outputRuns[0].text).toBe(" ".repeat(80));
});
