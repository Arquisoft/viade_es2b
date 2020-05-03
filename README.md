[![Build Status](https://travis-ci.org/Arquisoft/viade_es2b.svg?branch=master)](https://travis-ci.org/Arquisoft/viade_es2b)
[![codecov](https://codecov.io/gh/Arquisoft/viade_es2b/branch/master/graph/badge.svg)](https://codecov.io/gh/Arquisoft/viade_es2b)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a51341bb04f849ed8fec4356591860e7)](https://www.codacy.com/gh/Arquisoft/viade_es2b?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Arquisoft/viade_es2b&amp;utm_campaign=Badge_Grade)
[![codecov](https://codecov.io/gh/Arquisoft/viade_es2b/branch/develop_UO270318/graph/badge.svg)](https://codecov.io/gh/Arquisoft/viade_es2b)

# VIADE ES2B

This repository contains a skeleton of the VIADE project.

This project is an assignment for the [Software Architecture course](https://arquisoft.github.io/) following [these requirements](https://labra.solid.community/public/SoftwareArchitecture/AssignmentDescription/).

The app is deployed at [https://arquisoft.github.io/viade_es2b/](https://arquisoft.github.io/viade_es2b/) which also contains a [technical documentation](https://arquisoft.github.io/viade_es2b/docs).

More information about how this project has been setup is available [in the wiki](https://github.com/Arquisoft/viade_es2b/wiki).

## Docker
Our app can be deployed in docker, as you can see because the Dockerfile in the main directory. To deploy the app you should follow these instructions:

1. You should build the docker image first.

    **docker build -t viade_es2b/app .**
    
2. Once built, it's time to run. This command is intended for Windows systems using CMD, in other enviroments you may be required to change the -v parameter.

    **docker run -itd --rm -v ./app -v /app/node_modules -p 3001:3000 -e CHOKIDAR_USEPOLLING=true viade_es2b/app**
    
Once this is done you will be able to access the docker deployed app throguht **http://localhost:3001/**

## Team Members
 
-   Ángela López López [UO270318](https://github.com/Ainiall)
-   Daniel Fernández Aller [UO257977](https://github.com/daniferna)
-   Diego Fernández Suárez [UO263662](https://github.com/UO263662)
-   Iván Fernández López [UO265349](https://github.com/uo265349)
-   Noé Fernández Moro [UO251683](https://github.com/UO251683)

Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
