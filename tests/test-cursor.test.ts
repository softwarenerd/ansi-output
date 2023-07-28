/*---------------------------------------------------------------------------------------------
 *  Copyright (C) 2023 Brian Lambert. All rights reserved.
 *--------------------------------------------------------------------------------------------*/

// import { makeCUU } from "./ansi";
import { CR, CRLF } from "./constants";
import { ANSIOutput } from "../src/ansi-output";
import { makeCUU } from "./ansi";

test("Tests CUU", () => {
    /**
     * Tests CUU for the specified number of rows.
     * @param rows The number of rows.
     */
    const testCUU = (rows: number) => {
        // Setup.
        const ansiOutput = new ANSIOutput();
        for (let i = 0; i < rows; i++) {
            ansiOutput.processOutput("0".repeat(80));
            ansiOutput.processOutput(i === rows - 1 ? CR : CRLF);
        }
        ansiOutput.processOutput(makeCUU(rows));
        for (let i = 0; i < rows; i++) {
            ansiOutput.processOutput("1".repeat(80));
            ansiOutput.processOutput(i === rows - 1 ? CR : CRLF);
        }

        // Test.
        const outputLines = ansiOutput.outputLines;
        expect(outputLines.length).toBe(rows);
        for (let i = 0; i < rows; i++) {
            expect(outputLines[i].outputRuns.length).toBe(1);
            expect(outputLines[i].outputRuns[0].text).toBe("1".repeat(80))
        }
    }

    // Test.
    for (let i = 1; i <= 100; i++) {
        testCUU(i);
    }
});

