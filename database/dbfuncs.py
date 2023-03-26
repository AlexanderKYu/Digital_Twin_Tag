import psycopg2
import boto3
import config as db

def db_connection():
    conn = ""
    cursor = ""
    try:
        conn = psycopg2.connect(
            database=db.DATABASE,
            user=db.USER,
            password=db.PASSWORD,
            host=db.HOST,
            port=db.PORT,
        )
        cursor = conn.cursor()
        conn.autocommit = True
    except:
        print("Unable to connect to database.")
    return conn, cursor

def db_init():
    conn, cursor = db_connection()
    
    db_query = """CREATE TABLE IF NOT EXISTS position_table_prod (
    tag_id VARCHAR(10),
    WIPbase INT,
    WIPvar INT,
    x_coord FLOAT,
    y_coord FLOAT,
    z_coord FLOAT,
    unixtime INT
    )"""

    cursor.execute(db_query)


    db_query = """CREATE TABLE IF NOT EXISTS position_table_arena (
    tag_id VARCHAR(10),
    x_coord FLOAT,
    y_coord FLOAT,
    z_coord FLOAT,
    unixtime INT
    )"""

    cursor.execute(db_query)


    db_query = """CREATE TABLE IF NOT EXISTS user_roles (
    role VARCHAR(10),
    email VARCHAR(30),
    first_name VARCHAR(15),
    last_name VARCHAR(15)
    )"""

    cursor.execute(db_query)
    conn.close()

def delete_all():
    conn, cursor = db_connection()

    db_query = "DROP TABLE position_table_prod"

    cursor.execute(db_query)

    db_query = "DROP TABLE position_table_arena"

    cursor.execute(db_query)
    
    db_query = "DROP TABLE user_roles"

    cursor.execute(db_query)

    conn.close()

#def getActiveTimes():
#    conn, cursor = db_connection()
#    db_query = """SELECT loctime FROM tag_threshold
#                  WHERE overallx > 9.8 OR overally > 9.8 OR overallz > 9.8;"""
#    cursor.execute(db_query)
#
#    data = cursor.fetchall()
#    print(data)
#    conn.close()

#def dbPush(overall_diff, currTime, batch):
#    conn, cursor = db_connection()
#
#    for key, values in overall_diff.items():
#        db_query = f"INSERT INTO tag_threshold VALUES ('{key}', {values[0]}, {values[1]}, {values[2]}, '{str(currTime)}', {batch});"
#        cursor.execute(db_query)
#    
#    conn.close()

def dbPushPositionTableProd(tag_id, WIPbase, WIPvar, x_coord, y_coord, z_coord, unixtime):
    conn, cursor = db_connection()
    db_query = f"INSERT INTO position_table_prod ('{tag_id}', {WIPbase}, {WIPvar}, {x_coord}, {y_coord}, {z_coord}, {unixtime});"
    cursor.execute(db_query)
    conn.close()

