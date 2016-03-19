# Data File Format Specification

|Aspect|Detail|
|------|------|
|Version|0.2|
|Written by|GochoMugo <mugo@forfuture.co.ke>|

The data used in the application in its computations is fed through data files
placed in this directory. This allows the application logic code remain
independent of the different networks available.

## spec:

The data files are written in [JSON][json] format.


<a name="type-network"></a>
### Network

A single data file can **only** hold one [Network](#type-network) object.

|Key|Type|Description|
|---|----|-----------|
|name|[Name](#type-name)|The name of the Network|
|transactions|\[[Transaction](#type-transaction)]|The transactions supported by the network|
|ussd_codes|\[[USSDCode](#type-ussdcode)]|The available shortcodes|


<a name="type-transaction"></a>
### Transaction

|Key|Type|Description|
|---|----|-----------|
|name|[Name](#type-name)|Type of the transaction|
|classes|\[[Class](#type-class)]|The different classes of the transaction|
|amount_input|boolean|`false` if an amount, as input to the transaction, is **not** applicable. *Defaults to `true`.*|


<a name="type-class"></a>
### Class

|Key|Type|Description|
|---|----|-----------|
|name|[Name](#type-name)|Name of the class of the transaction|
|ranges|\[[Range](#type-range)]|The ranges in the transaction class|
|amount|[Cost](#type-cost)|Amount charged to the user. *This should be provided __only__ if parent `Transaction` has `amount_input` set to `false`.*|


<a name="type-range"></a>
### Range

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


<a name="type-ussdcode"></a>
### USSDCode

This is a [USSD][ussd] code, supported by the network.

|Key|Type|Description|
|---|----|-----------|
|code|string|The actual USSD code. For example, `*144#`|
|description|string|Describes the use of the code|


<a name="type-name"></a>
### Name

This is a string, **uniquely** identifying the named object.


[json]:http://json.org
[ussd]:https://en.wikipedia.org/wiki/Unstructured_Supplementary_Service_Data
