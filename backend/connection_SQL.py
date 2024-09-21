def request():
    import psycopg2
    # try:
    connection = psycopg2.connect(
        host = "localhost",
        database = "bank",
        user = "issei",
        password = "isseiakebi"
    )

    return connection

        # cursor.execute(querry)

        # records = cursor.fetchall()

        # for  row in records:
        #     print(row)
    
    # except Exception as error:
    #     print("Error Occured : ", error)
    
    # finally:
    #     if connection:
    #         cursor.close()
    #         connection.close()
    #         print("Close SQL")
