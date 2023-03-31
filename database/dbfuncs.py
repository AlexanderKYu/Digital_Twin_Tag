import psycopg2
from os import environ, path
from dotenv import load_dotenv

basedir = path.abspath(path.dirname(path.dirname(__file__)))
load_dotenv(path.join(basedir, '.env'))

def db_connection():
    conn = ""
    cursor = ""
    try:
        conn = psycopg2.connect(
            database=environ.get('DATABASE'),
            user=environ.get('DBUSER'),
            password=environ.get('PASSWORD'),
            host=environ.get('HOST'),
            port=environ.get('PORT'),
            connect_timeout=3,
        )
        cursor = conn.cursor()
        conn.autocommit = True
    except:
        print("Unable to connect to database.")
    return conn, cursor

def db_init():
    conn, cursor = db_connection()
    
    db_query = """CREATE TABLE IF NOT EXISTS tblOrders (
    WIP INT NOT NULL,
    QTY INT NOT NULL,
    TagID VARCHAR(6),
    InProd BOOLEAN,
    t_start FLOAT,
    t_end FLOAT,
    time_on_floor FLOAT,
    build_time FLOAT,
    LastZone INT,
    ZoneName VARCHAR(50)
    )"""

    cursor.execute(db_query)


    db_query = """CREATE TABLE IF NOT EXISTS tblPaths (
    WIP INT NOT NULL,
    QTY INT NOT NULL,
    TagID VARCHAR(6),
    ZoneID INT,
    ZoneName VARCHAR(50),
    Time FLOAT
    )"""

    cursor.execute(db_query)


    db_query = """CREATE TABLE IF NOT EXISTS tblRawLocations (
    WIP INT NOT NULL,
    QTY INT NOT NULL,
    TagID VARCHAR(6),
    Timestamp FLOAT,
    x FLOAT,
    y FLOAT,
    ZoneID INT
    )"""
    
    cursor.execute(db_query)

    db_query = """CREATE TABLE IF NOT EXISTS tblZoneDef (
    ZoneID SERIAL PRIMARY KEY NOT NULL,
    ZoneName VARCHAR(50) NOT NULL,
    x_lower FLOAT NOT NULL,
    x_upper FLOAT NOT NULL,
    y_lower FLOAT NOT NULL,
    y_upper FLOAT NOT NULL
    );"""

    cursor.execute(db_query)
    conn.close()

def define_hard_zones():
    conn, cursor = db_connection()
    
    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper)
    VALUES ('Repairs', 0, 24, 69, 100);"""
    
    cursor.execute(db_query)

    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper)
    VALUES ('Missing Components', 1, 21, 34, 56);"""
    
    cursor.execute(db_query)

    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper)
    VALUES ('Color Quarter Re-Order', 11, 32, 16, 26);"""
    
    cursor.execute(db_query)

    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper)
    VALUES ('Special Assembly', 23, 44, 77, 100);"""
    
    cursor.execute(db_query)

    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper)
    VALUES ('Special Assembly Stitching', 44.5, 59, 77, 100);"""
    
    cursor.execute(db_query)

    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper)
    VALUES ('Assembly', 23, 44, 64, 77);"""
    
    cursor.execute(db_query)

    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper)
    VALUES ('Final Assembly', 44, 59, 64, 77);"""
    
    cursor.execute(db_query)

    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper)
    VALUES ('On the Line 2', 25, 44, 26, 63);"""
    
    cursor.execute(db_query)

    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper)
    VALUES ('Cleaning 2', 21, 34, 26, 37);"""
    
    cursor.execute(db_query)
    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper)
    VALUES ('Runners', 31, 59, 0, 16);"""
    
    cursor.execute(db_query)

    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper)
    VALUES ('Lasting', 60, 76, 70, 85);"""
    
    cursor.execute(db_query)

    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper)
    VALUES ('Tacking', 60, 76, 85, 100);"""
    
    cursor.execute(db_query)

    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper)
    VALUES ('Outsole', 77, 89, 63, 100);"""
    
    cursor.execute(db_query)

    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper)
    VALUES ('Liner', 60, 77, 49, 70);"""
    
    cursor.execute(db_query)

    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper)
    VALUES ('Blade', 76, 89, 51, 63);"""
    
    cursor.execute(db_query)

    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper)
    VALUES ('Tongue Assembly', 59, 75, 28, 49);"""
    
    cursor.execute(db_query)

    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper)
    VALUES ('Cleaning 1', 76, 89, 40, 50);"""
    
    cursor.execute(db_query)

    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper)
    VALUES ('Inspection', 76, 89, 29, 40);"""
    
    cursor.execute(db_query)

    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper)
    VALUES ('Pacing', 60, 89, 17, 28);"""
    
    cursor.execute(db_query)
    conn.close()

def delete_all():
   conn, cursor = db_connection()

   db_query = "DROP TABLE IF EXISTS tblOrders"

   cursor.execute(db_query)

   db_query = "DROP TABLE IF EXISTS tblPaths"

   cursor.execute(db_query)
   
   db_query = "DROP TABLE IF EXISTS tblRawLocations"

   cursor.execute(db_query)

   db_query = "DROP TABLE IF EXISTS tblZoneDef"

   cursor.execute(db_query)

   conn.close()

def dbPushTblOrders(WIP, QTY, tagID, inProd, t_start, t_end, time_on_floor, build_time, lastZone, zoneName):
    conn, cursor = db_connection()
    db_query = f"""INSERT INTO tblOrders (
    {WIP}, {QTY}, '{tagID},' {inProd}, {t_start}, {t_end}, {time_on_floor}, {build_time}, {lastZone}, {zoneName} 
    );"""
    cursor.execute(db_query)
    conn.close()

def dbPushTblPaths(WIP, QTY, tagID, zoneID, zoneName, time):
    conn, cursor = db_connection()
    db_query = f"""INSERT INTO tblPaths (
    {WIP}, {QTY}, '{tagID}', {zoneID}, '{zoneName}', {time}
    );"""

    cursor.execute(db_query)
    conn.close()


def dbPushTblRawLocations(WIP, QTY, tagID, timestamp, x, y, zoneID):
    conn, cursor = db_connection()
    db_query = f"""INSERT INTO tblRawLocations (
    {WIP}, {QTY}, '{tagID}', {timestamp}, {x}, {y}, {zoneID}
    );"""
    cursor.execute()
    conn.close()

def getActiveTimes():
   conn, cursor = db_connection()
   db_query = """SELECT loctime FROM tag_threshold
                 WHERE overallx > 9.8 OR overally > 9.8 OR overallz > 9.8;"""
   cursor.execute(db_query)

   data = cursor.fetchall()
   print(data)
   conn.close()

#def dbPush(overall_diff, currTime, batch):
#    conn, cursor = db_connection()
#
#    for key, values in overall_diff.items():
#        db_query = f"INSERT INTO tag_threshold VALUES ('{key}', {values[0]}, {values[1]}, {values[2]}, '{str(currTime)}', {batch});"
#        cursor.execute(db_query)
#    
#    conn.close()

