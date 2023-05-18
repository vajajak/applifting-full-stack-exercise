# Applifting Full-Stack Exercise
#### By Vitezslav Spirik

This is a proposed solution of [Applifting fullstack exercise](https://github.com/Applifting/fullstack-exercise/blob/master/assignment.md#enroll-beta).

## Getting Started

- First of all, download the [.ENV file](https://drive.google.com/file/d/1EtWzqzfru_pIWiZiVZpbVHPOfSq85pW4/view?usp=share_link) and place it at the project root to get all the necessary environment variables both for API and FE.

- To get started quickly with pre-populated data, use the testing database dump. You can download it [from here](https://drive.google.com/file/d/1MToqCB6JRFVsNh2lTIC45A5_DLMkUdyB/view?usp=sharing).
  
- Similarly you can download the assets to populate the page with meaningful images (user avatars & article featured pages). Download them [from here](https://drive.google.com/file/d/1LHcYY3cjA277vuonAnDKjbqb-lLkL1HH/view?usp=sharing). Place the content of this zip into ```/api/assets/```.

Before first running the project, you will need to generate the schema. Due to the nature of Docker builds, this can't be easily automated. First run:

```bash
docker-compose up -V --build
```

The docker compose file consists of 3 services:
- Database (MySQL)
- API (Nest.js)
- Front-end (Next.js)

Once the Database and API services are up, we can fetch the GraphQL schema and generate Relay typings by doing:

```bash
cd fe
npm run graphql-codegen
npm run relay
```

You can then end the Docker container and start it up again via

```bash
docker-compose down
docker-compose up -V --build
```
Now, you have a fully functional development environment, to run the services again, all you have to do is:

```bash
docker-compose up
```

To run the project in the production stage, you can simply run:
```bash
docker-compose -f docker-compose.production.yml up -V --build
```

## Ports and URLs

- API maps to [localhost:3000](localhost:3000)
- FE maps to [localhost:3001](localhost:3001)
- GraphQL playground can be accessed via [localhost:3000/graphql](localhost:3000/graphql)
- OpenAPI schema (Swagger) is accessible via [localhost:3000/api](localhost:3000/api)

## Users & passwords

- You can use the following testing accounts to log into and test the system.
  
| **Name**         | **Username**           | **Password**  |
|------------------|------------------------|---------------|
| Vítězslav Špiřík | spirik@vajsoft.com     | 123456Abcdef  |
| Elisabeth Strain | el.strain@gmail.com    | 123456Abcdef  |
| Lily Hawkins     | lily.hawkins@gmail.com | 123456Abcdef  |
| Annette Bell     | annette.bell@gmail.com | Test123456Abc |

## Known issues & imperfections

- The reCaptcha module is prepared in BE, but i didn't have time to connect at the FE side. My older implementation didn't work with the Next.js 13 version, and since this is the first project where I'm working with the new app directory and router, I didn't have time to dig deep into this. When working, it should be used to validate user request upon login, commenting, and setting votes.
- Slugify doesn't check for duplicites, meaning when you create 2 or more articles with the same title, only 1 (first one) will be resolved when reading. When (and if) I have more time to implement this functionality, I will, this is a straightforward process and shouldn't take too much time. I imagine checking the db for row with this slug, and if it exists, adding some kind of identifier to the end, for example a number (describing which version in the order this slug represents).
- Subscriptions use the older transport-ws protocol (deprecated) instead of the newer graphql-ws. I was not able to make the new one wirk in a reasonable amount of time with the GQL Playground. Therefore I fallbacked to the older implementation. This isn't ideal but at least it works.


Tested on Node 18

## Contact

- If you've run into difficulties running the containers or if you have questions regarding the solution, don't hesitate to contact me at [spirik@vajsoft.com](mailto:spirik@vajsoft.com).