# Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased][Unreleased]

Changed:

* `/api/networks/:network` returns content of data file under `network` key


## [0.6.0][0.6.0] - 2016-11-14

Added:

* Add support for **fractional parts** in the `amount`.

Changed:

* Drop official support for Node v4.x series


## [0.5.0][0.5.0] - 2016-11-11

Added:

* Support transaction classes whose amount can **not** be determined using
  our data. Throws error `AmountNotFoundError`. An optional error message
  can be provided in the data.

Changed:

* Mpesa data files updated
* Add throwable errors from `engine.math.calculate()`: `AmountNotFoundError`, `AmountNotAllowedError`


## [0.4.0][0.4.0] - 2016-09-01

Added:

* Expose API

Changed:

* [maintenance] Update all dependencies


## [0.3.0][0.3.0] - 2016-06-16

Added:

* Add Support for [Airtel Money][airtel-money]
* Rename 'Safaricom' to 'Mpesa'
* Tracking page views with [Google Analytics][analytics]
* Updated schema and views to accommodate for URL to networks' homepages

Changed:

* Minor UI polishes

[airtel-money]:http://africa.airtel.com/wps/wcm/connect/AfricaRevamp/Kenya/Airtel_Money/Home/Personal/AirtelMoney_tariffs
[analytics]:https://analytics.google.com


## [0.2.0][0.2.0] - 2016-04-24

Added:

* Add terms and conditions
* Add pages for *news*
* Add more documentation on hacking on the code


## [0.1.0][0.1.0] - 2016-03-25

Added:

* Update Data File Format Specification to accommodate for USSD codes (issue #1)
* Display USSD codes in network pages
* Update data for networks: safaricom
* Display table for ranges (issue #3)


## [0.0.0][0.0.0] - 2016-03-11

This is the very first version.


[0.0.0]:https://github.com/forfuturellc/mmtc-ke/releases/tag/v0.0.0
[0.1.0]:https://github.com/forfuturellc/mmtc-ke/releases/tag/v0.1.0
[0.2.0]:https://github.com/forfuturellc/mmtc-ke/releases/tag/v0.2.0
[0.3.0]:https://github.com/forfuturellc/mmtc-ke/releases/tag/v0.3.0
[0.4.0]:https://github.com/forfuturellc/mmtc-ke/releases/tag/v0.4.0
[0.5.0]:https://github.com/forfuturellc/mmtc-ke/releases/tag/v0.5.0
[0.6.0]:https://github.com/forfuturellc/mmtc-ke/releases/tag/v0.6.0
[Unreleased]: https://github.com/forfuturellc/mmtc-ke/compare/v0.6.0...HEAD
