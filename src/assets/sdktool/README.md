Maps SDK for Web 4.47.6 Examples
==============

Documentation
--------------

Please refer to *https://developer.tomtom.com* for detailed documentation with examples.
Also latest version of the SDK can be found there.

Getting started
--------------
To run examples on you local machine you need to install [node.js](https://nodejs.org).
Use latest LTS version available in download section.

Before being able to check out examples you need to provide proper API keys for services like search, maps, etc.
Together with examples, we have provided node.js script, which will help you to replace them automatically.
1. Open config.json
2. There are placeholders for every type of key, replace them accordingly.
3. We assume that base path is '/sdk', if you have changed location, replace basePath too.
4. Open terminal or command line tool in same folder
5. `npm install`, this will install all npm modules necessary to run examples in offline mode
6. `npm run replaceKeys`, this command will run provided script and replace placeholders with your keys
7. `npm start`, this will start http server, which will serve files
8. The server should start at http://localhost:8080 (if the port was already in use, check console - http server prints
what port it is running on), you can open it in the browser



License
--------------

© 1992 – 2019 TomTom
The library is licensed under Apache License Version 2.0, check LICENSE.txt for details.
