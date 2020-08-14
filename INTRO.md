# StarGAN-v2 Front-end #
<p align="left">
    <a target="_blank" rel="noopener noreferrer" href="https://corona-board.soaple.endpoint.ainize.ai/">
        <img width="100%" height="auto" src="https://master-stargan-v2-frontend-gkswjdzz.endpoint.ainize.ai/images/og_img.png">
    </a>
</p>

Front-end for [psi1104/stargan-v2](https://github.com/psi1104/stargan-v2)

## Website
[![Run on Ainize](https://ainize.ai/static/images/run_on_ainize_button.svg)](https://stargan-gkswjdzz.endpoint.ainize.ai/)

## Build
### Prerequisite
```bsh
$ npm install
```

### Run on terminal
```bsh
$ node server.js
```

## Dockerize
### build dockerfile
```bsh
docker build -t <image_name> .
```

### run docker image
```bsh
docker run -p 8008:8008 -it <image_name>
```
