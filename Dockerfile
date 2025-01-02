# Keep this in sync with the Node version specified for the Conda dev environment (in environment_dev.yml)
FROM node:22-slim AS build

RUN corepack enable

WORKDIR /usr/src/app

COPY . ./

# Use the --immutable flag as a precaution. This guarantees that the Docker
# build will fail if `yarn install` results in a different yarn.lock file than
# the one checked into the repo. This could happen for example if the version of
# Yarn used in one dev environment differs from the version used here.
RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn \
    yarn install --immutable && \
    yarn run build && \
    STANDALONE=1 yarn run webpack:prod bundle

# ---------------------------------------------------------------------------------
# for production
FROM node:22-slim AS prod

WORKDIR /usr/src/conda-store-ui

COPY --from=build /usr/src/app/server /usr/src/conda-store-ui/server
COPY --from=build /usr/src/app/dist /usr/src/conda-store-ui/dist

RUN cd server && npm install

ENV NODE_ENV=production

EXPOSE 8000

CMD ["node", "server/serve.js"]

# ---------------------------------------------------------------------------------
# for dev
FROM build AS dev  

EXPOSE 8000

CMD [ "yarn", "run", "start:ui" ]
