# Entries
      Creating/Updating/Deleting Entries 
      Using app Postman
      Programming Language : Nodejs


 # Description
      Type node hw1.js on console to execute program
      
      Type localhost:3001/hello(or morning or sunny)?name=<name>&username=<username>&pswd=<password>&GroupUser=<Group>
      ( e.g.localhost:3001/morning?name=Mhtsos&username=Jim&pswd=123456&GroupUser=Tough_guys)
      
      After url(localhost:3001/), type path to return specific message on report and the query field
 # Files

      Groupuser folder is group which contains user's folders
      Every User folder contains two files: 
      User.json : Contains information about the User
      Auth.json : File used for Authentication

# Request methods
      With POST method create a new user inside a new or existing GroupUser
      With GET  get info in console for existing User
      With PUT  update changes on specific user information
      With DELETE delete a specific user
      
# TEST INPUTS
      http://localhost:3001/hello?name=ilias&username=liakos&pswd=kl$*O!Bn&GroupUser=Web_dev
      
      http://localhost:3001/hello?name=panos&username=pagoulid&pswd=123$opqW&GroupUser=Web_dev
      
      http://localhost:3001/hello?name=markos&username=mark1991&pswd=1782&GroupUser=Engineer
      
      http://localhost:3001/hello?name=eleni&username=helen59&pswd=gOk15&GroupUser=Engineer
      
# Other

      implented nodemon : 
      npm i --save-dev nodemon
      ON package-> scripts=> devstart: nodemon hw.js
      Run with hw1.js



