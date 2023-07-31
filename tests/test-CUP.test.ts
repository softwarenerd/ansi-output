/*---------------------------------------------------------------------------------------------
 *  Copyright (C) 2023 Brian Lambert. All rights reserved.
 *--------------------------------------------------------------------------------------------*/

import { makeCUP } from "./ansi";
import { checkOutputPosition, /*, setupStandardScreen */ 
setupStandardScreen} from "./helpers";

test("Tests CUP", () => {
    // Setup.
    const ansiOutput = setupStandardScreen();

    // Test.
    ansiOutput.processOutput(makeCUP());
    checkOutputPosition(ansiOutput, 0, 0);
    ansiOutput.processOutput(makeCUP(10, 10));
    checkOutputPosition(ansiOutput, 9, 9);
    ansiOutput.processOutput(makeCUP(100, 100));
    checkOutputPosition(ansiOutput, 99, 99);
    ansiOutput.processOutput(makeCUP(8192, 8192));
    checkOutputPosition(ansiOutput, 8191, 8191);
});
