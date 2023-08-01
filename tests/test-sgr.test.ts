/*---------------------------------------------------------------------------------------------
 *  Copyright (C) 2023 Brian Lambert. All rights reserved.
 *--------------------------------------------------------------------------------------------*/

import { SGRParam, SGRParamColor, makeSGR } from "./ansi";
import { PANGRAM } from "./constants";
import { ANSIColor, ANSIFormat, ANSIOutput } from "../src/ansi-output";

/**
 * SGRValue type.
 */
type SGRValue = SGRParam | SGRParamColor | number;

/**
 * SGRTestScenario interface.
 */
interface SGRTestScenario {
    sgr: SGRValue[],
    ansiFormat: ANSIFormat
}

test("Tests foreground colors with no background colors", () => {
    // Create the test scenarios.
    const testScenarios: SGRTestScenario[] = [
        {
            sgr: [
                SGRParam.ForegroundBlack
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.Black
            }
        },
        {
            sgr: [
                SGRParam.ForegroundRed
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.Red
            }
        },
        {
            sgr: [
                SGRParam.ForegroundGreen
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.Green
            }
        },
        {
            sgr: [
                SGRParam.ForegroundYellow
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.Yellow
            }
        },
        {
            sgr: [
                SGRParam.ForegroundBlue
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.Blue
            }
        },
        {
            sgr: [
                SGRParam.ForegroundMagenta
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.Magenta
            }
        },
        {
            sgr: [
                SGRParam.ForegroundCyan
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.Cyan
            }
        },
        {
            sgr: [
                SGRParam.ForegroundWhite
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.White
            }
        },
        {
            sgr: [
                SGRParam.ForegroundBrightBlack
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.BrightBlack
            }
        },
        {
            sgr: [
                SGRParam.ForegroundBrightRed
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.BrightRed
            }
        },
        {
            sgr: [
                SGRParam.ForegroundBrightGreen
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.BrightGreen
            }
        },
        {
            sgr: [
                SGRParam.ForegroundBrightYellow
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.BrightYellow
            }
        },
        {
            sgr: [
                SGRParam.ForegroundBrightBlue
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.BrightBlue
            }
        },
        {
            sgr: [
                SGRParam.ForegroundBrightMagenta
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.BrightMagenta
            }
        },
        {
            sgr: [
                SGRParam.ForegroundBrightCyan
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.BrightCyan
            }
        },
        {
            sgr: [
                SGRParam.ForegroundBrightWhite
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.BrightWhite
            }
        }
    ];

    // Run the test scenarios.
    for (const testScenario of testScenarios) {
        // Setup.
        const ansiOutput = new ANSIOutput();
        ansiOutput.processOutput(`${makeSGR(...testScenario.sgr)}${PANGRAM}${makeSGR()}`);
        const outputLines = ansiOutput.outputLines;

        // Tests that there's one output line and one output run in it.
        expect(outputLines.length).toBe(1);
        expect(outputLines[0].outputRuns.length).toBe(1);

        // Test that the output run text is correct.
        expect(outputLines[0].outputRuns[0].text).toBe(PANGRAM);

        // Test that the output format is correct.
        expect(outputLines[0].outputRuns[0].format).toBeDefined();
        expect(outputLines[0].outputRuns[0].format!.styles).toBe(testScenario.ansiFormat.styles);
        expect(outputLines[0].outputRuns[0].format!.foregroundColor).toBe(testScenario.ansiFormat.foregroundColor);
        expect(outputLines[0].outputRuns[0].format!.backgroundColor).toBe(testScenario.ansiFormat.backgroundColor);
        expect(outputLines[0].outputRuns[0].format!.underlinedColor).toBe(testScenario.ansiFormat.underlinedColor);
        expect(outputLines[0].outputRuns[0].format!.font).toBe(testScenario.ansiFormat.font);
    }
});

test("Tests background colors and automatically contrasting foreground colors", () => {
    // Create the test scenarios.
    const testScenarios: SGRTestScenario[] = [
        {
            sgr: [
                SGRParam.BackgroundBlack
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.White,
                backgroundColor: ANSIColor.Black
            }
        },
        {
            sgr: [
                SGRParam.BackgroundRed
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.White,
                backgroundColor: ANSIColor.Red
            }
        },
        {
            sgr: [
                SGRParam.BackgroundGreen
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.Black,
                backgroundColor: ANSIColor.Green
            }
        },
        {
            sgr: [
                SGRParam.BackgroundYellow
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.Black,
                backgroundColor: ANSIColor.Yellow
            }
        },
        {
            sgr: [
                SGRParam.BackgroundBlue
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.Black,
                backgroundColor: ANSIColor.Blue
            }
        },
        {
            sgr: [
                SGRParam.BackgroundMagenta
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.Black,
                backgroundColor: ANSIColor.Magenta
            }
        },
        {
            sgr: [
                SGRParam.BackgroundCyan
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.Black,
                backgroundColor: ANSIColor.Cyan
            }
        },
        {
            sgr: [
                SGRParam.BackgroundWhite
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.Black,
                backgroundColor: ANSIColor.White
            }
        },
        {
            sgr: [
                SGRParam.BackgroundBrightBlack
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.White,
                backgroundColor: ANSIColor.BrightBlack
            }
        },
        {
            sgr: [
                SGRParam.BackgroundBrightRed
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.White,
                backgroundColor: ANSIColor.BrightRed
            }
        },
        {
            sgr: [
                SGRParam.BackgroundBrightGreen
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.Black,
                backgroundColor: ANSIColor.BrightGreen
            }
        },
        {
            sgr: [
                SGRParam.BackgroundBrightYellow
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.Black,
                backgroundColor: ANSIColor.BrightYellow
            }
        },
        {
            sgr: [
                SGRParam.BackgroundBrightBlue
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.Black,
                backgroundColor: ANSIColor.BrightBlue
            }
        },
        {
            sgr: [
                SGRParam.BackgroundBrightMagenta
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.Black,
                backgroundColor: ANSIColor.BrightMagenta
            }
        },
        {
            sgr: [
                SGRParam.BackgroundBrightCyan
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.Black,
                backgroundColor: ANSIColor.BrightCyan
            }
        },
        {
            sgr: [
                SGRParam.BackgroundBrightWhite
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.Black,
                backgroundColor: ANSIColor.BrightWhite
            }
        }
    ];

    // Run the test scenarios.
    for (const testScenario of testScenarios) {
        // Setup.
        const ansiOutput = new ANSIOutput();
        ansiOutput.processOutput(`${makeSGR(...testScenario.sgr)}${PANGRAM}${makeSGR()}`);
        const outputLines = ansiOutput.outputLines;

        // Tests that there's one output line and one output run in it.
        expect(outputLines.length).toBe(1);
        expect(outputLines[0].outputRuns.length).toBe(1);

        // Test that the output run text is correct.
        expect(outputLines[0].outputRuns[0].text).toBe(PANGRAM);

        // Test that the output format is correct.
        expect(outputLines[0].outputRuns[0].format).toBeDefined();
        expect(outputLines[0].outputRuns[0].format!.styles).toBe(testScenario.ansiFormat.styles);
        expect(outputLines[0].outputRuns[0].format!.foregroundColor).toBe(testScenario.ansiFormat.foregroundColor);
        expect(outputLines[0].outputRuns[0].format!.backgroundColor).toBe(testScenario.ansiFormat.backgroundColor);
        expect(outputLines[0].outputRuns[0].format!.underlinedColor).toBe(testScenario.ansiFormat.underlinedColor);
        expect(outputLines[0].outputRuns[0].format!.font).toBe(testScenario.ansiFormat.font);
    }
});

test("Tests ANSI 16 matrix", () => {
    /**
     * SGRToAnsiColorMap type.
     */
    type SGRToAnsiColorMap = [SGRParam, ANSIColor];

    // Foreground colors.
    const foregroundColors: SGRToAnsiColorMap[] = [
        [SGRParam.ForegroundBlack, ANSIColor.Black],
        [SGRParam.ForegroundRed, ANSIColor.Red],
        [SGRParam.ForegroundGreen, ANSIColor.Green],
        [SGRParam.ForegroundYellow, ANSIColor.Yellow],
        [SGRParam.ForegroundBlue, ANSIColor.Blue],
        [SGRParam.ForegroundMagenta, ANSIColor.Magenta],
        [SGRParam.ForegroundCyan, ANSIColor.Cyan],
        [SGRParam.ForegroundWhite, ANSIColor.White],
        [SGRParam.ForegroundBrightBlack, ANSIColor.BrightBlack],
        [SGRParam.ForegroundBrightRed, ANSIColor.BrightRed],
        [SGRParam.ForegroundBrightGreen, ANSIColor.BrightGreen],
        [SGRParam.ForegroundBrightYellow, ANSIColor.BrightYellow],
        [SGRParam.ForegroundBrightBlue, ANSIColor.BrightBlue],
        [SGRParam.ForegroundBrightMagenta, ANSIColor.BrightMagenta],
        [SGRParam.ForegroundBrightCyan, ANSIColor.BrightCyan],
        [SGRParam.ForegroundBrightWhite, ANSIColor.BrightWhite]
    ];

    // Background colors.
    const backgroundColors: SGRToAnsiColorMap[] = [
        [SGRParam.BackgroundBlack, ANSIColor.Black],
        [SGRParam.BackgroundRed, ANSIColor.Red],
        [SGRParam.BackgroundGreen, ANSIColor.Green],
        [SGRParam.BackgroundYellow, ANSIColor.Yellow],
        [SGRParam.BackgroundBlue, ANSIColor.Blue],
        [SGRParam.BackgroundMagenta, ANSIColor.Magenta],
        [SGRParam.BackgroundCyan, ANSIColor.Cyan],
        [SGRParam.BackgroundWhite, ANSIColor.White],
        [SGRParam.BackgroundBrightBlack, ANSIColor.BrightBlack],
        [SGRParam.BackgroundBrightRed, ANSIColor.BrightRed],
        [SGRParam.BackgroundBrightGreen, ANSIColor.BrightGreen],
        [SGRParam.BackgroundBrightYellow, ANSIColor.BrightYellow],
        [SGRParam.BackgroundBrightBlue, ANSIColor.BrightBlue],
        [SGRParam.BackgroundBrightMagenta, ANSIColor.BrightMagenta],
        [SGRParam.BackgroundBrightCyan, ANSIColor.BrightCyan],
        [SGRParam.BackgroundBrightWhite, ANSIColor.BrightWhite]
    ];

    // Construct the test scenarios.
    const testScenarios: SGRTestScenario[] = [];
    for (const foregroundColor of foregroundColors) {
        for (const backgroundColor of backgroundColors) {
            testScenarios.push({
                sgr: [foregroundColor[0], backgroundColor[0]],
                ansiFormat: {
                    foregroundColor: foregroundColor[1],
                    backgroundColor: backgroundColor[1]
                }
            })
        }
    }

    // Run the test scenarios.
    for (const testScenario of testScenarios) {
        // Setup.
        const ansiOutput = new ANSIOutput();
        ansiOutput.processOutput(`${makeSGR(...testScenario.sgr)}${PANGRAM}${makeSGR()}`);
        const outputLines = ansiOutput.outputLines;

        // Tests that there's one output line and one output run in it.
        expect(outputLines.length).toBe(1);
        expect(outputLines[0].outputRuns.length).toBe(1);

        // Test that the output run text is correct.
        expect(outputLines[0].outputRuns[0].text).toBe(PANGRAM);

        // Test that the output format is correct.
        expect(outputLines[0].outputRuns[0].format).toBeDefined();
        expect(outputLines[0].outputRuns[0].format!.styles).toBe(testScenario.ansiFormat.styles);
        expect(outputLines[0].outputRuns[0].format!.foregroundColor).toBe(testScenario.ansiFormat.foregroundColor);
        expect(outputLines[0].outputRuns[0].format!.backgroundColor).toBe(testScenario.ansiFormat.backgroundColor);
        expect(outputLines[0].outputRuns[0].format!.underlinedColor).toBe(testScenario.ansiFormat.underlinedColor);
        expect(outputLines[0].outputRuns[0].format!.font).toBe(testScenario.ansiFormat.font);
    }
});

test("", () => {
    const testScenarios: SGRTestScenario[] = [];
    for (let foregroundIndex = 0; foregroundIndex < 256; foregroundIndex++) {
        for (let backgroundIndex = 0; backgroundIndex < 256; backgroundIndex++) {
            testScenarios.push({
                sgr: [
                    SGRParam.SetForeground,
                    SGRParamColor.Color256,
                    foregroundIndex,
                    SGRParam.SetBackground,
                    SGRParamColor.Color256,
                    backgroundIndex
                ],
                ansiFormat: {
                    foregroundColor: map8BitColorIndexToColor(foregroundIndex),
                    backgroundColor: map8BitColorIndexToColor(backgroundIndex)
                }
            })
        }
    }

    // Run the test scenarios.
    for (const testScenario of testScenarios) {
        // Setup.
        const ansiOutput = new ANSIOutput();
        ansiOutput.processOutput(`${makeSGR(...testScenario.sgr)}${PANGRAM}${makeSGR()}`);
        const outputLines = ansiOutput.outputLines;

        // Tests that there's one output line and one output run in it.
        expect(outputLines.length).toBe(1);
        expect(outputLines[0].outputRuns.length).toBe(1);

        // Test that the output run text is correct.
        expect(outputLines[0].outputRuns[0].text).toBe(PANGRAM);

        // Test that the output format is correct.
        expect(outputLines[0].outputRuns[0].format).toBeDefined();
        expect(outputLines[0].outputRuns[0].format!.styles).toBe(testScenario.ansiFormat.styles);
        expect(outputLines[0].outputRuns[0].format!.foregroundColor).toBe(testScenario.ansiFormat.foregroundColor);
        expect(outputLines[0].outputRuns[0].format!.backgroundColor).toBe(testScenario.ansiFormat.backgroundColor);
        expect(outputLines[0].outputRuns[0].format!.underlinedColor).toBe(testScenario.ansiFormat.underlinedColor);
        expect(outputLines[0].outputRuns[0].format!.font).toBe(testScenario.ansiFormat.font);
    }
});

/**
 * Maps an 8-bit color index to an ANSIColor or RGB color value.
 * @param colorIndex The 8-bit color index.
 * @returns An ANSIColor or RGB color value.
 */
const map8BitColorIndexToColor = (colorIndex: number) => {
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

/**
 * Converts a number to a two-digit hex string representing the value.
 * @param value The value.
 * @returns A two digit hex string representing the value.
 */
const twoDigitHex = (value: number) => {
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
