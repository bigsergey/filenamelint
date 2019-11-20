# filenamelint (work in progress)

[![Greenkeeper badge](https://badges.greenkeeper.io/bigsergey/filenamelint.svg)](https://greenkeeper.io/)
[![Coverage Status](https://coveralls.io/repos/github/bigsergey/filenamelint/badge.svg)](https://coveralls.io/github/bigsergey/filenamelint)

Linter for file and directory names.

## Exit codes

When linting filenames, filenamelint will exit with one of the following exit codes:

* `0`: Linting was successful and there are no linting errors.
* `1`: Linting was successful and there is at least one linting error.
* `2`: Linting was unsuccessful due to a configuration problem or an internal error.
