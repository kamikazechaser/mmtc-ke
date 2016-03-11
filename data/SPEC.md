# Data File Format Specification

|Aspect|Detail|
|------|------|
|Version|0.0|
|Written by|GochoMugo <mugo@forfuture.co.ke>|

The data used in the application in its computations is fed through data files
placed in this directory. This allows the application logic code remain
independent of the different networks available.

## spec:

The data files are written in JSON format.

A single file can only hold one [Network](#type-network) object.

<a name="type-network"></a>
### Network

|Key|Type|Description|
|---|----|-----------|
|name|[Name](#type-name)|The name of the Network|
|transactions|[Transaction](#type-transaction)|The transactions supported by the network|

<a name="type-transaction"></a>
### Transaction

|Key|Type|Description|
|---|----|-----------|
|name|[Name](#type-name)|Type of the transaction|
|classes|[Class](#type-class)|The different classes of the transaction|

<a name="type-class"></a>
### Class

|Key|Type|Description|
|---|----|-----------|
|name|[Name](#type-name)|Name of the class of the transaction|
|ranges|\[[Range](#type-range)]|The ranges in the transaction class|
|amount|boolean|`false` if amount is **not** applicable to the class. Otherwise `false`. Default is `true`|


### Range
<a name="type-range"></a>

|Key|Type|Description|
|---|----|-----------|
|low|[Cost](#type-cost)|Lower-bound of the Range|
|high|[Cost](#type-cost)|Upper-bound of the Range|
|amount|[Cost](#type-cost)|Amount charged to user|


### Cost
<a name="type-cost"></a>

This type is based on the native `Number` type in JSON with these few additions:

* `"-Infinity"`: implies `-Infinity`
* `"+Infinity"`: implies `+Infinity`
* **no** fractional part

Therefore, the cost is accurate to **1 KES**.


<a name="type-name"></a>
### Name

This is a string, **uniquely** identifying the named object.
