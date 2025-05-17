# Wizybot

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

Wizybot is an intelligent API built with NestJS that uses OpenAI to process user queries and provide contextual responses. The bot can perform intelligent product searches and currency conversions.

## Features

- 🤖 OpenAI integration for natural language processing
- 🔍 Intelligent product search
- 💱 Currency conversion
- 📚 API documentation with Swagger
- 🚀 Built with NestJS for maximum scalability

## Prerequisites

- Node.js (v16 or higher)
- pnpm
- OpenAI API Key
- Open exchange app id

## Project Setup

1. Clone the repository:
```bash
git clone https://github.com/AMV1909/wizybot
cd wizybot
```

2. Install dependencies:
```bash
pnpm install
```

3. Configure environment variables:
Create a `.env` file in the project root with the following variables:
```env
OPENAI_API_KEY=your_api_key
OPENAI_MODEL=gpt-4o-mini
OPEN_EXCHANGE_RATES_APP_ID=your_app_id
PORT=3000
```

## Running the Project

```bash
# Development
$ pnpm run start:dev

# Production
$ pnpm run start:prod
```

## API Documentation

Once the server is running, you can access the API documentation at:
```
http://localhost:3000/docs
```

## Project Structure

```
src/
├── chat/                # Main chat module
│   ├── dto/             # Data Transfer Objects
│   ├── functions/       # Utility functions
│   └── chat.service.ts  # Business logic
├── common/              # Common utilities
│   ├── helpers/         # Helper functions
│   └── swagger/         # Swagger configuration
└── config/              # Application configuration
```

## Usage Examples

### Product Search
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"query": "Search for a smartphone"}'
```

### Currency Conversion
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"query": "Convert 100 USD to EUR"}'
```
