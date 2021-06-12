# Entries
Creating/Updating/Deleting Entries 
Using app Postman
Programming Language : Nodejs

Type localhost:3001/hello(or <morning> or <sunny>)?name=<name>&username=<username>&pswd=<password>&GroupUser=<Group>
( e.g.localhost:3001/morning?name=Boyka&username=SCoTT&pswd=Adkins&GroupUser=Tough_guys
After url(localhost:3001/), type path to return specific message on report and the query field

Groupuser folder is group which contains user's folders
Every User folder contains two files: 
  User.json : Contains information about the User
  Auth.json : File used for Authentication

With POST method create a new user inside a new or existing GroupUser
With GET  get info in console for existing User
With PUT  update changes on specific user information
With DELETE delete a specific user
