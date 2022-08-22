# VirtualTranslator

CSE 155 Project where a user can take a picture or upload an image/file of text in a different language which then is translated into English.

## Run the server in the background

``` bash
# ~ Start guide (make sure to go through each step)~

# make sure to install pip
python -m pip install --upgrade pip

# in CMD open directory 
cd backend

# for windows users: create a python enviroment
py -m venv venv
 
# for mac users:
python3 -m venv venv
 
# Activating python enviroment on windows
.\venv\Scripts\activate

# Activating python environment on mac
source venv/bin/activate

# first setup Cloud Translation and Cloud Vision: 
https://cloud.google.com/translate/docs/setup
https://cloud.google.com/vision/docs/before-you-begin

# You should have a JSON file downloaded as a key, 
# rename it to key.json and put it into this repository

# install the dependencies
python -m pip install -r requirements.txt or pip3 install -r requirements.txt

# now you can run the server.py  (the google/flask dependencies are installed)
python server.py

# to leave the python virtual environment/deactivate it
deactivate

```

## Run project in development

- Setting up the development environment: https://reactnative.dev/docs/environment-setup.

- Install dependencies: `yarn install` (or `npm install`).

- Run on Android: `yarn android` (or `npm run android`).

- Run on iOS: `yarn ios` (or `npm run ios`).

- Run on both Android & iOS: `yarn mobile` (or `npm run mobile`).

- Use npm start

## NOTE

- replace host with your current IP address in line 25 of `./backend/server.py` and line 8 of `./Screens/ProcessingScreen.js`
- This is because iPhones have some issue with localhost or any foreign IP address from the server
