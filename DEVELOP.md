# DWF reqeust tools

The form lives at https://iwantacve.org
The bot executes seperatly about every ten seconds

# How to develop

You will need some environment variables to make this work

GH_REPO
The repo URL. This is the repo the bot and web form will be working with
For example the prod repo is "distributedweaknessfiling/dwflist"

GH_TOKEN
This is a github token that is used to modify the repo
(add instructions for generating this)

GH_CLIENT_ID
GH_OAUTH_SECRET
The two above get you from github after creating an OAuth application
(add instructions for doing that here)


SESSION_KEY
This can be literally anything. It's the key used to encrypt the session
cookie.
