/*---------------------------------------------------------------------------------------------
 *  Copyright (C) 2022 Posit Software, PBC. All rights reserved.
 *--------------------------------------------------------------------------------------------*/

import { CRLF, TEST_ZEROS } from "./constants";
import { ANSIColor, ANSIOutput, ANSIStyle } from "../src/ansi-output";
import { SGRParam, makeSGR } from "./ansi";

/**
 * Converts a number to a two-digit hex string representing the value.
 * @param value The value.
 * @returns A two digit hex string representing the value.
 */
export const twoDigitHex = (value: number) => {
    // Sanity check the value.
    if (value < 0) {
        return '00';
    } else if (value > 255) {
        return 'ff';
    }

    // Return the value in hex format.
    const hex = value.toString(16);
    return hex.length === 2 ? hex : '0' + hex;
};

/**
 * Checks the output position for an ANSIOutput.
 * @param ansiOutput The ANSIOutput to check the output position for.
 * @param outputLine The expected output line.
 * @param outputColumn The expected output column.
 */
export const checkOutputPosition = (ansiOutput: ANSIOutput, outputLine: number, outputColumn: number) => {
    expect(ansiOutput["_outputLine"] as number).toBe(outputLine);
    expect(ansiOutput["_outputColumn"] as number).toBe(outputColumn);
};

/**
 * Sets up an ANSIOutput with a standard screen of content.
 * @returns The newly set up ANSIOutput.
 */
export const setupStandardScreen = () => {
    const ansiOutput = new ANSIOutput();
    for (let i = 0; i < 25; i++) {
        ansiOutput.processOutput(TEST_ZEROS);
        if (i < 24) {
            ansiOutput.processOutput(CRLF);
        }
    }

    return ansiOutput;
}

/**
 * Maps an 8-bit color index to an ANSIColor or RGB color value.
 * @param colorIndex The 8-bit color index.
 * @returns An ANSIColor or RGB color value.
 */
export const map8BitColorIndexToColor = (colorIndex: number) => {
    // Process the color index. The first 16 indexes map to normal ANSIColors.
    switch (colorIndex) {
        case 0:
            return ANSIColor.Black;

        case 1:
            return ANSIColor.Red;

        case 2:
            return ANSIColor.Green;

        case 3:
            return ANSIColor.Yellow;

        case 4:
            return ANSIColor.Blue;

        case 5:
            return ANSIColor.Magenta;

        case 6:
            return ANSIColor.Cyan;

        case 7:
            return ANSIColor.White;

        case 8:
            return ANSIColor.BrightBlack;

        case 9:
            return ANSIColor.BrightRed;

        case 10:
            return ANSIColor.BrightGreen;

        case 11:
            return ANSIColor.BrightYellow;

        case 12:
            return ANSIColor.BrightBlue;

        case 13:
            return ANSIColor.BrightMagenta;

        case 14:
            return ANSIColor.BrightCyan;

        case 15:
            return ANSIColor.BrightWhite;

        // Process other color indexes.
        default:
            // Sanity check that the color index is an integer.
            if (colorIndex % 1 !== 0) {
                return undefined;
            }

            // Process the color index as RGB or grayscale.
            if (colorIndex >= 16 && colorIndex <= 231) {
                // Convert the color index to one of 216 RGB colors.
                let colorNumber = colorIndex - 16;
                let blue = colorNumber % 6;
                colorNumber = (colorNumber - blue) / 6;
                let green = colorNumber % 6;
                colorNumber = (colorNumber - green) / 6;
                let red = colorNumber;

                // Map red, green, and blue from 0-5 to 0-255.
                blue = Math.round(blue * 255 / 5);
                green = Math.round(green * 255 / 5);
                red = Math.round(red * 255 / 5);

                // Return the RGB color.
                return '#' +
                    twoDigitHex(red) +
                    twoDigitHex(green) +
                    twoDigitHex(blue);
            } else if (colorIndex >= 232 && colorIndex <= 255) {
                // Calculate the grayscale value.
                const rgb = Math.round((colorIndex - 232) / 23 * 255);
                const grayscale = twoDigitHex(rgb);

                // Return the RGB color.
                return '#' + grayscale + grayscale + grayscale;
            } else {
                // Wonky!
                return undefined;
            }
    }
}

export const testStyle = (sgr: SGRParam, ansiStyle: ANSIStyle) => {
    // Setup.
    const ansiOutput = new ANSIOutput();
    ansiOutput.processOutput(`${makeSGR(sgr)}${TEST_ZEROS}${makeSGR()}`);
    const outputLines = ansiOutput.outputLines;
    expect(outputLines.length).toBe(1);
    expect(outputLines[0].outputRuns.length).toBe(1);
    expect(outputLines[0].outputRuns[0].id.length).toBe(16);
    expect(outputLines[0].outputRuns[0].format).toBeDefined();
    expect(outputLines[0].outputRuns[0].format!.styles!.length).toBe(1);
    expect(outputLines[0].outputRuns[0].format!.styles![0]).toBe(ansiStyle);
    expect(outputLines[0].outputRuns[0].format!.foregroundColor).toBeUndefined();
    expect(outputLines[0].outputRuns[0].format!.backgroundColor).toBeUndefined();
    expect(outputLines[0].outputRuns[0].format!.underlinedColor).toBeUndefined();
    expect(outputLines[0].outputRuns[0].format!.font).toBeUndefined();
    expect(outputLines[0].outputRuns[0].text).toBe(TEST_ZEROS);
}