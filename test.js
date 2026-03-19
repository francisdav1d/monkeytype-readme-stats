import { fetchMonkeytypeStats } from './src/fetcher.js';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
  try {
    const data = await fetchMonkeytypeStats('francisdavid');
    console.log("SUCCESS:", data);
  } catch (e) {
    console.error("ERROR:", e.message);
  }
}
test();
