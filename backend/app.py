from flask import Flask, jsonify

app = Flask(__name__)

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
