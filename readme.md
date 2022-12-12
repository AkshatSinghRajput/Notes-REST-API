Documentation:
http://localhost:4000/api-docs/
-------------------------------------------------------------------------------------------
Env File Structure:
PORT = 4000
SECRET_KEY = "Your Secret Key Here"
MONGO_URI = "Your MongoDB URI Here"
-------------------------------------------------------------------------------------------
Docker-compose:

Set Variables on Line 20 and 21
SECRET_KEY = "Your Secret Key Here"
MONGO_URI = "Your MongoDB URI Here"
-------------------------------------------------------------------------------------------

NPM Command: 
node index.js

Docker Commands:
Docker compose up --scale api=Number of instances
