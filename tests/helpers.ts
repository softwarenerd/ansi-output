/*---------------------------------------------------------------------------------------------
 *  Copyright (C) 2022 Posit Software, PBC. All rights reserved.
 *--------------------------------------------------------------------------------------------*/

import { ANSIOutput } from "../src/ansi-output";

/**
 * Constants.
 */
const OUTPUT_LINE = "_outputLine";
const OUTPUT_COLUMN = "_outputColumn";

/**
 * Gets the output line from an ANSIOutput.
 * @param ansiOutput The ANSIOutput to get the output line from.
 * @returns The output line from the ANSIOutput.
 */
export const getOutputLine = (ansiOutput: ANSIOutput) => {
    return ansiOutput[OUTPUT_LINE] as number;
};

/**
 * Sets the output line for an ANSIOutput.
 * @param ansiOutput The ANSIOutput to set the output line for.
 * @param outputLine The output line.
 */
export const setOutputLine = (ansiOutput: ANSIOutput, outputLine: number) => {
    ansiOutput[OUTPUT_LINE] = outputLine;
};

/**
 * Gets the output column from an ANSIOutput.
 * @param ansiOutput The ANSIOutput to get the output column from.
 * @returns The output column from the ANSIOutput.
 */
export const getOutputColumn = (ansiOutput: ANSIOutput) => {
    return ansiOutput[OUTPUT_COLUMN]  as number;;
};

/**
 * Sets the output column for an ANSIOutput.
 * @param ansiOutput The ANSIOutput to set the output column for.
 * @param outputColumn The output column.
 */
export const setOutputColumn = (ansiOutput: ANSIOutput, outputColumn: number) => {
    ansiOutput[OUTPUT_COLUMN] = outputColumn;
};

/**
 * Checks the output position for an ANSIOutput.
 * @param ansiOutput The ANSIOutput to check the output position for.
 * @param outputLine The expected output line.
 * @param outputColumn The expected output column.
 */
export const checkOutputPosition = (ansiOutput: ANSIOutput, outputLine: number, outputColumn: number) => {
    expect(getOutputLine(ansiOutput)).toBe(outputLine);
    expect(getOutputColumn(ansiOutput)).toBe(outputColumn);
};

/**
 * Sets the output position for an ANSIOutput.
 * @param ansiOutput The ANSIOutput to set the output position for.
 * @param outputLine The output line.
 * @param outputColumn The output column.
 */
export const setOutputPosition = (ansiOutput: ANSIOutput, outputLine: number, outputColumn: number) => {
    setOutputLine(ansiOutput, outputLine);
    setOutputColumn(ansiOutput, outputColumn);
};