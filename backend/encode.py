import psycopg2

def update_image_in_db(user_id, image_path):
    try:
        # データベースに接続
        connection = psycopg2.connect(
            host="localhost",        # データベースホスト
            database="postgres", # データベース名
            user="issei",         # データベースユーザー
            password="isseiakebi"  # データベースパスワード
        )
        cursor = connection.cursor()

        # 画像ファイルをバイナリデータとして読み込む
        with open(image_path, 'rb') as file:
            binary_data = file.read()

        # UPDATEクエリを実行
        query = """
        UPDATE users 
        SET icon = %s
        WHERE id = %s
        """
        cursor.execute(query, (psycopg2.Binary(binary_data), user_id))

        # 変更をコミット
        connection.commit()

        print("Image updated successfully")

    except (Exception, psycopg2.Error) as error:
        print("Failed to update image:", error)

    finally:
        # 接続を閉じる
        if connection:
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")

# 例として、既存のユーザーIDと画像ファイルパスを指定して関数を呼び出す
update_image_in_db(2, "/Users/issei/code/Protein_Brothers/frontend/public/images/human2.png")
update_image_in_db(3, "/Users/issei/code/Protein_Brothers/frontend/public/images/human3.png")
update_image_in_db(4, "/Users/issei/code/Protein_Brothers/frontend/public/images/human4.png")
update_image_in_db(5, "/Users/issei/code/Protein_Brothers/frontend/public/images/human5.png")
update_image_in_db(6, "/Users/issei/code/Protein_Brothers/frontend/public/images/human6.png")
