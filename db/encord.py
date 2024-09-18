import psycopg2
import base64

# データベースに接続
connection = psycopg2.connect(
    host="localhost",
    database="postgres",
    user="issei",
    password="isseiakebi"  # 適切なパスワードに変更してください
)
cursor = connection.cursor()

# 画像ファイルを読み込み、Base64にエンコード
with open("./human1.png", "rb") as image_file:
    base64_image = base64.b64encode(image_file.read()).decode('utf-8')

# アイコンをデータベースの特定のユーザーに更新
user_id = 1  # 画像を挿入するユーザーのID
update_query = """
    UPDATE users
    SET icon = %s
    WHERE id = %s;
"""
cursor.execute(update_query, (base64_image, user_id))

# 変更をコミットして、データベースを更新
connection.commit()

# 接続をクローズ
cursor.close()
connection.close()
