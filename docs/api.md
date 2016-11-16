# API Documentation

This API is useful for developers who:

  * need a central repository of data on the charges of mobile
    money transactions, and/or
  * do not wish to re-implement cost calculation and their applications
    can rely on network connectivity for this functionality


## Introduction:

The **Base URLs** for the API are `http://mmtc.forfuture.co.ke/api`
(Insecure but more permanent)
and `https://mmtcke-forfutureco.rhcloud.com/api`
(Secure but less permanent).

API Characteristics:

  * <u>**Beta**: we are working on this API. Please watch the
    [Github repository][repo] for updates. Some of these updates may break
    the API, until we declare the API **stable**</u>
  * **JSON**: data back-and-forth is formatted in JSON
  * **Status codes**: responses are sent back with sensible status codes
  * **Unauthenticated**: no authentication token is required, currently

### Errors:

When the response's status code is **not** 2xx, expect the response
in the following structure:

```json
{
  "error": {
    "message": "error message",
    "name": "ErrorName",
    "statusCode": 400
  }
}
```


### Endpoints:

* [GET /networks](#get-networks)
* [GET /networks/:network](#get-networks-network)
* [POST /cost](#post-cost)


---
<a href="#get-networks" name="get-networks"># <i class="fa fa-file-text"></i></a>

```http
GET /networks
```

Retrieve data for all networks. This is basically an amalgamation of the
[data files][data-files].

Example partial response:

```http
200 OK
```

```json
{
  "networks": [ /* CONTENT of each of the data files */ ]
}
```


---
<a href="#get-networks-network" name="get-networks-network"># <i class="fa fa-file-text"></i></a>

```http
GET /networks/:network
```

Retrieve data for `network`. This basically returns the content of
the data file for `network`.

Example partial response:

```http
200 OK
```

```json
{
  "network": { /* CONTENT of the data file */ }
}
```


---
<a href="#post-cost" name="post-cost"># <i class="fa fa-file-text"></i></a>

```http
POST /cost
```

Perform a calculation.

**Parameters:**

* **network**: (Required) target network e.g. "mpesa"
* **amount**: (Required) amount in transaction e.g. 2000
* **transactionType**: (Required) type of transaction e.g. "transfer"
* **transactor**: (Required) target transactor e.g. "agent"

Example response:

```http
200 OK
```

```json
{
  "cost": 66
}
```


[data-files]:https://github.com/forfuturellc/mmtc-ke/tree/master/data
[repo]:https://github.com/forfuturellc/mmtc-ke
