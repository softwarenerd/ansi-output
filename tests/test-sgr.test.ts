/*---------------------------------------------------------------------------------------------
 *  Copyright (C) 2023 Brian Lambert. All rights reserved.
 *--------------------------------------------------------------------------------------------*/

import { SGRParam, SGRParamColor, makeCUB, makeSGR } from "./ansi";
import { PANGRAM, TEST_ZEROS } from "./constants";
import { ANSIColor, ANSIFormat, ANSIOutput, ANSIStyle } from "../src/ansi-output";
import { map8BitColorIndexToColor, testStyle } from "./helpers";

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

test("Tests ANSI 256 matrix", () => {
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

test("Tests insertion of blue text into an output run of red text", () => {
    // Setup.
    const ansiOutput = new ANSIOutput();
    // Create a red output run.
    ansiOutput.processOutput(`${makeSGR(SGRParam.ForegroundRed)}${TEST_ZEROS}${makeSGR()}`);
    // Insert a blue output in the middle of the red output run.
    ansiOutput.processOutput(makeCUB(45));
    ansiOutput.processOutput(`${makeSGR(SGRParam.ForegroundBlue)}XXXXXXXXXX${makeSGR()}`);
    const outputLines = ansiOutput.outputLines;

    // Test.
    expect(outputLines.length).toBe(1);
    expect(outputLines[0].outputRuns.length).toBe(3);

    // First red segment.
    expect(outputLines[0].outputRuns[0].id.length).toBe(16);
    expect(outputLines[0].outputRuns[0].format).toBeDefined();
    expect(outputLines[0].outputRuns[0].format!.styles).toBeUndefined();
    expect(outputLines[0].outputRuns[0].format!.foregroundColor).toBe(ANSIColor.Red);
    expect(outputLines[0].outputRuns[0].format!.backgroundColor).toBeUndefined();
    expect(outputLines[0].outputRuns[0].format!.underlinedColor).toBeUndefined();
    expect(outputLines[0].outputRuns[0].format!.font).toBeUndefined();
    expect(outputLines[0].outputRuns[0].text).toBe("00000000000000000000000000000000000");

    // Inserted blue segment.
    expect(outputLines[0].outputRuns[1].id.length).toBe(16);
    expect(outputLines[0].outputRuns[1].format).toBeDefined();
    expect(outputLines[0].outputRuns[1].format!.styles).toBeUndefined();
    expect(outputLines[0].outputRuns[1].format!.foregroundColor).toBe(ANSIColor.Blue);
    expect(outputLines[0].outputRuns[1].format!.backgroundColor).toBeUndefined();
    expect(outputLines[0].outputRuns[1].format!.underlinedColor).toBeUndefined();
    expect(outputLines[0].outputRuns[1].format!.font).toBeUndefined();
    expect(outputLines[0].outputRuns[1].text).toBe("XXXXXXXXXX");

    // Second red segment.
    expect(outputLines[0].outputRuns[2].id.length).toBe(16);
    expect(outputLines[0].outputRuns[2].format).toBeDefined();
    expect(outputLines[0].outputRuns[2].format!.styles).toBeUndefined();
    expect(outputLines[0].outputRuns[2].format!.foregroundColor).toBe(ANSIColor.Red);
    expect(outputLines[0].outputRuns[2].format!.backgroundColor).toBeUndefined();
    expect(outputLines[0].outputRuns[2].format!.underlinedColor).toBeUndefined();
    expect(outputLines[0].outputRuns[2].format!.font).toBeUndefined();
    expect(outputLines[0].outputRuns[2].text).toBe("00000000000000000000000000000000000");
});

test("Tests styles", () => {
    testStyle(SGRParam.Bold, ANSIStyle.Bold);
    testStyle(SGRParam.Dim, ANSIStyle.Dim);
    testStyle(SGRParam.Italic, ANSIStyle.Italic);
    testStyle(SGRParam.Underlined, ANSIStyle.Underlined);
    testStyle(SGRParam.SlowBlink, ANSIStyle.SlowBlink);
    testStyle(SGRParam.RapidBlink, ANSIStyle.RapidBlink);
    testStyle(SGRParam.Hidden, ANSIStyle.Hidden);
    testStyle(SGRParam.CrossedOut, ANSIStyle.CrossedOut);
    testStyle(SGRParam.Fraktur, ANSIStyle.Fraktur);
    testStyle(SGRParam.DoubleUnderlined, ANSIStyle.DoubleUnderlined);
    // These styles are not implemented yet.
    // testStyle(SGRParam.Framed, ANSIStyle.Framed);
    // testStyle(SGRParam.Encircled, ANSIStyle.Encircled);
    // testStyle(SGRParam.Overlined, ANSIStyle.Overlined);
    // testStyle(SGRParam.Superscript, ANSIStyle.Superscript);
    // testStyle(SGRParam.Subscript, ANSIStyle.Subscript);
});
