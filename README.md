# Getting Started

after you have cloned the repo
run `npm install`

after you have setup the Access Token (see below section) run `npm start`

# Access token

generate your own Access token for the Github API:
navigate to the [Token Setup page](https://github.com/settings/tokens)
and create a new token
replace the `Authorization` header value with the token you created
this is located at the top of the `./utils/api.ts` file in `setHeaders()`
