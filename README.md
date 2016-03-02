simpleUniqueSort
===========

Sorts a list, filtering duplicates.  The most relevant files are located in ./lib.

### `GET /generate[?listSize={1-1000000}&dupeRate={0.0-1.0}]`

#### Params

##### listSize
Type: `Int`
Default: `100000`
Range: `1` to `1000000`

Sets the target size of generated email list, duplicates included.

##### dupeRate
Type: `Float`
Default: `1.0`
Range: `0.0` to `1.0` (inclusive)

Sets rate at which duplicates are added to list.  For example: a `dupeRate`
of `1.0` with a `listSize` of `10` will create a a list with 5 unique emails and
5 duplicates, whereas `{ listSize: 10, dupeRate: 0.5 }` would create
*approximately* 7 unique emails and 3 duplicates.

##### Description

Generates a new list of emails & returns that list.

Available at http://66.175.219.122:8087/generate or http://sort.zjr.io/generate depending on DNS propagation speeds.

### `GET /unique[?orig={false}&includeList={false}]`

#### Params

##### orig
Type: `Boolean`
Default: `false`

Set this option (I'm not parsing bools from the string) to use the original
method made for use with the sort.

##### includeList
Type: `Boolean`
Default: `false`

Set this option (I'm still not parsing bools from the string) to use receive the
filtered list with the return.

#### Description

Filters for unique enteries in a previously generated list—using the
method created for use in `GET /sortAndFilter` or a new, slightly more
performant method—while optionally returning the filtered list.

Available at http://66.175.219.122:8087/unique or http://sort.zjr.io/unique

### `GET /sortAndFilter`

#### Description

Removes duplicate emails from generated list, sorts alphabetically and
returns both the orginal list, the filtered & sorted list, and sort + filter
runtime in seconds w/ nanosecond accuracy.

Available at http://66.175.219.122:8087/sortAndFilter or http://sort.zjr.io/sortAndFilter
