import axios from "axios";
import { OPEN_EXCHANGE_API_URL } from "src/common/constants";

/**
 * Interface for currency conversion parameters
 */
interface CurrencyConversionParams {
    amount: number;
    from: string;
    to: string;
}

/**
 * Interface for the Open Exchange Rates API response
 */
interface CurrencyConversionResponse {
    base: string;
    rates: Record<string, number>;
}

/**
 * Converts an amount from one currency to another using real-time exchange rates
 * from the Open Exchange Rates API
 *
 * @param params - Object containing:
 *   - amount: The amount to convert
 *   - from: Source currency code (e.g., "USD", "EUR")
 *   - to: Target currency code (e.g., "GBP", "JPY")
 * @returns Promise<number> - The converted amount in the target currency
 */
export async function convertCurrencies(
    params: CurrencyConversionParams,
): Promise<number> {
    const response = await axios.get<CurrencyConversionResponse>(
        OPEN_EXCHANGE_API_URL,
    );
    const rates = response.data.rates;

    // Get exchange rates for source and target currencies
    const fromRate = rates[params.from.toUpperCase()] || 1;
    const toRate = rates[params.to.toUpperCase()] || 1;

    // Calculate conversion using the ratio of target to source rates
    const rate = toRate / fromRate;
    const result = params.amount * rate;

    return result;
}
