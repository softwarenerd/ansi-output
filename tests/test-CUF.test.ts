/*---------------------------------------------------------------------------------------------
 *  Copyright (C) 2023 Brian Lambert. All rights reserved.
 *--------------------------------------------------------------------------------------------*/

import { makeCUF, makeCUP } from "./ansi";
import { ANSIOutput } from "../src/ansi-output";
import { checkOutputPosition } from "./helpers";

test("Tests CUF", () => {
    // Setup.
    const ansiOutput = new ANSIOutput();
    ansiOutput.processOutput("0".repeat(80));
    ansiOutput.processOutput(makeCUP());

    // Test.
    ansiOutput.processOutput(makeCUF());
    checkOutputPosition(ansiOutput, 0, 1);   
    ansiOutput.processOutput(makeCUF(1));
    checkOutputPosition(ansiOutput, 0, 2);
    ansiOutput.processOutput(makeCUF(10));
    checkOutputPosition(ansiOutput, 0, 12);
    ansiOutput.processOutput(makeCUF(100));
    checkOutputPosition(ansiOutput, 0, 112);
});

