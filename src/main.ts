import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";
import { env } from "./config/envConfig";

/**
 * Bootstrap function to initialize and start the NestJS application
 * This function:
 * 1. Creates the NestJS application instance
 * 2. Sets up global API prefix
 * 3. Configures Swagger documentation
 * 4. Starts the server on the configured port
 */
async function bootstrap() {
    // Create NestJS application instance
    const app = await NestFactory.create(AppModule);

    // Set global prefix for all routes
    app.setGlobalPrefix("api");

    // Configure Swagger documentation
    const config = new DocumentBuilder()
        .setTitle("Wizzybot API")
        .setDescription("The Wizzybot API documentation")
        .setVersion("1.0")
        .addBearerAuth()
        .build();

    // Create and setup Swagger documentation
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document);

    // Start the server
    await app.listen(env.PORT);
}

// Execute bootstrap function
void bootstrap();
