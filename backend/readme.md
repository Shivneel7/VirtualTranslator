# Translate app backend readme

# NEED BEFORE
# install python and flask
# Setting up a Python development environment: https://cloud.google.com/python/docs/setup#windows


``` bash
# ~ Start guide (make sure to go through each step)~


# in CMD open directory 
cd backend

# for windows users: create a python enviroment
py -m venv venv
 
# Activating python enviroment on windows
.\venv\Scripts\activate

# first setup Cloud Translation and Cloud Vision: 
https://cloud.google.com/translate/docs/setup
https://cloud.google.com/vision/docs/before-you-begin

# You should have a JSON file downloaded as a key, 
# rename it to key.json and put it into this repository

# install the dependencies
python -m pip install -r requirements.txt

# now you can run the server.py  (the google/flask dependencies are installed)
python server.py

# to leave the python virtual environment/deactivate it
deactivate

```




# DEV STUFF (don't worry about)

# Installing client libraries
pip install google-cloud-translate

# and this
pip.exe install google-cloud-vision

# install flask
pip install flask

# flask dependencies
pip install -U flask-cors