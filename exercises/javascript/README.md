In order to run this project, first ensure at least node version 10 is being used  (this can be checked using the command `node -v`. The latest lts version of node can be installed using the nvm command `nvm install --lts`. To list all (lts) versions use ```nvm ls-remote [--lts]`` to get the version number then install with ```nvm install [version]```)

To run a specific node version run ```nvm use [version]```, ```nvm use node``` will use the latest (lts) version installed.

## Install dependencies
Use the command
```npm ci``` for a clean install (or alternatively ```npm install``` though the former is preferable to ensure a clean install for an existing project).

## Run tests
To run the tests, use
```npm test```
