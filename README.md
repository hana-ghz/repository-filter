*********** PROJECT DESCRIPTION ******************

This is a one-page github respository filter. The user has two inputs: 
* The first input is the username when he is required to enter a username. If the username corresponds to a github user, its repositories will be fetched and displayed in a list format. If no valid user is found, a 404 UserNotFound  model is displayed. 
* The second input is search bar with real-time effect that filters out the repositories items to  only those who start with the keyword that the user wrote.

Each item of the list has the following attributes:
	Project pame
	Last updated date
	The description provided by the user
	The programming language used

*********** RUNNING THE APP ON THE HOST MACHINE ******************


-Clone the project respository from github "https://github.com/hana-ghz/repository-filter.git"

-Install npm dependencies using "npm install"

-Run the application using "npm start"

-Copy this URL in the browser "http://localhost:3000/" 

*********** FUTURE IMPORVEMENTS ******************

-Add a "select a repository feature" which would opens model with all the details related to the repository

-Add a "connect using github feature" which would allows the user to get his/her repsitories (including private ones) + add a private/public visibility label


*********** Feedback ******************


- The exercice seemed fairly easy at first but the more time I spent on it, the more ideas I had on how to make it better ( I only thought about the userNotFound and repositoriesNotFound pages when I encountred the problem while testing. I then figured out that the user wouldn't get anything to inform him that the request was indeed handled however it returned a ResourceNotFOund)
