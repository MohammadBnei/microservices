## Installation

Install the npm packages :
```bash
pnpm install
```

(Optional) Start the mariadb container :
```bash
docker-compose up -d
```

Run the migration :
```bash
pnpm mikro-orm migration:up
```

Start the server :
```bash
pnpm start:dev
```

## Description

User api with :
- winston logger
- env variable verification
- validation
- sanitazation
- full authentication, authorization
 
Ready for microservices