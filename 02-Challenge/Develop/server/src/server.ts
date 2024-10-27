import dotenv from 'dotenv';
import axios from 'axios';
import express from 'express';
import type { Request, Response } from 'express';
import { Configuration, OpenAIApi } from 'openai';
import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";
import { StructuredOutputParser, OutputFixingParser } from 'langchain/output_parsers';
import routes from './routes/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const openWeatherApiKey = process.env.OPENWEATHER_API_KEY;
const openAiApiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAIApi(
  new Configuration({ apiKey: openAiApiKey })
);

// Check if the API key is defined
if (!openWeatherApiKey) {
  console.error('OPENWEATHER_API_KEY is not defined. Exiting...');
  process.exit(1);
}
if (!openAiApiKey) {
  console.error('OPENAI_API_KEY is not defined. Exiting...');
  process.exit(1);
}

app.use(express.json());
app.use('/static', express.static('dist'));
app.use(routes);

// TODO: Initialize the OpenAI model

// TODO: Define the parser for the structured output

// TODO: Get the format instructions from the parser

// TODO: Define the prompt template

// Create a prompt function that takes the user input and passes it through the call method
const promptFunc = async (input: string) => {
        // TODO: Format the prompt with the user input
        // TODO: Call the model with the formatted prompt
        // TODO: return the JSON response
        // TODO: Catch any errors and log them to the console
};

// Fetch 5-day weather forecast from OpenWeather
app.get('/api/weather/:location', async (req, res) => {
  try {
    const { location } = req.params;
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast`,
      {
        params: {
          q: location,
          units: 'metric',
          appid: openWeatherApiKey,
        },
      }
    );
    const weatherData = weatherResponse.data;

       // Prepare prompt with weather data for OpenAI
       const forecastSummary = weatherData.list.slice(0, 5).map((day: any, i: number) => (
        `Day ${i + 1}: ${day.weather[0].description}, around ${day.main.temp}°C.\n`
      )).join('');
  
      const prompt = `
        Imagine you’re a sports announcer giving an exciting 5-day weather forecast:
        ${forecastSummary}
      `;
  
      // Use OpenAI API for announcer-style forecast
      const openAiResponse = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt,
        max_tokens: 100,
      });
  
      const announcerForecast = openAiResponse.data.choices[0].text?.trim();
  
      // Return combined data as JSON
      res.json({
        location,
        weatherData,
        announcerForecast,
      });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching weather or generating forecast' });
    }
  });
  
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

// Endpoint to handle request
app.post('/forecast', async (req: Request, res: Response): Promise<void> => {
  try {
    const location: string = req.body.location;
    if (!location) {
      res.status(400).json({
        error: 'Please provide a location in the request body.',
      });
    }
    const result: any = await promptFunc(location);
    res.json({ result });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// import dotenv from 'dotenv';
// import express from 'express';
// dotenv.config();

// // Import the routes
// import routes from './routes/index.js';

// const app = express();

// const PORT = process.env.PORT || 3001;

// // TODO: Serve static files of entire client dist folder
// app.use('/static', express.static('dist'))

// // TODO: Implement middleware for parsing JSON and urlencoded form data

// // TODO: Implement middleware to connect the routes
// app.use(routes);

// // Start the server on the port
// app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
