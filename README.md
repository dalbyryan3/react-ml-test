# React ML Test App
This is a test application which provides a React frontend for communicating with a Flask REST API backend that wraps various machine learning models.

## Usage
Currently works for running the frontend and backend locally.

First start the backend by going to the backend folder, creating a Python virtual environment (or using Anaconda), and calling 
```bash
python3 -m pip install -r requirements.txt
```
then starting the backend using  
```bash
python3 main.py 
```

Next start the frontend by going to the frontend folder, and calling 
```bash
npm install
npm start
```

## Notes
### Frontend
Currently the React frontend uses the backend REST API to upload images and call prediction.
### Backend
Currently only allows one user (no user IDs) and stores information (like uploaded image) in memory rather than a database.
