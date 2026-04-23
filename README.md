You're right — if you're building a parser to learn, you should figure out the architecture yourself. That's the whole point.

**The spec:**
- RFC 8259 (the standard): https://datatracker.ietf.org/doc/html/rfc8259
- ECMA-404 (same grammar, different words): https://ecma-international.org/publications-and-standards/standards/ecma-404/
- json.org (visual grammar + McKeeman Form): https://json.org/json-en.html

**The minefield:**
- "Parsing JSON is a Minefield" by Nicolas Seriot: https://seriot.ch/projects/parsing_json.html

**The test suite:**
- nst/JSONTestSuite (318 files, y_/n_/i_ prefixed): https://github.com/nst/JSONTestSuite

**Benchmark fixtures (real-world JSON files):**
- simdjson/jsonexamples: https://github.com/simdjson/simdjson/tree/master/jsonexamples

**Benchmark references (how others did it):**
- Chevrotain parsing benchmark (8 JS parsers compared): https://chevrotain.io/performance/
- json-joy/json-pack benchmarks (9 payload profiles, 1000x warmup): https://github.com/jsonjoy-com/json-pack
- ts-pattern runtime cost discussion: https://github.com/gvergnaud/ts-pattern/discussions/173

**Tools:**
- benchmark.js or tinybench for measurement
- ts-pattern if you want to compare pattern matching vs hand-written
- vitest for tests + `vitest bench` for benchmarks

Go build it.