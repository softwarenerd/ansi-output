/*---------------------------------------------------------------------------------------------
 *  Copyright (C) 2023 Brian Lambert. All rights reserved.
 *--------------------------------------------------------------------------------------------*/

import { makeCUB } from "./ansi";
import { ANSIOutput } from "../src/ansi-output";
import { checkOutputPosition } from "./helpers";

test("Tests CUB", () => {
    // Setup.
    const ansiOutput = new ANSIOutput();
    ansiOutput.processOutput("0".repeat(80));

    // Test.
    ansiOutput.processOutput(makeCUB());
    checkOutputPosition(ansiOutput, 0, 79);
    ansiOutput.processOutput(makeCUB(1));
    checkOutputPosition(ansiOutput, 0, 78);
    ansiOutput.processOutput(makeCUB(10));
    checkOutputPosition(ansiOutput, 0, 68);
    ansiOutput.processOutput(makeCUB(100));
    checkOutputPosition(ansiOutput, 0, 0);
});

