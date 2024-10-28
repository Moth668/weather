# 11 Prompt Engineering: Weather Forecast

## Your Task

Your Challenge this week is to complete a Weather Forecast API that calls the OpenAI API to retrieve a five-day weather forecast for a given city, in the style of a sports announcer, and return a JSON response.

**Important**: This Challenge is optional. To complete this optional Challenge, you'll need an OpenAI API key. Note that there is a cost associated with making requests using an OpenAI API key.

Starter code for the Weather Forecast API has already been created. It's your job to complete the code and integrate the OpenAI API to provide the response.

* For more information on how to get your OpenAI API key, refer to the [Full-Stack Blog post on OpenAI Account Setup](https://coding-boot-camp.github.io/full-stack/ai/openai-account-setup-guide).

* For more information on how to work with the OpenAI API, refer to the [OpenAI API documentation](https://platform.openai.com/docs/overview).

> **important** Make sure to download and unzip the starter code files and make your own repository with the starter code.

Before you start, download the [starter code](https://static.bc-edx.com/coding/software-dev/11-Prompt-Engineering/Develop.zip).

## User Story

```md
AS A traveler
I WANT to see the five-day weather forecast for a city in the style of a sports announcer
SO THAT I can plan a trip
```

## Acceptance Criteria

```md
GIVEN a weather forecast API
WHEN I search for a city
THEN I am presented with the five-day weather forecast for that city in the style of a sports announcer
```

## Sample Input and Output

To meet the acceptance criteria for this application, you might provide the following input:

```json
{
  "location": "Sacramento CA"
}
```

This would then return the following output:

```json
{
  "result": {
    "day1": "And here we go, folks! Day one in Sacramento is looking like a scorcher with a high of 95 degrees and clear skies. It's going to be a hot one out there!",
    "day2": "Moving on to day two, we've got a slight cool down with a high of 90 degrees and a chance of some afternoon showers. It's going to be a nail-biter to see if the rain holds off for the big game!",
    "day3": "Day three is shaping up to be a beautiful day in Sacramento with a high of 85 degrees and sunny skies. Perfect weather for a day out on the golf course or a picnic in the park!",
    "day4": "As we head into day four, temperatures are on the rise again with a high of 92 degrees and mostly sunny conditions. It's going to be a real sizzler out there on the field!",
    "day5": "And finally, on day five, we're looking at a high of 88 degrees with a mix of sun and clouds. It's going to be a thrilling end to the week as we see if the weather holds up for the big championship game!"
  }
}
```

## Getting Started

* You'll need to write code in the `server.ts` file to complete the Weather Forecast API.

  * Follow the `TODO` comments to complete the missing portions of the code.

* You'll also need to provide your OpenAI API key in an .env file.

  * An example .env file is provided named `.env.EXAMPLE`.

* Use Insomnia to test the Weather Forecast API.

* `POST /forecast` should accept a request body with a location, call the OpenAI API to get a five-day weather forecast in the style of a sports announcer, and then return the forecast as JSON data in the response.

**Note**: This Challenge is optional, so feel free to add your own touches to it. Instead of using a sports announcer style, would you prefer to receive the five-day weather forecast in the style of a cartoon character or a famous artist? Be creative!

## Grading Requirements

**Important**: This Challenge is _optional_ and is **not graded**.

Because this Challenge is optional and ungraded, you won't submit your code repository or a deployed application. However, you may want to compare your code to one potential solution for this Challenge.

**Near the end of Module 12, you may ask your instructor to provide the solution for the Challenge**. Remember that this solution is just one potential way to create this application, and that your code may not match the solution completely.

---
© 2024 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.


# 09 Servers and APIs: Weather Dashboard

## Your Task

External APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Developers are often tasked with retrieving data from another application's API and using it in their context, frequently consuming this data via a server.

Your challenge is to build a weather dashboard application that calls the OpenWeather API and renders data in the browser.

The application’s front end has already been created. It's your job to build the back end, connect the two, and then deploy the entire application to Render.

* Use the [5-day weather forecast API](https://openweathermap.org/forecast5) to retrieve weather data for cities.

* The base URL should look like the following:

  ```url
  https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
  ```

* After registering for a new API key, you may need to wait up to 2 hours for that API key to activate.

* For more information on how to work with the OpenWeather API, refer to the [Full-Stack Blog on how to use API keys](https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys).

## User Story

```md
AS A traveler

I WANT to see the weather outlook for multiple cities

SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```md
GIVEN a weather dashboard with form inputs

WHEN I search for a city

THEN I am presented with current and future conditions for that city, and that city is added to the search history

WHEN I view current weather conditions for that city

THEN I am presented with the city name, the date, an icon representation of weather conditions, a description of the weather for the icon's alt tag, the temperature, the humidity, and the wind speed

WHEN I view future weather conditions for that city

THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

WHEN I click on a city in the search history

THEN I am again presented with current and future conditions for that city
```

## Mock-Up

The following image shows the web application's appearance and functionality:

![The weather app includes a search option, a list of cities, and a 5-day forecast and current weather conditions for Atlanta ](./Assets/09-servers-and-apis-homework-demo.png)

## Getting Started

On the back end, the application should include a `searchHistory.json` file that will be used to store and retrieve cities using the `fs` module.

The following HTML route should be created:

* `GET *` should return the `index.html` file.

The following API routes should be created:

* `GET /api/weather/history` should read the `searchHistory.json` file and return all saved cities as JSON.

* `POST /api/weather` should receive a city name to save on the request body, add it to the `searchHistory.json` file, and then return associated weather data to the client. You'll need to find a way to give each city name a unique id when it's saved (look into npm packages that could do this for you).

Refer to the [Full-Stack Blog on deploying to Render](https://coding-boot-camp.github.io/full-stack/render/render-deployment-guide) and the [Render documentation on setting environment variables](https://docs.render.com/configure-environment-variables).

---

## 💡 Hints

* Using the 5-day weather forecast API, you'll notice that you'll need to pass in coordinates instead of just a city name. Using the OpenWeatherMap APIs, how could we retrieve geographical coordinates given a city name?

* How could we make the OpenWeather API calls server-side, parse the data, and then send the parsed data client-side?

## 🏆 Bonus

This application offers the DELETE functionality on the front end. As a bonus, try to add the DELETE route to the application using the following guideline:

* `DELETE /api/weather/history/:id` should receive a route parameter that contains the id of a city name to delete. To delete a city, you'll need to read all the cities from the `searchHistory.json` file, remove the city with the given `id` property, and then rewrite the cities to the `searchHistory.json` file.

---

## Grading Requirements

> **Note** If a Challenge assignment submission is marked as “0”, it's considered incomplete and won't count toward your graduation requirements. Examples of incomplete submissions include the following:
>
> * A repository that has no code.
>
> * A repository that includes a unique name but nothing else.
>
> * A repository that includes only a README file but nothing else.
>
> * A repository that includes only starter code.

This Challenge is graded based on the following criteria:

### Technical Acceptance Criteria: 40%

The Challenge satisfies all of the above acceptance criteria, plus the following:

* Application uses the OpenWeather API to retrieve weather data.

* Application back end must store cities that have a unique id in a JSON file.

* Application must be deployed to Render.

### Deployment: 32%

The Challenge satisfies all of the above acceptance criteria, plus the following:

* Application deployed at live URL.

* Application loads with no errors.

* Application GitHub URL submitted.

* GitHub repository that contains application code.

### Application Quality: 15%

The Challenge satisfies all of the above acceptance criteria, plus the following:

* Application user experience is intuitive and easy to navigate.

* Application user interface style is clean and polished.

* Application resembles the mock-up functionality provided in the Challenge instructions.

### Repository Quality: 13%

The Challenge satisfies all of the above acceptance criteria, plus the following:

* Repository has a unique name.

* Repository follows best practices for file structure and naming conventions.

* Repository follows best practices for class/id naming conventions, indentation, quality comments, etc.

* Repository contains multiple descriptive commit messages.

* Repository contains quality README file with description, screenshot, and link to deployed application.

### Bonus: +10 Points

Fulfilling the following can add up to 10 points to your grade. Note that the highest grade you can achieve is still 100:

* Application allows users to delete cities.

## Review

You are required to submit BOTH of the following for review:

* The URL of the functional, deployed application.

* The URL of the GitHub repository. Give the repository a unique name and include a README file describing the project.

---
© 2024 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.
