/**
 * Interface for currency conversion parameters
 */
interface CurrencyConversionParams {
    amount: number;
    from: string;
    to: string;
}

/**
 * Interface for currency conversion response
 */
interface CurrencyConversionResponse {
    amount: number;
    from: string;
    to: string;
    result: number;
    rate: number;
}

/**
 * Converts an amount from one currency to another
 * This is a mock implementation that uses fixed exchange rates
 *
 * @param params - Object containing amount and currency codes
 * @returns Promise<CurrencyConversionResponse> - Object containing conversion result
 */
export async function convertCurrencies(
    params: CurrencyConversionParams,
): Promise<CurrencyConversionResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock exchange rates (in a real app, these would come from an API)
    const rates: Record<string, number> = {
        USD: 1,
        EUR: 0.85,
        GBP: 0.73,
        JPY: 110.0,
    };

    // Get exchange rates
    const fromRate = rates[params.from.toUpperCase()] || 1;
    const toRate = rates[params.to.toUpperCase()] || 1;

    // Calculate conversion
    const rate = toRate / fromRate;
    const result = params.amount * rate;

    // Return conversion result
    return {
        amount: params.amount,
        from: params.from.toUpperCase(),
        to: params.to.toUpperCase(),
        result: Number(result.toFixed(2)),
        rate: Number(rate.toFixed(4)),
    };
}
