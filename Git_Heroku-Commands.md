Git Commands
*must be in a git repository, which has a hidden .git folder, to work*

**git update no longer using the word master, now main**
For example if you see a command like:
<!-- # git push origin master -->
it should now be:
# git push origin main


**Do not work on master as best practices, use branches**

**Cloning**
# git clone https://github.com/Soliseum/background-generator.git

**View Status on Master**
# git status

**Add Untracked Files**
# git add index.html
after adding use git status to check what you are trying to commit

**Commit the files that you add** <!-- -m is for adding a message. Within quotes -->
# git commit -m "place any message here that you want to be seen with the commit request"

**Push the changes after commit**
# git push

**Pull latest updates/changes ALWAYS GET LATEST**
# git pull


**Clone & update git repository**
# git clone https://github.com/Soliseum/background-generator.git
# git status *Use between each part to check current status*
# git add index.html
# git add script.js
# git add style.css
# git commit -m "adding three files to the repository"
# git push

**View current Branch**
# git branch

**Create a branch called little feature**
# git branch littlefeature

**Switch Branches**
# git checkout littlefeature

**No Upstream Branch - error - copy the code they give you**
# git push
# git push --set-upstream origin bigfeature

*Delete branch*
# git branch -d mybranchname


*Merge Conflict Display on Sublime (unsure what vscode looks like)*
<<<<<<<	HEAD
=======
	<h1>Background Generator!</h1>
>>>>>>>	master
**Between <<< & === is Current change (no h1 title in current branch)**
**Between >>> & === is Master incoming change (h1 title 'Background Generator!' exists in master branch)**

*To keep the h1 'Background Generator!' title above*
*remove these 2 & anything between <<< HEAD && ===*
*Leave <h1> part (anything between === && >>> master)*
*remove >>> master*
*Save File after above*
*shows modified still*
# git status
*finishing merge conflict fix*
# git add .
# git commit -m "fixing merge issue"
*Status now shows "On branch whateverBranchNameIs" "nothing to commit, working tree clean"*
# git push
shows fatal: The current branch whateverBranchNameIs has no upstream branch. . . .
*Finish reverting back to original*
# git push origin whateverBranchNameIs


*Make Pull Request to Master (e.g., when finished with your branch features)*
# git push
**Now someone with admin on github must open request and click #Merge pull request#**
***After because there is a New Master so everyone on team should Update***
# git pull

# HEROKU COMMANDS - https://dashboard.heroku.com/apps/neural-magic/deploy/heroku-git
Install the Heroku CLI
Download and install the Heroku CLI.

If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key.

$ heroku login
Create a new Git repository
Initialize a git repository in a new or existing directory

$ cd my-project/
$ git init
$ heroku git:remote -a neural-magic
Deploy your application
Commit your code to the repository and deploy it to Heroku using Git.

$ git add .
$ git commit -am "make it better"
$ git push heroku master
You can now change your main deploy branch from "master" to "main" for both manual and automatic deploys, please follow the instructions here.
Existing Git repository
For existing repositories, simply add the heroku remote

$ heroku git:remote -a neural-magic