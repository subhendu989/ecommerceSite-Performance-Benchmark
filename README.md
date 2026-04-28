# Performance Testing Benchmark: E-commerce

This repository showcases a professional performance testing project for a e-commerce platform. The testing was conducted using two industry-leading tools: **Apache JMeter** and **k6**.

---

## 🎯 Project Objective
The goal of this project was to simulate real-world user traffic to identify system bottlenecks, response time degradation, and the overall breaking point of the server.

## 🛠️ Tools & Technologies
- **JMeter:** Used for protocol-based load testing with structured ramp-up.
- **k6 (Grafana):** Used for "Performance-as-Code" to execute aggressive stress tests.
- **JavaScript:** Scripting language for k6.
- **Environment:** https://your-ecommerce-site.com

---

## 📊 Comparative Test Results

### 1. Apache JMeter (Managed Load)
- **Scenario:** 100 to 1,000 Users with a slow ramp-up (500s).
- **Result:** **PASSED**.
- **Observation:** The system remained stable with a **0% error rate** when users were introduced gradually.

### 2. k6 (Stress Test)
- **Scenario:** 1,000 Concurrent Users with aggressive hits.
- **Result:** **CRITICAL FAILURE**.
- **Observation:** Identified a bottleneck at 1,000 users with an **89.88% failure rate** and 60s timeouts, proving the server's limit.

---

## 📂 Repository Structure
- `/jmeter`: Contains `.jmx` script and the comprehensive PDF report.
- `/k6`: Contains the `.js` script and interactive HTML performance report.

---

## 🚀 How to Run the Tests

### For k6:
1. Install k6 on your machine.
2. Run the command:
   ```bash
   k6 run k6/report.js
