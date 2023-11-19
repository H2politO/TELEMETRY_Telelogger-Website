# Docker deployment

## Setup

1. Install docker on host machine
2. Download the Dockerfile on the host machine (Click on it, dowload raw file)
3. Move the Dockerfile to an empty directory
4. Enter the directory and run where **yourtoken** is a github token with repo access (get one [here](https://github.com/settings/tokens)) and **branch** is the branch you want to install:

    `sudo docker build . -t h2politowebsite --build-arg GIT_TOKEN=yourtoken --build-arg BRANCH=branch`
6. The image will be built

## Environment variables

- PORT: sets the port on which the server listens, if changed after build might be necessary to manually update the docker exposed port