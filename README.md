# Weather-App

---

### project setup:

- django used as python framework
- django / python packeges installed : requests and pillow you an use "python -m pip install Pillow" and "python -m pip install requests"
- node.js and npm used as packege managers install node.js LTS from "https://nodejs.org/en/download/"
- once node.js installed check npm version in IDE terminal of choice with "npm -v"
- with npm working cd into the frontend folder and run "npm install"
- followed by "npm install axios"

- once we have all that installed in a new terminal cd into the same folder that manage.py lives "weather_app_cs203_a2"
- now we need to run "python ./manage.py makemigrations" followed by "python ./manage.py migrate"
- now we can run our surver "python ./manage.py runserver"

- with that doen move back into the other terminal thats inside of the frontend folder
- then we can finsish this of by running "npm run dev"
- input "http://127.0.0.1:8000/" into your browser.

---
