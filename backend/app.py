from flask import Flask, jsonify,request
from flask_cors import CORS
import psycopg2
import connection_SQL
import close_SQL
import base64;
from datetime import datetime

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
    user_id = data.get('id')
    password = data.get('password')

    user = []
    try:
        connection = connection_SQL.request()
        cursor = connection.cursor()
        # 引数として実行クエリを入力
        query = "SELECT * FROM users WHERE id = %s AND password = %s;"

        cursor.execute(query, (user_id, password))
        # クエリの実行によって得たデータをリスト形式で取得
        user = cursor.fetchone()
        close_SQL.final(connection, cursor)
        encoded_icon = base64.b64decode(user[3])
        if user:
            
            print('case1')
        # タプルを辞書型に変換
            encoded_icon = base64.b64encode(user[3]).decode('utf-8') # user_dictを作成
            user_dict = dict(zip(('id', 'username', 'account_number', 'icon', 'balance', 'password'), [user[0], user[1], user[2], encoded_icon, user[4], user[5]]))
            user_dict['result'] = True
            return jsonify(user_dict), 200
        else:
            return jsonify({"result": False, "error": "Invalid credentials"}), 401
    
    except Exception as error:
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
    result = [{"id": recipient[0], "username": recipient[1], "icon": base64.b64encode(recipient[2]).decode('utf-8')} for recipient in recipients]
    close_SQL.final(connection, cursor)
    return jsonify(result)

@app.route('/api/recipient/<int:id>', methods=['GET'])
def get_recipient(id):
    try:
        connection = connection_SQL.request()
        cursor = connection.cursor()
        
        # 指定したIDに基づいてユーザーを取得する
        query = 'SELECT id, username, icon FROM users WHERE id = %s'
        cursor.execute(query, (id,))
        
        recipient = cursor.fetchone()
        if recipient:
            result = {
                'id': recipient[0],
                'username': recipient[1],
                'icon': base64.b64encode(recipient[2]).decode('utf-8')
            }
            return jsonify(result), 200
        else:
            return jsonify({'error': 'Recipient not found'}), 404

    except Exception as error:
        return jsonify({'error': str(error)}), 500

    finally:
        close_SQL.final(connection, cursor)


@app.route('/api/remittance', methods=['POST'])
def remittance():
    data = request.json
    sender_id = data.get('senderId')
    recipient_id = data.get('recipientId')
    amount = data.get('amount')
    message = data.get('message')  # メッセージを取得

    if not sender_id or not recipient_id or not amount:
        return jsonify({"result": False, "error": "Invalid data"}), 400

    try:
        connection = connection_SQL.request()
        cursor = connection.cursor()

        # 送信元の残高を更新
        update_sender_balance = '''
        UPDATE users SET balance = balance - %s WHERE id = %s;
        '''
        cursor.execute(update_sender_balance, (amount, sender_id))

        # 送信先の残高を更新
        update_receiver_balance = '''
        UPDATE users SET balance = balance + %s WHERE id = %s;
        '''
        cursor.execute(update_receiver_balance, (amount, recipient_id))

        # メッセージをmessageテーブルに挿入
        insert_message = '''
        INSERT INTO message (sender_id, recipient_id, message, amount) 
        VALUES (%s, %s, %s, %s);
        '''
        cursor.execute(insert_message, (sender_id, recipient_id, message, amount))

        # コミットして変更を確定
        connection.commit()
        close_SQL.final(connection, cursor)

        return jsonify({"result": True}), 200

    except Exception as error:
        return jsonify({"result": False, "error": str(error)}), 500

@app.route('/api/post_billing', methods=['POST'])
def post_billing():
    data = request.json
    bill = data.get('bill')
    message = data.get('message')
    id = data.get('id')
    current_time = datetime.now().isoformat()

    if not id:
        return jsonify({"result": False, "error": "Invalid data"}), 400

    try:
        connection = connection_SQL.request()
        cursor = connection.cursor()

        # メッセージをbilling_historyテーブルに挿入し、挿入されたIDを取得
        insert_billing = '''
        INSERT INTO billing_history (amount, created_at, message, recipient_id, billing_link) 
        VALUES (%s, %s, %s, %s, %s) RETURNING id;
        '''
        cursor.execute(insert_billing, (bill, current_time, message, id, ""))
        billing_id = cursor.fetchone()[0]  # 挿入された請求のIDを取得

        # 請求URLを生成
        billing_url = f"http://localhost:3000/billing/{billing_id}"

        # billing_linkフィールドを更新
        update_billing = '''
        UPDATE billing_history SET billing_link = %s WHERE id = %s;
        '''
        cursor.execute(update_billing, (billing_url, billing_id))

        connection.commit()
        close_SQL.final(connection, cursor)

        return jsonify({"result": True, "billing_url": billing_url}), 200

    except Exception as error:
        return jsonify({"result": False, "error": str(error)}), 500

@app.route('/api/billing_history', methods=['POST'])
def get_billing_history():
    data = request.json
    user_id = data.get('id')

    print(f"Received user_id: {user_id}")  # デバッグ情報を表示

    if not user_id:
        return jsonify({"result": False, "error": "Invalid user ID"}), 400

    try:
        connection = connection_SQL.request()
        cursor = connection.cursor()

        query = '''
        SELECT amount, created_at, message, billing_link 
        FROM billing_history 
        WHERE recipient_id = %s;
        '''
        cursor.execute(query, (user_id,))
        billing_history = cursor.fetchall()

        close_SQL.final(connection, cursor)

        result = [
            {
                "amount": record[0],
                "created_at": record[1],
                "message": record[2],
                "billing_link": record[3]
            } 
            for record in billing_history
        ]

        print(f"Billing history fetched: {result}")  # デバッグ情報を表示

        return jsonify({"result": True, "billing_history": result}), 200

    except Exception as error:
        print(f"Error: {str(error)}")  # エラーログを表示
        return jsonify({"result": False, "error": str(error)}), 500

if __name__ == '__main__':
    app.run(debug=True)
