/*---------------------------------------------------------------------------------------------
 *  Copyright (C) 2023 Brian Lambert. All rights reserved.
 *--------------------------------------------------------------------------------------------*/

import { SGR, makeSGR } from "./ansi";
import { PANGRAM } from "./constants";
import { ANSIColor, ANSIFormat, ANSIOutput } from "../src/ansi-output";

/**
 * SGRToAnsiColorMap type.
 */
type SGRToAnsiColorMap = [SGR, ANSIColor];

/**
 * SGRTestScenario interface.
 */
interface SGRTestScenario {
    sgr: SGR[],
    ansiFormat: ANSIFormat
}

test("Tests foreground colors with no background colors", () => {
    // Create the test scenarios.
    const testScenarios: SGRTestScenario[] = [
        {
            sgr: [
                SGR.ForegroundBlack
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.Black
            }
        },
        {
            sgr: [
                SGR.ForegroundRed
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.Red
            }
        },
        {
            sgr: [
                SGR.ForegroundGreen
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.Green
            }
        },
        {
            sgr: [
                SGR.ForegroundYellow
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.Yellow
            }
        },
        {
            sgr: [
                SGR.ForegroundBlue
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.Blue
            }
        },
        {
            sgr: [
                SGR.ForegroundMagenta
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.Magenta
            }
        },
        {
            sgr: [
                SGR.ForegroundCyan
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.Cyan
            }
        },
        {
            sgr: [
                SGR.ForegroundWhite
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.White
            }
        },
        {
            sgr: [
                SGR.ForegroundBrightBlack
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.BrightBlack
            }
        },
        {
            sgr: [
                SGR.ForegroundBrightRed
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.BrightRed
            }
        },
        {
            sgr: [
                SGR.ForegroundBrightGreen
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.BrightGreen
            }
        },
        {
            sgr: [
                SGR.ForegroundBrightYellow
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.BrightYellow
            }
        },
        {
            sgr: [
                SGR.ForegroundBrightBlue
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.BrightBlue
            }
        },
        {
            sgr: [
                SGR.ForegroundBrightMagenta
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.BrightMagenta
            }
        },
        {
            sgr: [
                SGR.ForegroundBrightCyan
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.BrightCyan
            }
        },
        {
            sgr: [
                SGR.ForegroundBrightWhite
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
                SGR.BackgroundBlack
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.White,
                backgroundColor: ANSIColor.Black
            }
        },
        {
            sgr: [
                SGR.BackgroundRed
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.White,
                backgroundColor: ANSIColor.Red
            }
        },
        {
            sgr: [
                SGR.BackgroundGreen
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.Black,
                backgroundColor: ANSIColor.Green
            }
        },
        {
            sgr: [
                SGR.BackgroundYellow
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.Black,
                backgroundColor: ANSIColor.Yellow
            }
        },
        {
            sgr: [
                SGR.BackgroundBlue
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.Black,
                backgroundColor: ANSIColor.Blue
            }
        },
        {
            sgr: [
                SGR.BackgroundMagenta
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.Black,
                backgroundColor: ANSIColor.Magenta
            }
        },
        {
            sgr: [
                SGR.BackgroundCyan
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.Black,
                backgroundColor: ANSIColor.Cyan
            }
        },
        {
            sgr: [
                SGR.BackgroundWhite
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.Black,
                backgroundColor: ANSIColor.White
            }
        },
        {
            sgr: [
                SGR.BackgroundBrightBlack
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.White,
                backgroundColor: ANSIColor.BrightBlack
            }
        },
        {
            sgr: [
                SGR.BackgroundBrightRed
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.White,
                backgroundColor: ANSIColor.BrightRed
            }
        },
        {
            sgr: [
                SGR.BackgroundBrightGreen
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.Black,
                backgroundColor: ANSIColor.BrightGreen
            }
        },
        {
            sgr: [
                SGR.BackgroundBrightYellow
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.Black,
                backgroundColor: ANSIColor.BrightYellow
            }
        },
        {
            sgr: [
                SGR.BackgroundBrightBlue
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.Black,
                backgroundColor: ANSIColor.BrightBlue
            }
        },
        {
            sgr: [
                SGR.BackgroundBrightMagenta
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.Black,
                backgroundColor: ANSIColor.BrightMagenta
            }
        },
        {
            sgr: [
                SGR.BackgroundBrightCyan
            ],
            ansiFormat: {
                foregroundColor: ANSIColor.Black,
                backgroundColor: ANSIColor.BrightCyan
            }
        },
        {
            sgr: [
                SGR.BackgroundBrightWhite
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

test("Tests matrix of all foreground and all background colors", () => {
    // Create the test scenarios.
    const testScenarios: SGRTestScenario[] = [];

    // Foreground colors.
    const foregroundColors: SGRToAnsiColorMap[] = [
        [SGR.ForegroundBlack, ANSIColor.Black],
        [SGR.ForegroundRed, ANSIColor.Red],
        [SGR.ForegroundGreen, ANSIColor.Green],
        [SGR.ForegroundYellow, ANSIColor.Yellow],
        [SGR.ForegroundBlue, ANSIColor.Blue],
        [SGR.ForegroundMagenta, ANSIColor.Magenta],
        [SGR.ForegroundCyan, ANSIColor.Cyan],
        [SGR.ForegroundWhite, ANSIColor.White],
        [SGR.ForegroundBrightBlack, ANSIColor.BrightBlack],
        [SGR.ForegroundBrightRed, ANSIColor.BrightRed],
        [SGR.ForegroundBrightGreen, ANSIColor.BrightGreen],
        [SGR.ForegroundBrightYellow, ANSIColor.BrightYellow],
        [SGR.ForegroundBrightBlue, ANSIColor.BrightBlue],
        [SGR.ForegroundBrightMagenta, ANSIColor.BrightMagenta],
        [SGR.ForegroundBrightCyan, ANSIColor.BrightCyan],
        [SGR.ForegroundBrightWhite, ANSIColor.BrightWhite]
    ];

    // Background colors.
    const backgroundColors: SGRToAnsiColorMap[] = [
        [SGR.BackgroundBlack, ANSIColor.Black],
        [SGR.BackgroundRed, ANSIColor.Red],
        [SGR.BackgroundGreen, ANSIColor.Green],
        [SGR.BackgroundYellow, ANSIColor.Yellow],
        [SGR.BackgroundBlue, ANSIColor.Blue],
        [SGR.BackgroundMagenta, ANSIColor.Magenta],
        [SGR.BackgroundCyan, ANSIColor.Cyan],
        [SGR.BackgroundWhite, ANSIColor.White],
        [SGR.BackgroundBrightBlack, ANSIColor.BrightBlack],
        [SGR.BackgroundBrightRed, ANSIColor.BrightRed],
        [SGR.BackgroundBrightGreen, ANSIColor.BrightGreen],
        [SGR.BackgroundBrightYellow, ANSIColor.BrightYellow],
        [SGR.BackgroundBrightBlue, ANSIColor.BrightBlue],
        [SGR.BackgroundBrightMagenta, ANSIColor.BrightMagenta],
        [SGR.BackgroundBrightCyan, ANSIColor.BrightCyan],
        [SGR.BackgroundBrightWhite, ANSIColor.BrightWhite]
    ];

    // Construct the test scenarios.
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