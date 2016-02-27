simpleUniqueSort
===========

Sorts a list, filtering duplicates.  The most relevant files are located in ./lib.

### GET /generate

Generates a new list of 100K emails & returns that list.

Available at http://66.175.219.122:8087/generate or http://sort.zjr.io/generate depending on DNS propagation speeds.

### GET /sortAndFilter

Removes duplicate emails from generated list, sorts alphabetically and
returns both the orginal list, the filtered & sorted list, and sort + filter
runtime in seconds w/ nanosecond accuracy.

Available at http://66.175.219.122:8087/sortAndFilter or http://sort.zjr.io/sortAndFilter
