# LOGVIS
## Sample
You can try our viewer at http://sel.ist.osaka-u.ac.jp/people/k-simari/ICSME2019/ 

Try our viewer following [README](/sample/README.md).

## Trace Recorder
1. Clone the repo
1. Create new dir and put your project source code in `project`
```
$ mkdir yourProject
$ cd yourProject
$ mkdir project
$ cp yourSrc project/yourSrc
```
### Collect trace 
 *  Options are described at https://github.com/takashi-ishio/selogger/tree/v0.1
   *  In our method using `format=latesttime` option
```
$ java  -jar  -javaagent:/path/to/selogger-0.0.1-SNAPSHOT.jar=output=/path/to/yourProject/selogger,format=latesttime,size=32,keepobj=true yourApp.jar 
```
### Convert json format
1. Run LOGVIS.jar to convert json format
1. You can get `fileinfo.json` and `varinfo.json` at /path/to/yourProject
```
$ java -jar LOGVIS.jar /path/to/yourProject
```


## Viewer 

### Pre-requirements

* Node.js
* npm

### Getting started


1. Run the commands below. You can check our sample.
```
$ cd LOGVIS/frontend
$ npm install
$ npm start
```

### Develop

```
$ npm start
```

> Note: Hot reload is enabled.

### Build and Run

```
$ npm run build
$ npm run server
```

### Open your project

1. Locate `fileinfo.json` and `varinfo.json` at `src/assets/project/<PROJECT_NAME>`
1. Add <PROJECT_NAME> on the main page

![image](https://user-images.githubusercontent.com/7913793/64902108-62c90080-d6dc-11e9-8013-ace20abf0add.png)

### Viewer Usage
You can find down and up arrows at right side of each value.
The down arrow means the start point and the up arrow means the end point.
This interactive view can filter the value based on the execution order of each instruction by setting the start and/or end point.
You can check filter information at `TIMESTAMP FILTER` and delete filters by clicking buttons.
If no values are contained in the variable during the filtered period, the highlighting of the variable is turned off.