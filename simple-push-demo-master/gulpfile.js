/**
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

var gulp = require('gulp');
var fs = require('fs');
var runSequence = require('run-sequence');

var projectPackage = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
GLOBAL.config = {
  env: 'prod',
  src: 'app',
  dest: 'dist',
  version: projectPackage.version,
  license: 'Apache',
  licenseOptions: {
    organization: 'Google Inc. All rights reserved.'
  }
};

// Get tasks from gulp-tasks directory
require('require-dir')('gulp-tasks');

var allTasks = ['styles', 'scripts', 'copy', 'html', 'images'];

gulp.task('default', function(cb) {
  runSequence(
    'clean',
    allTasks,
    cb);
});

gulp.task('dev', function() {
  GLOBAL.config.env = 'dev';
  return runSequence('clean', allTasks, 'watch', 'nodemon', 'browsersync');
});
