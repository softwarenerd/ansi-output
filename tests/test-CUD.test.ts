/*---------------------------------------------------------------------------------------------
 *  Copyright (C) 2023 Brian Lambert. All rights reserved.
 *--------------------------------------------------------------------------------------------*/

import { makeCUD, makeCUP } from "./ansi";
import { checkOutputPosition, setupStandardScreen } from "./helpers";

test("Tests CUD", () => {
    // Setup.
    const ansiOutput = setupStandardScreen();
    ansiOutput.processOutput(makeCUP());

    // Test.
    ansiOutput.processOutput(makeCUD());
    checkOutputPosition(ansiOutput, 1, 0);
    ansiOutput.processOutput(makeCUD(1));
    checkOutputPosition(ansiOutput, 2, 0);
    ansiOutput.processOutput(makeCUD(10));
    checkOutputPosition(ansiOutput, 12, 0);
    ansiOutput.processOutput(makeCUD(100));
    checkOutputPosition(ansiOutput, 112, 0);
});

