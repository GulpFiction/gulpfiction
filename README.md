# Setup

Run `npm install -g gulp` to install tools.

Then run the following command to start the server and the watcher (livereload included):

    $ (cd build/ && python -m SimpleHTTPServer) & gulp watch &

# Pages

If not running locally, we can deploy to:

 - http://development.ss14-team-275.divshot.io/
 - http://staging.ss14-team-275.divshot.io/
 - http://production.ss14-team-275.divshot.io/ also knwon as ss14-team-275.divshot.io

 # Todo

  - For some reason, task dependencies are not saved
  - Again add task watching and task livereload support
  - npm search doesn't work right now
  - Remove text like this "gulp-gulp-concat" from task builder
