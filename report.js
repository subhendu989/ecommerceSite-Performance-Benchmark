import http from 'k6/http';
import { check, sleep } from 'k6';
// Generate HTML report
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  // step load configaration
  stages: [
    { duration: '50s', target: 100 },   // প্রথম ৫০ সেকেন্ডে ১০০ ইউজার পর্যন্ত বাড়বে
    { duration: '250s', target: 500 },  // পরবর্তী ২৫০ সেকেন্ডে ৫০০ ইউজার হবে
    { duration: '500s', target: 1000 }, // শেষ ৫০০ সেকেন্ডে ১০০০ ইউজার হবে
    { duration: '1m', target: 0 },      // শেষে ১ মিনিটে ইউজার সংখ্যা ০ তে নেমে আসবে
  ],

  // Performance standards (SLA)
  thresholds: {
    'http_req_duration': ['p(95)<2500'], // ৯৫% রিকোয়েস্ট ২.৫ সেকেন্ডের নিচে হতে হবে
    'http_req_failed': ['rate<0.01'],    // এরর ১% এর কম হতে হবে
  },
};

export default function () {
  //demo site URL
  const url = 'https://your-ecommerce-site.com'; 
  
  const res = http.get(url);

  // Checking whether the request is successful or not
  check(res, {
    'is status 200': (r) => r.status === 200,
    'page loaded successfully': (r) => r.body.length > 0,
  });

  // 1 second pause (realistic user behavior)
  sleep(1);
}

// This function will create a report file named "giftify_performance_report.html" after the test is complete.
export function handleSummary(data) {
  return {
    "giftify_performance_report.html": htmlReport(data),
  };
}