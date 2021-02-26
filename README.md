# dwf-form
Repo for requesting a DWF ID

There are two parts to the request process. The webform accepts user input then
files an issue in GitHub. The form is written in Node.js. It does not support
TLS. You must configure a TLS enabled proxy to use this, secrets are passed
from the client.

There is also a bot that looks at issues in github and commits files to the DWF
ID repo. The bot is written in python because async programming is hard.


You must set these environment variables

GH_TOKEN
The token for authenticating the bot. The username is currently hard coded

GH_CLIENT_ID
The client ID for your project that will auth against github

SESSION_KEY
The password for encrypting the session

GH_USERNAME
The username you will be connecting to github as

GH_REPO
The repo to act on. The DWF production repo is
"distributedweaknessfiling/dwflist"

GIT_ASKPASS
Only set this for your dev system, the containers will take care of this
for prod. You have to use the absolute path, for example on my system

export GIT_ASKPASS=/home/bress/src/dwf-request/dwf-bot/helpers/git-askpass.py


# Workflow
The workflow is currently planned to look like this

webform -> issue

We then have a worker look at open issues that need to be assigned DWF IDs
If the issue was filed by a trusted user, assign an ID and close the issue
If the user is untrusted assign a candidate ID then mark the issue as needing review

Issues that received a review can have the ID updated


How to actuall do this

Query github for "new" issues
If ther are new issues
Checkout the repo
Is the user on the trusted list?
yes - Add the DWF ID details
no - Add candidate details
commit the changes
push the branch

Query github for "approved" issues
Is the approver on the trusted list?
yes - continue
no - bail
Checkout the repo
flip the candidate to a DWF ID
commit the changes
push the branch
