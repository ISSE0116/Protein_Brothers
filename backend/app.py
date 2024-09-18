from flask import Flask, jsonify
from flask_cors import CORS
import psysopg2
import connection_SQL
import close_SQL

app = Flask(__name__)
CORS(app)

# サンプルデータ
# users = [
#     {
#         "id": 1,
#         "username": "user1",
#         "account_number": "1234567890",

#         #"icon_url": "https://example.com/icons/user1.png"
#     }
# ]

@app.route('/api/user', methods=['GET'])
def get_user():
    records = []
    user_id = request.args.get('user_id')
    try:
        connection = connection_SQL.request()
        cursor = connection.cursor()
        # 引数として実行クエリを入力
        querry = 'SELECT id, username, account_number FROM users WHERE id = %s'
        cursor.execute(querry, (user_id,))
        # クエリの実行によって得たデータをリスト形式で取得
        records = cursor.fetchall()
    
    except Exception as error:
        print("Error Occured : ", error)

    users = []
    for row in records:
        users.append({
            "id": row[0],
            "username": row[1],
            "account_number": row[2]
    })

    close_SQL.final(connection, cursor)
    return jsonify(users)

# @app.route('/api/user', methods=['GET'])
# def get_user():
#     records = []
#     user_id = request.args.get('user_id')
#     try:
#         connection = connection_SQL.request()
#         cursor = connection.cursor()
#         # 引数として実行クエリを入力
#         querry = 'SELECT id, username, account_number FROM users WHERE id = %s'
#         cursor.execute(querry, (user_id,))
#         # クエリの実行によって得たデータをリスト形式で取得
#         records = cursor.fetchall()
    
#     except Exception as error:
#         print("Error Occured : ", error)

#     users = []
#     for row in records:
#         users.append({
#             "id": row[0],
#             "username": row[1],
#             "account_number": row[2]
#     })

#     close_SQL.final(connection, cursor)
#     return jsonify(users)


# @app.route('/api/users/<int:user_id>', methods=['GET'])
# def get_users(user_id):
#     records = []
#     try:
#         connection = connection_SQL.request()
#         cursor = connection.cursor()
#         # 引数として実行クエリを入力
#         querry = 'SELECT id, username, account_number FROM users WHERE id != %s'
#         cursor.execute(querry, (user_id,))
#         # クエリの実行によって得たデータをリスト形式で取得
#         records = cursor.fetchall()
    
#     except Exception as error:
#         print("Error Occured : ", error)

#     users = []
#     for row in records:
#         users.append({
#             "id": row[0],
#             "username": row[1],
#             "account_number": row[2]
#     })

#     close_SQL.final(connection, cursor)
#     return jsonify(users)


# @app.route()


if __name__ == '__main__':
    app.run(debug=True)
