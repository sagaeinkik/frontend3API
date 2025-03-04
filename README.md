# Blog API

Moment 3 i Fördjupad Frontendutveckling

## Bakgrund

Moment 4 går ut på att skapa en klientapplikation som är kopplad till ett API och har skyddade router som kräver inloggning, och ett backend-API med anslutning till en databas.
Detta API är alltså backend-biten för en blogg.

## Om API:et

API:et är gjort i Fastify med Mongoose som ODM och kopplat till en databas på MongoDB Atlas.

### Endpoints

Users har ej CRUD-funktionalitet.

|  Metod | Endpoint    |  Beskrivning                  | Kräver token |
| ------ | ----------- | ----------------------------- | ------------ |
| GET    |  /          | Välkomstroute                 | Nej          |
| GET    |  /users     |  Hämtar alla användare        | Nej          |
| GET    |  /users/:id | Hämtar enskild användare      | Nej          |
| POST   |  /signup    |  Registrera en ny användare   | Nej          |
| POST   |  /login     |  Logga in befintlig användare | Nej          |
| GET    |  /posts     | Hämtar alla blogginlägg       | Nej          |
| GET    |  /posts/:id | Hämtar enskilt inlägg         | Nej          |
| POST   | /posts      | Lägger till nytt inlägg       | Ja           |
|  PUT   | /posts/:id  | Uppdaterar inlägg             | Ja           |
| DELETE | /posts/:id  | Raderar inlägg                | Ja           |
