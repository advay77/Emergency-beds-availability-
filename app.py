from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
import os
from dotenv import load_dotenv
import requests

load_dotenv()

app = Flask(__name__)


client = MongoClient(os.getenv('mongodb://localhost:27017/'))
db = client['hospital_db']
user_data_collection = db['user_data']
hotspots_collection = db['hotspots']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/book-bed', methods=['POST'])
def book_bed():
    data = request.json
    
    bookings_collection = db['bookings']
    bookings_collection.insert_one(data)
    return jsonify({'message': 'Booking request submitted successfully'}), 201


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))  # Default to port 5000
    app.run(host="0.0.0.0", port=port)
