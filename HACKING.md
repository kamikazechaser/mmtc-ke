# Hacking the Application

Before proceeding any further, read the following documents:

1. [contributing source code][contrib]
1. [code of conduct][coc]
1. [software license][license]

[contrib]:https://github.com/forfuturellc/workflow/blob/master/CONTRIBUTING.md
[coc]:https://github.com/forfuturellc/workflow/blob/master/CODE_OF_CONDUCT.md
[license]:https://github.com/forfuturellc/mmtc-ke/blob/master/LICENSE.txt


## introduction:

While Node.js applications are mostly platform-agnostic, we assume you're
developing using a Unix system. Should some development script, tool, etc.
**not** run in your windows (etc.) machine and you know how to make it
compatible, consider sending a pull request.

**Table of Contents**

* [application architecture](#arch)
* [starting the application](#start)
* [data entry](#data-entry)
* [deployment](#deploy)
* [news](#news)


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
[nunjucks]:https://mozilla.github.io/nunjucks


<a name="start"></a>
### starting the application:

The application can be started in either **development** or **production** mode.

```bash
$ npm start            # start in production mode
$ npm run start-dev    # start in development mode
```


<a name="data-entry"></a>
### data entry:

Data entry is a one-off task, that is crucial to this application, so as to
ensure the data used does **not** end up being stale and inaccurate. This
is one of the most simple yet cumbersome development task. **No**
extensive programming knowledge is required.

To get started:

* read the existing data files in [`data/`][data]
* understand thee [Data File Specification][spec] being used

[data]:https://github.com/forfuturellc/mmtc-ke/blob/master/data/
[spec]:https://github.com/forfuturellc/mmtc-ke/blob/master/data/SPEC.md


<a name="deploy"></a>
### deployment:

The application is currently being deployed on [OpenShift][openshift]
**FOR FREE**. We highly recommend you get familiar with the platform.
It is quite worthwhile.

While we have set the CI to automatically deploy the application,
particularly on pushing to **master** branch, we assign a developer
in charge of any deployment issues that may arise.

* developer-in-charge: [GochoMugo](https://github.com/GochoMugo)

Feel free to contact the developer, should you want to submit sensitive
information concerning the hosting server, etc. Also, CC the information
to we@forfuture.co.ke, with a suitable subject line.

[openshift]:http://openshift.redhat.com/


<a name="news"></a>
### news:

You can find major news concerning the application at
http://mmtc.forfuture.co.ke/news/.

Since we are avoiding restarting the application, just to reflect any
recently-added news, the developer in-charge of deployment handles this
process:

* a new branch, from the **develop** branch is created with a name
  in a format, similar to `news/2016-04-23`.
* new news are added to the beginning of `web/_raw/news.md`
* while the new branch is reviewed and merged back, the updated news.md
  should be uploaded to the server, using SSH or similar tool.

News are now updated!


**HAPPY HACKING!**
