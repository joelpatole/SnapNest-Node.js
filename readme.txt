npx ts-node-dev src/server.ts
mongodb+srv://joelpatole4:Joelpatole12345@cluster0.ce3cmnb.mongodb.net/social_media
This application is build in MVC Model-View-Controller (MVC) Architecture.
But Below is thefolder structure for Microservices Architecture of the same appliation.
Recommended is Microservices Architecture.
Here every module like user or post or comment etc is a small MVC itself.
The advantage is one team can work on one module.

my-social-media-app/
├── services/
│   ├── auth/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── middlewares/
│   │   │   ├── utils/
│   │   │   ├── validators/
│   │   │   ├── app.ts
│   │   │   └── server.ts
│   │   ├── config/
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   ├── integration/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── .env
│   ├── posts/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── middlewares/
│   │   │   ├── utils/
│   │   │   ├── validators/
│   │   │   ├── app.ts
│   │   │   └── server.ts
│   │   ├── config/
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   ├── integration/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── .env
│   ├── users/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── middlewares/
│   │   │   ├── utils/
│   │   │   ├── validators/
│   │   │   ├── app.ts
│   │   │   └── server.ts
│   │   ├── config/
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   ├── integration/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── .env
│   ├── comments/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── middlewares/
│   │   │   ├── utils/
│   │   │   ├── validators/
│   │   │   ├── app.ts
│   │   │   └── server.ts
│   │   ├── config/
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   ├── integration/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── .env
│   └── notifications/
│       ├── src/
│       │   ├── controllers/
│       │   ├── models/
│       │   ├── routes/
│       │   ├── services/
│       │   ├── middlewares/
│       │   ├── utils/
│       │   ├── validators/
│       │   ├── app.ts
│       │   └── server.ts
│       ├── config/
│       ├── tests/
│       │   ├── unit/
│       │   ├── integration/
│       ├── Dockerfile
│       ├── package.json
│       ├── tsconfig.json
│       └── .env
├── gateway/
│   ├── src/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── config/
│   ├── tests/
│   │   ├── unit/
│   │   ├── integration/
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── common/
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── responseHandler.ts
│   │   └── ...
│   ├── middlewares/
│   │   ├── authMiddleware.ts
│   │   ├── errorHandler.ts
│   │   ├── validateRequest.ts
│   │   └── ...
│   ├── validators/
│   │   ├── authValidator.ts
│   │   ├── postValidator.ts
│   │   ├── userValidator.ts
│   │   └── ...
│   ├── models/
│   │   ├── User.ts
│   │   ├── Post.ts
│   │   └── ...
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── docker-compose.yml
├── .eslintignore
├── .eslintrc.json
├── .gitignore
├── README.md
└── package.json


Each microservice is a standalone application with its own configuration, controllers, models, routes, services, middlewares, utils, validators, and tests.

auth/: The authentication service.
posts/: The posts service.
users/: The users service.
comments/: The comments service.
notifications/: The notifications service.

gateway/: This directory contains the API Gateway, which acts as a single entry point to route requests to the appropriate microservices. 
It also handles cross-cutting concerns like authentication, rate limiting, etc.

common/: This directory contains shared resources that can be used by multiple services, such as utility functions, middleware, validators, and models.

