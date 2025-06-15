# webAppPerfEvaluation
Code for the web app for performance evaluation of a MQTT system under VM migration and Memory DoS.

# Experiment Scenarios and Setup

For all experiments, we'll use the MQTT benchmark to reproduce the performance evaluation. You can find the benchmark here:

https://github.com/krylovsk/mqtt-benchmark

We'll run the following four distinct scenarios to evaluate performance under various conditions:

## Scenarios

**No Migration No Attack (NMNA)**

In this scenario, the benchmark runs without any external interference. This serves as our baseline for comparison.

**Migration No Attack (YMNA)**

Here, the benchmark runs concurrently with continuous VM migrations. As soon as a VM arrives at its destination, the next migration is immediately initiated.

**No Migration Attack (NMYA)**

This scenario involves running the benchmark alongside a Memory Denial-of-Service (DoS) attack. The code for this attack is available in the Appendix Section of the following paper:

https://dl.acm.org/doi/10.1145/3052973.3052978

**Migration Attack (YMYA)**

This is our most comprehensive scenario, combining all elements: the benchmark runs while both continuous VM migrations and the Memory DoS attack are active.
