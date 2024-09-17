from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# サンプルデータ
users = [
    {
        "id": 1,
        "username": "user1",
        "account_number": "1234567890",
        #"icon_url": "https://example.com/icons/user1.png"
    }
]

@app.route('/api/users', methods=['GET'])
def get_users():
    return jsonify(users)

if __name__ == '__main__':
    app.run(debug=True)
