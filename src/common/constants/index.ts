import { env } from "../../config/envConfig";

export const OPEN_EXCHANGE_API_URL = `https://openexchangerates.org/api/latest.json?app_id=${env.OPEN_EXCHANGE_RATES_APP_ID}`;
