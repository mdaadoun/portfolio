# Optimizing Local AI: The Crucial Impact of PCIe Switches and Agentic Frameworks ("Harnesses")

In the race for high-performance language and action models, AI product engineers and on-premise developers face a constant dilemma: should they invest in larger models or optimize the execution infrastructure and application framework (the harness)?

A series of experiments conducted on local GPU architectures (notably based on NVIDIA RTX Pro 6000 and RTX 3090) provides a decisive insight: raw hardware power is useless without optimal PCIe communication, and an average model paired with the right harness can outperform a massive model running in a basic configuration.

---

## Part 1: High-Level Overview & Decision Summary

### 1. The Hardware Bottleneck: PCIe Switch, ReBar, and Above 4G Decoding

To run massive models (such as GLM-52 or DeepSeek V4) locally, multi-GPU setups are essential. However, connecting multiple graphics cards to a consumer or workstation motherboard quickly creates a bottleneck.

* **PCIe Gen 5 Switch:** Directly interconnects multiple GPUs with each other and the host at high bandwidth without saturating the system bus.
* **The Necessity of Resizable BAR (ReBar) & Above 4G Decoding:** Without activating both features in the BIOS, overall system performance can drop by 30% to 50%. Furthermore, certain proprietary BIOSes (especially on pre-built OEM machines) fail to manage or actively disable the PCIe switch re-timer, causing GPUs to completely disconnect when the OS loads.

### 2. The Model Debate: The Battle of Bits and Precision

The analysis reveals fierce competition between two distinct approaches:

* **GLM-52 (3.25 bpw / FP4):** A heavy, highly capable model, but computationally expensive, reaching roughly 75 tokens/second.
* **DeepSeek V4 Flash (0731 build):** An ultra-fast model (exceeding 350 to 400 tokens/sec thanks to DSpark and the PCIe Gen 5 Switch). Its precision is primarily 4-bit, drastically reducing its memory footprint.

### 3. The Software Breakthrough: The Right Harness is All You Need

A harness (an agentic execution framework) is the software layer wrapping the model to execute complex tasks (reasoning loops, tool calls, error corrections).

* **Minion (Minimalist Harness):** Tests the raw intelligence of the model without additives. On this harness, DeepSeek V4 Flash 0731 scored a disappointing 44/89 on TerminalBench.
* **OM (Heavy Iterative Harness):** Provides advanced autonomy. When switching DeepSeek V4 Flash to the OM harness, its score jumps to 64/89 (72%), directly rivaling GLM-52 (65/89 with OM)!

> **Product Takeaway:** An iterative harness allows a lightweight, fast model to compensate for its reasoning gaps through feedback loops. The trade-off is significantly higher token consumption and longer overall task resolution times.

---

## Part 2: Chronological Flow & Critical Step Analysis

```
[Step 1: Hardware PCIe] ──> [Step 2: Agentic Benchmarking] ──> [Step 3: Multi-Model & Vision]

```

### Step 1: The Hardware Setup Nightmare (PCIe Switch & Retimer)

* **Context:** Attempting to install a 100-lane PCIe Gen 5 switch with a re-timer to drive a cluster of RTX Pro 6000 cards.
* **Testing:** Successive trials on Dell T2 Tower, Puget systems, Box Workstations, and custom builds.
* **BIOS Issues:** On the Dell T2 Tower, despite enabling Above 4G and ReBar, the switch disconnected from the bus as soon as the OS loaded. On the Box machine, the lack of ReBar caused a ~40% drop in token streaming throughput.
* **Workaround:** Converted a legacy host machine into a test bench using a Re-timer card connected via dual MCIO cables to the PCIe Gen 5 switch.

> **Critical Analysis:** The local AI hardware market severely lacks cross-compatibility testing. Product engineers cannot rely solely on spec sheets: OEM proprietary BIOSes remain black boxes that frequently block large memory address spaces (BAR) required by modern multi-GPU topologies.

### Step 2: Model Evaluation – The Case of Poolside Laguna S21

* **Launch:** Poolside released Laguna S21 (118B parameters, 8B active) boasting impressive scores (70.2 on TerminalBench).
* **Replication Failure:** Impossible to replicate these results under real-world conditions.
* **Diagnosis:** Massive overfitting to the vendor's internal benchmark harness. Placed in a standard environment, Laguna S21 produces hallucinated tool calls directly inherited from its training harness formatting.

> **Critical Analysis:** This is a classic trap of "Harness Overfitting." For an AI engineer, adopting a model whose reasoning capabilities are rigidly tied to a vendor's harness creates significant technical debt. If your production pipeline does not match that exact schema, the model degrades rapidly.

### Step 3: The Showdown – DeepSeek V4 Flash (0731) vs GLM-52

* **Metrics Shift:** DeepSeek claimed its V4 Flash 0731 version outperformed GLM-52. Initially dismissed when tested under the minimalist Minion harness where it performed poorly.
* **Transition to OM Harness:** Switching to the iterative OM harness completely shifted the results.

| Model | Harness | Successful Tasks (TerminalBench) | Score (%) | Speed (Decode) |
| --- | --- | --- | --- | --- |
| **GLM-52 (3.25 bpw)** | OM | 65 / 89 | 73% | ~75 tok/s |
| **DeepSeek V4 Flash (0731)** | OM | 64 / 89 | 72% | ~350 - 400 tok/s |
| **GLM-52 (3.25 bpw)** | Minion | 61 / 89 | 68% | ~75 tok/s |
| **DeepSeek V4 Flash (0731)** | Minion | 44 / 89 | 49% | ~350 - 400 tok/s |

> **Critical Analysis:** The OM harness functions as a real-time error corrector. DeepSeek V4 Flash leverages its high inference speed (400 tok/s) to run 3 or 4 iterations in the same timeframe it takes GLM-52 to generate a single response. However, input context memory costs increase due to these continuous round-trips.

### Step 4: Kernel Specialization & Vision Integration (Qwen 36/38)

**Hybrid Architecture:** To balance workloads, the local cluster offloads tasks across dedicated hardware:

* Heavy reasoning/coding models (GLM-52 or DeepSeek V4) are hosted on the main RTX Pro 6000 array.
* A smaller multimodal model (e.g., Qwen 36 27B at 4-bit) runs on a dedicated RTX 3090 card to handle vision tasks (robotics, diagram analysis, web interface interaction).

**Robotics Application:** Experimented with Learning from Demonstration (ACT - Action Chunking with Transformers and Lerobot) on a Unitree G1 humanoid robot. Visual analysis and 3D asset generation strictly require a dedicated companion VLM.

---

## Part 3: Executive Summary & Product Recommendations

```
                                  ┌── Minion (Simple) ──> Fast, Token-Efficient, requires Smart Model (GLM-52)
                                  │
AI Engineer's Choice ─────────────┤
                                  │
                                  └── OM (Iterative) ───> Trades Latency/Tokens to unlock Fast Models (DS V4)

```

1. **Do Not Ignore Underlying Hardware Infrastructure:** Before purchasing high-end GPUs, verify that your motherboard natively supports ReBar and Above 4G Decoding over Gen 5 PCIe Switches to prevent up to a 40% loss in streaming throughput.
2. **Align Your Harness with Your Service Level Objective (SLO):**
* If you need **low latency and simple architectures**, pair a large model (e.g., GLM-52) with a lightweight harness.
* If you prioritize **cost-per-inference and throughput**, combine an ultra-fast smaller model (e.g., DeepSeek V4 Flash) with a highly iterative harness (e.g., OM).


3. **Beware of Vendor Benchmarks:** Always re-test models in your own environment rather than relying blindly on publisher-provided evaluation harnesses.

---

## Sources & References

* **Reference Video / File:** *"The Right Harness is All You Need - For local Frontier AI"*
* **Hardware:** NVIDIA RTX Pro 6000, RTX 3090, PCIe Gen 5 Switch, MCIO Retimers, Dell T2 Tower.
* **Software / Frameworks:** OM Harness, Minion Harness, DSpark, Lerobot, ACT (Action Chunking with Transformers).
* **LLM/VLM Models:** GLM-52 (3.25 bpw), DeepSeek V4 Flash (preview & 0731), Poolside Laguna S21, Qwen 36/38 27B.
* **Benchmarks:** TerminalBench 21.