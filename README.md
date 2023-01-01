
# Knews Daily

In a fast moving world, we need something to help us gather information
happening everyday. At the same time, we do not subscribe to newspapers because we are
zoomers. 

Knews Daily is here to help! Select topics that interest you to get your customized 
_knewspaper_ everyday, including information all across the web that we _knew_ you would 
want to read. 

The deployment can be viewed under the [environments tab](https://github.com/wu-ming233/Knews-Daily/deployments). Or, you could also access
it via [knews-daily.cyclic.app](https://knews-daily.cyclic.app/)
## Features :star:

- Weather and temperature info based on your location
- Articles based on your pre-selected interests
- **Games on sale today that you might want to look at!**
- Change your interests and location anytime in **account settings**
- Like what you'd expect, your personalized _knewspaper_ updates per day


## Tech Stack :hammer_and_wrench:

![frameworks](https://cdn.discordapp.com/attachments/772859425261748255/1058964870416056431/image.png)


## Showcase :tv:

![Screenshot](https://cdn.discordapp.com/attachments/772859425261748255/1058878416289546340/showcase-1.png)


## API Reference :notebook_with_decorative_cover:

#### Login to get authorization token

```
  POST /api/login
```

| Body Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. The user's email you are trying to login |
| `password` | `string` | **Required**. The user's password you are trying to login |

#### Register

```
  POST /api/users
```

| Body Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Email to register with |
| `password` | `string` | **Required**. Password to register with|
| `location` | `string` | **Required**. Location, in the form <City>, <ISO 3166 Country Code> |
| `sections` | `array` | **Required**. An array of topics you are interested in |

#### Get User Info

```
  GET /api/users/${userEmail}
```

| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `authorization`      | `string` | **Required**. The authorization token of userEmail |


## Installation :floppy_disk:

The frontend has been put into an optimized production build, located in the 
`build` folder. 

As for the backend, the user model for MongoDB is in `models`, the routers sit in 
`controllers`, and `server.js` is our express app.

You can installed this project via:

```bash
  npm install
  npm start
```
## Environment Variables :gear:

To run this project, you will need to add the following environment variables to your .env file:

`MONGODB: <MongoDB URI>` 

`PORT: <your desired port>`

`TOKEN_HASH: <any string. used to hash tokens>`

`REACT_APP_GUARDIAN_API: <API key from the Guardian API>`

`REACT_APP_WEATHER_API: <API key from the Openweathermap API>`

