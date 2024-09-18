
def finally(connection, cursor):
    if connection:
        cursor.close()
        connection.close()
        print("Close SQL")