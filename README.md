# vietnambis.com

Vietnambis.com is a corporate information site in Vietnam。

Demo Vietnamese：[https://vietnambis.com](https://vietnambis.com)
Demo English：[https://vietnambis.com/en](https://vietnambis.com/en)

## Note

Recently, Nuxt officially upgraded the version to 2.14.7



Add nuxt to Vue project

```
npm install --save nuxt@2.14.7
```

## Technology stack

Vue.js
Nuxt.js
ElasticSearch
redis
Firebase
Es6
Webpack
Mysql
Node.js
Express.js

## How to run

```
#Installation dependencies
npm install

#Development environment
npm run dev

#Production Environment
npm run build
npm start

#pm2
npm run build
pm2 start npm --name 'vietnambis.com' -- start

#Operating address
http://localhost:3000
```



## Database file

database：database.sql

tables:vietnambis.sql

## Directory Structure
```
/vietnambis.com/
├── assets                              Asset directory assets is used to organize uncompiled static resources such as LESS, SASS or JavaScript
├── backpack.config.js                  Background entry configuration file
├── build                               Packaged files
├── components                          Store components, Vue.js components used to organize applications
│   ├── admin                           Backend related components: Using Element UI Template
│   ├── ....
├── database                            Directory for storing database files (add it yourself)
├── layouts                             Layout template file, default, change by setting layout for the page
│   ├── ....
├── middleware                          Middleware for storing applications
├── node_modules                        Node Dependent files
├── nuxt.config.js                      Nuxt config file
├── pages                               Directory for storing pages
│   ├── index.vue                       Home
│   ├── ....
├── plugins                             Store plug-ins, used to organize those Javascript plug-ins that need to be run before the root vue.js application is instantiated
│   └── axios.js
├── README.md                           README
├── server                              express Backend directory
│   ├── index.js                        Backstage entry file
│   ├── ....
├── static                              Static file directory. Such files will not be called by Nuxt.js to build and compile. When the server starts, the files in this directory will be mapped to the application root path /
└── util                                Store some tool files (add it yourself)
```

## References

[Vue.js](https://vuejs.org/)

[Vue Router](https://router.vuejs.org)

[Nuxt.js](https://nuxtjs.org/)

[express](http://www.expressjs.com/)

[MySQL](https://www.mysql.com/)
