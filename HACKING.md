# Hacking the Application

Before proceeding any further, read the following documents:

1. [CONTRIBUTING.md][contrib]: contributing source code
1. [CODE\_OF\_CONDUCT.md][coc]: code of conduct
1. [LICENSE][license]: software license

[contrib]:https://github.com/forfuturellc/mmtc-ke/blob/master/CONTRIBUTING.md
[coc]:https://github.com/forfuturellc/mmtc-ke/blob/master/CODE_OF_CONDUCT.md
[license]:https://github.com/forfuturellc/mmtc-ke/blob/master/LICENSE


## introduction:

While Node.js applications are mostly platform-agnostic, we assume you're
developing using a Unix system. Should some development script, tool, etc.
**not** run in your windows (etc.) machine and you know how to make it
compatible, consider sending a pull request.

**Table of Contents**

* [application architecture](#arch)
* [starting the application](#start)


<a name="arch"></a>
### application architecture:

The directory structure of the code repository:

```
.
|-- config/     # configurations
|-- data/       # data files, particularly for the different networks
|-- engine/     # business logic (the "heavy-lifting")
|-- routes/     # routing logic
|-- web/        # web interface (whatever you see in the browser)
`-- app.js      # main entry point, with bootstrap code
```

The application is built using, mainly:

* [express][express]: THE web framework
* [node-config][node-config]: handles application configuration
* [nunjucks][nunjucks]: for page templating

[express]:http://expressjs.com/
[node-config]:https://github.com/lorenwest/node-config
[nunjucks]:http://nunjucks.github.io/


<a name="start"></a>
### starting the application:

The application can be started in either **development** or **production** mode.

```bash
$ npm start            # start in production mode
$ npm run start-dev    # start in development mode
```
