import http from 'k6/http';
import { check, sleep } from 'k6';

// config
export const options = {
  stages: [
    { duration: '50s', target: 100 },   // Increase to 100 users  (Ramp-up)
    { duration: '250s', target: 500 },  // Up to 500 users
    { duration: '500s', target: 1000 }, // Load test up to 1000 users
    { duration: '1m', target: 0 },      // Slowly reducing the user
  ],
  
  // Performance requirments (SLA)
  thresholds: {
    'http_req_duration': ['p(95)<2500'], //95% request < 2.5 sec
    'http_req_failed': ['rate<0.01'],    //error rate < 1%
  },
};

export default function () {
  const url = 'https://your-ecommerce-site.com'; 
  
  // Request Send
  const res = http.get(url);

  // result check
  check(res, {
    'Status is 200': (r) => r.status === 200,
    'Page Loaded': (r) => r.body.length > 0,
    'Protocol is HTTPS': (r) => r.url.startsWith('https'),
  });

  
  sleep(1);
}