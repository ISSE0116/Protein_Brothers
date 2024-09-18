from flask import Flask, jsonify,request
from flask_cors import CORS
import psycopg2
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
# ]ss

@app.route('/test', methods=['GET'])
def test():
    return jsonify(),200


@app.route('/api/login', methods=['POST'])
def login():
    # リクエストボディからIDとパスワードを取得
    data = request.json
    #print(data)
    user_id = data.get('id')
    password = data.get('password')
    #print(type(user_id))
    #print(type(password))

    user = []
    try:
        connection = connection_SQL.request()
        cursor = connection.cursor()
        # 引数として実行クエリを入力
        query = "SELECT * FROM users WHERE id = %s AND password = %s;"

        #print(query)
        cursor.execute(query, (user_id, password))
        # クエリの実行によって得たデータをリスト形式で取得
        user = cursor.fetchone()
        print(user)

        close_SQL.final(connection, cursor)
        if user:
            #print('case1')
        # タプルを辞書型に変換
            user_dict = dict(zip(('id', 'username', 'account_number', 'icon', 'balance', 'password'), user))
            #print('case1')
            user_dict['result'] = True
            #print('case1')
            return jsonify(user_dict), 200
        else:
            print('case2')
            return jsonify({"result": False, "error": "Invalid credentials"}), 401
    
    except Exception as error:
        print('case3')
        return jsonify({"result": False, "error": str(error)}), 500

##############################################################
# @app.route('/api/recipients', methods=['POST'])
# def recipients(request):

@app.route('/api/recipients', methods=['POST'])
def get_recipients():
    # リクエストボディからIDを取得
    data = request.json
    user_id = data.get('id')

# try:
    connection = connection_SQL.request()
    cursor = connection.cursor()

# IDに該当しないユーザーを取得するクエリ
    query = '''
    SELECT id, username, icon
        FROM users
        WHERE id != %s
    '''
    cursor.execute(query, (user_id,))

# クエリの実行によって得たデータをリスト形式で取得
    recipients = cursor.fetchall()
    # 結果を辞書形式に変換
    result = [{"id": recipient[0], "username": recipient[1], "icon": recipient[2]} for recipient in recipients]
    close_SQL.final(connection, cursor)
    return jsonify(result)



# @app.route('/api/balance', methods=['POST'])
# def balance(request):



# @app.route('/api/balance', methods=['POST'])
# def remittance(request):



#############################################################

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
