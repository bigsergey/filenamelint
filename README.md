# filenamelint (work in progress)

[![Known Vulnerabilities](https://snyk.io/test/github/bigsergey/filenamelint/badge.svg?targetFile=package.json)](https://snyk.io/test/github/bigsergey/filenamelint?targetFile=package.json)
[![Coverage Status](https://coveralls.io/repos/github/bigsergey/filenamelint/badge.svg)](https://coveralls.io/github/bigsergey/filenamelint)
![Node CI](https://github.com/bigsergey/filenamelint/workflows/Node%20CI/badge.svg)

Linter for file and directory names.

## Exit codes

When linting filenames, filenamelint will exit with one of the following exit codes:

* `0`: Linting was successful and there are no linting errors.
* `1`: Linting was successful and there is at least one linting error.
* `2`: Linting was unsuccessful due to a configuration problem or an internal error.
