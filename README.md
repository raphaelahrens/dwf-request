# cve-form
Repo for requesting a CVE ID


You must set these environment variables

GH_TOKEN
The token for authenticating the bot. The username is currently hard coded

GH_CLIENT_ID
The client ID for your project that will auth against github

SESSION_KEY
The password for encrypting the session


# Workflow
The workflow is currently planned to look like this

webform -> issue

We then have a worker look at open issues that need to be assigned CVE IDs
If the issue was filed by a trusted user, assign an ID and close the issue
If the user is untrusted assign a candidate ID then mark the issue as needing review

Issues that received a review can have the ID updated


How to actuall do this

Query github for "new" issues
If ther are new issues
Checkout the repo
Is the user on the trusted list?
yes - Add the CVE details
no - Add candidate details
commit the changes
push the branch

Query github for "approved" issues
Is the approver on the trusted list?
yes - continue
no - bail
Checkout the repo
flip the candidate to a CVE
commit the changes
push the branch
