# ansi-output

The ANSIOutput class is used to process text containing ANSI escape sequences into output that can be rendered an arbitrary way.

Usage:

```typescript
import { ANSIOutput, ANSIOutputLine } from 'ansi-output';
const ansiOutput = new ANSIOutput();

ansiOutput.processOutput(output);
```
