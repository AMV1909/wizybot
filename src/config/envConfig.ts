import "dotenv/config";
import { object, string, z, ZodError } from "zod";

const envSchema = object({
    // OpenAI
    OPENAI_API_KEY: string().min(1),
    OPENAI_MODEL: string().optional().default("gpt-4o-mini"),

    // Open Exchange Rates
    OPEN_EXCHANGE_RATES_APP_ID: string().min(1),

    // Server
    PORT: string().optional().default("3000"),
});

type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
    try {
        const env = envSchema.parse(process.env);

        return env;
    } catch (error) {
        if (error instanceof ZodError) {
            const missingVars = error.errors
                .map((err) => err.path.join("."))
                .join(", ");

            throw new Error(
                `Missing or invalid environment variables: ${missingVars}`,
            );
        }

        throw error;
    }
}

export const env = validateEnv();
