import psycopg2
import base64

# PostgreSQLに接続
connection = psycopg2.connect(
    host="localhost",
    database="postgres",
    user="issei",
    password="isseiakebi"
)
cursor = connection.cursor()

# 画像ファイルをBase64に変換
with open("./human1.png", "rb") as image_file:
    base64_image = base64.b64encode(image_file.read())

# 画像データをデータベースに挿入（id=1のユーザーのiconを更新）
cursor.execute("UPDATE users SET icon = %s WHERE id = %s", (base64_image, 1))

# 変更をコミットしてクローズ
connection.commit()
cursor.close()
connection.close()
