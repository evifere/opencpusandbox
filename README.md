# Introduction

dashboard lab is a free sample app to help me and hope other to understand how to make a frontend app over an opencpu architecture


![dashboard screen](https://github.com/evifere/opencpusandbox/blob/master/doc/dashboard.png)

# Démo
front end app
![Démo](https://github.com/evifere/opencpusandbox/blob/master/doc/dashboardlab.gif)

how to build chartreader package under rstudio
![buikd](https://github.com/evifere/opencpusandbox/blob/master/doc/buildpackage.gif)

# install docker image

the docker env was taken from this project https://github.com/technologiestiftung/fhpredict-opencpu

launch the opencpu image 

```shell
docker-compose up -d
```

# build chartreader package

go to rstudio on http://localhost:8004/rstudio/

open the workspace chartreader

![Go to rstudio](https://github.com/evifere/opencpusandbox/blob/master/doc/rstudio.png)

then go to build sources

![build sources](https://github.com/evifere/opencpusandbox/blob/master/doc/rstudio2.png)

then install the package and restart opencpu server

![insrtall package](https://github.com/evifere/opencpusandbox/blob/master/doc/rstudio3.png)

# test package 

go to

http://localhost/ocpu/test/

then list your avalaible packe as below


![build sources](https://github.com/evifere/opencpusandbox/blob/master/doc/listpackage.png)


Example: how to list  charteader avalable endpoints

![build sources](https://github.com/evifere/opencpusandbox/blob/master/doc/listendpoints.png)



use ../user/opencpu/library/chartreader/R/boxplotcars


![run boxplotcars](https://github.com/evifere/opencpusandbox/blob/master/doc/runboxplot.png)


retrieve the result from the opencpu session

http://localhost//ocpu/tmp/x04337ea1bc33fe/R/.val/json?auto_json=T

don't forget to use auto_json=T filter if you don't want any malformed json for  frontend devloppement

![get json result](https://github.com/evifere/opencpusandbox/blob/master/doc/getresult.png)




# sample
the sample highchart data.json is from https://www.highcharts.com/docs/getting-started/your-first-chart

The url of the package to call as json 

```
http://localhost/ocpu/user/opencpu/library/mysamplepack/R/test/json
```

install package

```
cd /home/opencpu

R CMD INSTALL  mysamplepack_0.1.0.tar.gz

```
# serve the front end app

```shell
cd app
npm run serve
```

go to http://localhost:8087/

and have fun !

enter login bigdata
password datascience

![login screen](https://github.com/evifere/opencpusandbox/blob/master/doc/login.png)


![dashboard screen](https://github.com/evifere/opencpusandbox/blob/master/doc/dashboard.png)


![dashboard screen](https://github.com/evifere/opencpusandbox/blob/master/doc/dashboard2.png)

![dashboard screen](https://github.com/evifere/opencpusandbox/blob/master/doc/dashboard3.png)

# webography


https://rwebapps.ocpu.io/appdemo/www/plot.html

https://stat.ethz.ch/R-manual/R-devel/library/grDevices/html/boxplot.stats.html

https://github.com/rwebapps/appdemo/blob/master/R/randomplot.R

https://www.tutorialspoint.com/r/r_boxplots.htm

https://github.com/technologiestiftung/fhpredict-opencpu

https://hub.docker.com/r/opencpu/rstudio/

https://cran.r-project.org/web/packages/jsonlite/jsonlite.pdf

http://tuxette.nathalievilla.org/?p=1696

https://github.com/rwebapps/appdemo

https://blog.learningtree.com/creating-web-service-in-r/

http://seankross.com/notes/dpqr/

https://www.tutorialspoint.com/r/r_normal_distribution.htm

use "auto_unbox=T" as an option to the json endpoint

https://github.com/opencpu/opencpu/issues/303

# opencpu with docker


<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Introduction](#introduction)
- [install docker image](#install-docker-image)
- [build chartreader package](#build-chartreader-package)
- [test package](#test-package)
- [sample](#sample)
- [serve the front end app](#serve-the-front-end-app)
- [webography](#webography)
- [opencpu with docker](#opencpu-with-docker)
  - [Prerequisites](#prerequisites)
  - [How Tos](#how-tos)
    - [Reach RStudio & opencpu](#reach-rstudio--opencpu)
    - [Add Files to the Container](#add-files-to-the-container)
    - [Run the Container](#run-the-container)
    - [Start a Session in the Container](#start-a-session-in-the-container)
    - [Add R Packages or other Dependencies](#add-r-packages-or-other-dependencies)
    - [Test the opencpu API](#test-the-opencpu-api)
    - [Do Requests](#do-requests)
      - [**POST** - /ocpu/library/fhpredict/R/simple](#post---ocpulibraryfhpredictrsimple)
      - [**GET** - /ocpu/tmp/<SESSION R Object>/R/.val](#get---ocputmpsession-r-objectrval)
      - [**GET** - /ocpu/info](#get---ocpuinfo)
      - [**GET** - /ocpu/library/fhpredict/info](#get---ocpulibraryfhpredictinfo)

<!-- /code_chunk_output -->

## Prerequisites

- Docker
  - MacOS `brew cask install docker` or by [download](https://hub.docker.com/editions/community/docker-ce-desktop-mac)
  - Windows by [download](https://hub.docker.com/editions/community/docker-ce-desktop-windows)

Basic instructions about opencpu can be found here: [www.opencpu.org/download.html](https://www.opencpu.org/download.html)

## How Tos

### Reach RStudio & opencpu

> Now simply open [http://localhost/ocpu/](http://localhost/ocpu/) and [http://localhost/rstudio/](http://localhost/rstudio/) in your browser! Login via rstudio with user: opencpu (passwd: opencpu) to build or install apps.

**!Hint:** Since PORT 80 is used we need to use the 8004 PORT:

- opencpu api explorer is at [http://localhost:8004/ocpu](http://localhost:8004/ocpu)
- rstudio is at [http://localhost:8004/rstudio](http://localhost:8004/rstudio) (user: opencpu password: opencpu)

### Add Files to the Container

The folder `./workspace` is mapped into the working directory of the container at `/home/opencpu` all files in workspace will directly we available in the container and in RStudio. If you do changes in RStudio to these files they will be saved to your local drive. 

### Run the Container

**!Hint:** Don't copy the `$` in the commands. It is for marking the input.

Start it:  

```bash
$ cd path/to/repository
# if you didn't do changes to opencpu/Dockerfile.dev
# You can ommit the --build flag
$ docker-compose up --build
> Starting opencpu-docker_opencpu_1 ... done
> Attaching to opencpu-docker_opencpu_1
> opencpu_1  |  * Starting periodic command scheduler cron
> opencpu_1  |    ...done.
> …
```

Open your browser and start hacking

Stop it:

End the terminal session by hitting `CTRL + C` and stop the containers (all changes other the done to the files in `workspace:/home/opencpu` will be lost)

```bash
$ docker-compose down
> Stopping opencpu-docker_opencpu_1 ... done
> Removing opencpu-docker_opencpu_1 ... done
> Removing network opencpu-docker_default
```

### Start a Session in the Container

Start a bash session within the container run. Be aware that all changes will be lost when the container gets stopped:  

```bash
$ docker ps
> CONTAINER ID        IMAGE                    COMMAND                  CREATED             STATUS              PORTS                                                 NAMES
> 50ad1d0af4c6        opencpu-docker_opencpu   "/bin/sh -c 'service…"   22 minutes ago      Up 22 minutes       0.0.0.0:80->80/tcp, 0.0.0.0:8004->8004/tcp, 443/tcp   opencpu-docker_opencpu_1
```

Use the Container ID or the NAMES property to run the bash session.

```bash
$ docker exec -it <CONTANER ID | NAME> bash
> sends you into a session in the container
> …
```

### Add R Packages or other Dependencies

To add additional R packages to the container image you have to edit the file `opencpu/Dockerfile.dev`.  
Add a line containing your desired package like this one. Please add the ref parameter to the install (in this case the `@v0.1.0-beta`):  

```docker
RUN R -e "devtools::install_github(\"technologiestiftung/fhpredict@v0.1.0-beta\")"
```

Then run again a `docker-compose up --build` from the root of the repo.  

The image is based on Ubuntu 18.

```txt
Distributor ID: Ubuntu
Description:    Ubuntu 18.04.1 LTS
Release:        18.04
Codename:       bionic
```

To install other dependencies `RUN` the usual `apt-get` commands in the docker file.

**!Hint:** The commands don't allow an interactive prompt. Add the `-y` flag to accept all `Y/n` questions.  

For example to install `curl` you could `RUN`

```docker
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
```

### Test the opencpu API

The opencpu API docs can be found [here](https://www.opencpu.org/api.html).  

The code below assumes the `fhpredict` package is installed and the opencpu container is running. 

### Do Requests

#### **POST** - /ocpu/library/fhpredict/R/simple

**Description:** The function `simple(str = '{"foo":"bah"}')` of the package `fhpredict` takes a JSON string as argument. (Needs to be properly escaped.)  

Requests using CURL

```sh
curl -X POST "http://localhost:8004/ocpu/library/fhpredict/R/simple" \
    -H "Content-Type: application/json" \
    --data-raw "$body"
```

**Header Parameters:** **Content-Type** should respect the following schema:

```plain
{
  "type": "string",
  "enum": [
    "application/json"
  ],
  "default": "application/json"
}
```

**Body Parameters:** **body** should respect the following schema:

```plain
{
  "type": "string",
  "default": "{\n  \"str\": \"{\\\"foo\\\":12}\"\n}"
}
```

#### **GET** - /ocpu/tmp/<SESSION R Object>/R/.val

**Description:** The POST request returns something like the example below. These are new endpoints that are generated during runtime and will be discarded on restart. The result of the calculation can be found under the `.val` endpoint. See also [https://www.opencpu.org/api.html#api-session](https://www.opencpu.org/api.html#api-session)

```bash
/ocpu/tmp/x0aa062559b9cf1/R/.val
/ocpu/tmp/x0aa062559b9cf1/R/simple
/ocpu/tmp/x0aa062559b9cf1/stdout
/ocpu/tmp/x0aa062559b9cf1/source
/ocpu/tmp/x0aa062559b9cf1/console
/ocpu/tmp/x0aa062559b9cf1/info
/ocpu/tmp/x0aa062559b9cf1/files/DESCRIPTION
```

Requests using CURL

```sh
curl -X GET "http://localhost:8004/ocpu/tmp/x0aa062559b9cf1/R/.val"
```

#### **GET** - /ocpu/info

**Description:** From the api docs.  
> The `/ocpu/info` endpoint shows the output of sessionInfo() from the main (web server) process. This can be helpful for debugging. The /ocpu/test URL gives you a handy testing web page to perform server requests.

See also [https://www.opencpu.org/api.html#api-libraries](https://www.opencpu.org/api.html#api-libraries)

Requests using CURL

```sh
curl -X GET "http://localhost:8004/ocpu/info"
```

#### **GET** - /ocpu/library/fhpredict/info

**Description:** Show information about the package fhpredict package. See also [https://www.opencpu.org/api.html#api-libraries](https://www.opencpu.org/api.html#api-libraries)

Requests using CURL

```sh
curl -X GET "http://localhost:8004/ocpu/library/fhpredict/info"
```