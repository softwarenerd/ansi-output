/*---------------------------------------------------------------------------------------------
 *  Copyright (C) 2023 Brian Lambert. All rights reserved.
 *--------------------------------------------------------------------------------------------*/

import { makeCUU } from "./ansi";
import { checkOutputPosition, setupStandardScreen } from "./helpers";

test("Tests CUU", () => {
    // Setup.
    const ansiOutput = setupStandardScreen();

    // Test.
    ansiOutput.processOutput(makeCUU());
    checkOutputPosition(ansiOutput, 23, 80);
    ansiOutput.processOutput(makeCUU(1));
    checkOutputPosition(ansiOutput, 22, 80);
    ansiOutput.processOutput(makeCUU(10));
    checkOutputPosition(ansiOutput, 12, 80);
    ansiOutput.processOutput(makeCUU(20));
    checkOutputPosition(ansiOutput, 0, 80);
});