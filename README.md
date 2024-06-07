# Around The World - Places Guide

## Features

- Users can share places they recommend and their locations with other users
- User profile (Authentication & Autherization)
- Multiple data models, image upload using multer etc.
- Places management
- Leaflet maps
- Database management (places & users)


### Install Dependencies (frontend & backend)

```
npm install
Run postgres either locally or on the cloud (neon.tech)
```
### Create enviroment variables (.env) files
```
Copy over all .env.example files to .env (Check apps and packages folders for files)
Update .env files everywhere with the right db url
```
### Migrate Database and Generate Prisma Client
```
Go to `packages/db`
    - npx prisma migrate dev
    - npx prisma db seed
```

### Run

```
- Go to `apps/user-app` , run `npm run dev`
- Try logging in using phone - 1111111111 , password - alice (See `seed.ts`)

```


## Build & Deploy

```
# Create frontend prod build
cd client
npm run build
```
