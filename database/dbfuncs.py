import psycopg2
from os import environ, path
from dotenv import load_dotenv

basedir = path.abspath(path.dirname(path.dirname(__file__)))
load_dotenv(path.join(basedir, 'flask-api/.env'))

"""
--------------------
CONNECTION FUNCTIONS
--------------------
"""

def db_connection():
    """
    Function to establish a connection to the
    database.
    Returns the connection (conn), cursor
    """
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

def closeDBConnection(conn):
    """
    Function to close a connection to the
    database.
    Returns the status of closure
    """
    try:
        conn.close()
    except:
        print("Unable to close database connection.")
        return False
    return True

"""
------------------------
INITIALIZATION FUNCTIONS
------------------------
"""

def db_init(cursor):
    """
    Function to define all database tables to the
    database.
    """
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
    ZoneName VARCHAR(50),
    Rush BOOLEAN
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
    y_upper FLOAT NOT NULL,
    ActiveZone BOOLEAN NOT NULL
    );"""

    cursor.execute(db_query)

    db_query = """CREATE TABLE IF NOT EXISTS tblwipstatus (
    WIP INT NOT NULL,
    QTY INT NOT NULL,
    TagID VARCHAR(6),
    Timestamp FLOAT,
    x FLOAT,
    y FLOAT,
    ZoneID INT,
    CONSTRAINT COMP_NAME PRIMARY KEY (WIP, QTY)
    )"""

    cursor.execute(db_query)

    db_query = """CREATE TABLE IF NOT EXISTS wipOverrideQueue (
    WIP INT NOT NULL,
    QTY INT NOT NULL,
    t_start FLOAT,
    CONSTRAINT OVERRIDE_PAIR PRIMARY KEY (WIP, QTY)
    )"""

    cursor.execute(db_query)

    db_query = """CREATE TABLE IF NOT EXISTS inactiveTags (
    TagID VARCHAR(6),
    WIP INT,
    QTY INT,
    inactive_duration FLOAT,
    PRIMARY KEY (TagID)
    )"""

    cursor.execute(db_query)

def define_hard_zones(cursor):
    """
    Function to establish default zoning
    coordinates
    """

    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper, ActiveZone)
    VALUES ('No Zone', 0, 0, 0 , 0,True);"""

    cursor.execute(db_query)
    
    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper, ActiveZone)
    VALUES ('Repairs', 0, 24, 69, 100, True);"""
    
    cursor.execute(db_query)

    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper, ActiveZone)
    VALUES ('Missing Components', 1, 21, 34, 56, True);"""
    
    cursor.execute(db_query)

    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper, ActiveZone)
    VALUES ('Color Quarter Re-Order', 11, 32, 16, 26, True);"""
    
    cursor.execute(db_query)

    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper, ActiveZone)
    VALUES ('Special Assembly', 23, 44, 77, 100, True);"""
    
    cursor.execute(db_query)

    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper, ActiveZone)
    VALUES ('Special Assembly Stitching', 44.5, 59, 77, 100, True);"""
    
    cursor.execute(db_query)

    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper, ActiveZone)
    VALUES ('Assembly', 23, 44, 64, 77, True);"""
    
    cursor.execute(db_query)

    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper, ActiveZone)
    VALUES ('Final Assembly', 44, 59, 64, 77, True);"""
    
    cursor.execute(db_query)

    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper, ActiveZone)
    VALUES ('On the Line 2', 25, 44, 26, 63, True);"""
    
    cursor.execute(db_query)

    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper, ActiveZone)
    VALUES ('Cleaning 2', 21, 34, 26, 37, True);"""
    
    cursor.execute(db_query)
    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper, ActiveZone)
    VALUES ('Runners', 31, 59, 0, 16, True);"""
    
    cursor.execute(db_query)

    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper, ActiveZone)
    VALUES ('Lasting', 60, 76, 85, 100, True);"""
    
    cursor.execute(db_query)

    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper, ActiveZone)
    VALUES ('Tacking', 60, 76, 70, 85, True);"""
    
    cursor.execute(db_query)

    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper, ActiveZone)
    VALUES ('Outsole', 77, 89, 63, 100, True);"""
    
    cursor.execute(db_query)

    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper, ActiveZone)
    VALUES ('Liner', 60, 77, 49, 70, True);"""
    
    cursor.execute(db_query)

    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper, ActiveZone)
    VALUES ('Blade', 76, 89, 51, 63, True);"""
    
    cursor.execute(db_query)

    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper, ActiveZone)
    VALUES ('Tongue Assembly', 59, 75, 28, 49, True);"""
    
    cursor.execute(db_query)

    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper, ActiveZone)
    VALUES ('Cleaning 1', 76, 89, 40, 50, True);"""
    
    cursor.execute(db_query)

    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper, ActiveZone)
    VALUES ('Inspection', 76, 89, 29, 40, True);"""
    
    cursor.execute(db_query)

    db_query = """INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper, ActiveZone)
    VALUES ('Pacing', 60, 89, 17, 28, True);"""
    
    cursor.execute(db_query)

"""
----------------
DELETE FUNCTIONS
----------------
"""

def delete_all(cursor):
    """
    Function to drop all tables
    """
    db_query = "DROP TABLE IF EXISTS tblOrders"

    cursor.execute(db_query)

    db_query = "DROP TABLE IF EXISTS tblPaths"

    cursor.execute(db_query)

    db_query = "DROP TABLE IF EXISTS tblRawLocations"

    cursor.execute(db_query)

    db_query = "DROP TABLE IF EXISTS tblZoneDef"

    cursor.execute(db_query)

    db_query = "DROP TABLE IF EXISTS tblwipstatus"

    cursor.execute(db_query)

    db_query = "DROP TABLE IF EXISTS wipOverrideQueue"

    cursor.execute(db_query)

    db_query = "DROP TABLE IF EXISTS inactiveTags"

    cursor.execute(db_query)

def deleteWIPOverrideFromQueue(cursor, WIP, QTY):
    """
    Function to delete a WIP from the override queue
    """
    
    db_query = f"""DELETE FROM wipOverrideQueue
    WHERE WIP = {WIP} AND QTY = {QTY}"""

    cursor.execute(db_query)

def clearAllInactive(cursor):
    """
    Function to clear all inavtive tags
    """
    db_query = f"""DELETE FROM inactiveTags"""
    cursor.execute(db_query)

"""
----------------
INSERT FUNCTIONS
----------------
"""

def dbPushTblOrders(cursor, WIP, QTY, tagID, inProd, t_start, t_end, time_on_floor, build_time, lastZone, zoneName, rush):
    """
    Function to push data into tblOrders
    """
    try:
        db_query = f"""INSERT INTO tblOrders (WIP, QTY, tagID, inProd, t_start, t_end, time_on_floor, build_time, lastZone, zoneName, rush)
        VALUES ({WIP}, {QTY}, '{tagID}', {inProd}, {t_start}, {t_end}, {time_on_floor}, {build_time}, {lastZone}, '{zoneName}', {rush} 
        );"""
        cursor.execute(db_query)
    except:
        return False
    return True

def dbPushTblPaths(cursor, WIP, QTY, tagID, zoneID, zoneName, time):
    """
    Function to push data into tblPaths
    """

    db_query = f"""INSERT INTO tblPaths (WIP, QTY, TagID, ZoneID, ZoneName, Time)
    VALUES ({WIP}, {QTY}, '{tagID}', {zoneID}, '{zoneName}', {time}
    );"""

    cursor.execute(db_query)


def dbPushTblRawLocations(cursor, WIP, QTY, tagID, timestamp, x, y, zoneID):
    """
    Function to push data into tblRawLocations
    """

    db_query = f"""INSERT INTO tblRawLocations (WIP, QTY, tagID, timestamp, x, y, zoneID)
    VALUES ({WIP}, {QTY}, '{tagID}', {timestamp}, {x}, {y}, {zoneID});"""
    cursor.execute(db_query)

def dbPushZoneDef(cursor, ZoneName, x_lower, x_upper, y_lower, y_upper):
    """
    Function to push data into Zone definition
    """

    db_update_query = f"""UPDATE tblZoneDef SET ActiveZone = False WHERE ZoneName = '{ZoneName}'"""
    cursor.execute(db_update_query)

    db_insert_query = f"""INSERT INTO tblZoneDef (ZoneName, x_lower, x_upper, y_lower, y_upper, ActiveZone) 
    VALUES ('{ZoneName}', {x_lower}, {x_upper}, {y_lower}, {y_upper}, True)"""
    cursor.execute(db_insert_query)

def dbPushInactiveTags(cursor, tagID, WIP, QTY, inactive_duration):
    """
    Function to push data into inactivetags
    """
    db_query = f"""INSERT INTO inactivetags (TagID, WIP, QTY, inactive_duration)
    VALUES ('{tagID}', {WIP}, {QTY}, {inactive_duration})"""
    cursor.execute(db_query)

def addWIPOverrideIntoQueue(cursor, WIP, QTY):
    """
    Function to add an overridden WIP and QTY to a queue for 
    front-end
    """
    
    db_query = f"""SELECT t_start FROM tblOrders
    WHERE WIP = {WIP} AND QTY = {QTY}"""

    cursor.execute(db_query)

    t_start = cursor.fetchone()[0]

    db_query = f"""INSERT INTO wipOverrideQueue (WIP, QTY, t_start)
    VALUES ({WIP}, {QTY}, {t_start})"""

    cursor.execute(db_query)

"""
----------------
UPDATE FUNCTIONS
----------------
"""

def dbUpdateWipStatus(cursor, WIP, QTY, tagID, timestamp, x, y, zoneID):
    """
    Function to update the wip status
    """

    db_query = f"""INSERT INTO tblwipstatus (WIP, QTY, tagID, timestamp, x, y, zoneID)
    VALUES ({WIP}, {QTY}, '{tagID}', {timestamp}, {x}, {y}, {zoneID}) ON CONFLICT (WIP, QTY) 
    DO UPDATE SET tagID = '{tagID}', timestamp = {timestamp}, x = {x}, y = {y}, zoneID = {zoneID};"""
    cursor.execute(db_query)

def dbUpdateWIPOnTblPaths(cursor, WIP, QTY, zoneID):
    """
    Function to update a WIP on tblPaths
    """

    zone_duration = queryZoneDurationBasedOnTblRawLocations(cursor, WIP, QTY, zoneID)

    db_query = f"""UPDATE tblPaths SET Time = {zone_duration}
    WHERE WIP = {WIP} AND QTY = {QTY} AND ZoneID = {zoneID}"""

    cursor.execute(db_query)

def setWIPInProd(cursor, WIP, QTY, inprod):
    """
    Function to set inprod status for a WIP and QTY
    """

    db_query = f"""UPDATE tblorders SET inprod = {inprod}
    WHERE WIP = {WIP} AND QTY = {QTY}"""

    cursor.execute(db_query)

def setProdEndTime(cursor, WIP, QTY, timestamp):
    """
    Function to set t_end for WIP and QTY end of production time
    """

    db_query = f"""UPDATE tblorders SET t_end = {timestamp}
    WHERE WIP = {WIP} AND QTY = {QTY} AND inprod = False"""

    cursor.execute(db_query)

def manualWIPOverrideForAllQTY(cursor, WIP, t_end):
    """
    Function to manually override WIP's t_end
    """
    
    db_query = f"""UPDATE tblorders SET t_end = {t_end}, inprod = False
    WHERE WIP = {WIP} AND inprod = True"""

    cursor.execute(db_query)


def manualWIPOverrideForQTY(cursor, WIP, QTY, t_end):
    """
    Function to manually override WIP's and QTY's t_end
    """

    db_query = f"""UPDATE tblorders SET t_end = {t_end}, inprod = False
    WHERE WIP = {WIP} AND QTY = {QTY} AND inprod = True"""

    cursor.execute(db_query)

def disableZoneDef(cursor, ZoneName):
    """
    Function to disable a defined zone
    """
    db_update_query = f"""UPDATE tblZoneDef SET ActiveZone = False WHERE ZoneName = '{ZoneName}'"""
    cursor.execute(db_update_query)

"""
----------------
GET FUNCTIONS
----------------
"""
def getActiveTimes(cursor):
    """
    Function to get all active times
    """
    db_query = """SELECT loctime FROM tag_threshold
                    WHERE overallx > 9.8 OR overally > 9.8 OR overallz > 9.8;"""
    cursor.execute(db_query)

    data = cursor.fetchall()
    return data

def getActiveZones(cursor):
    """
    Fucntion to get all active time zones
    """
    db_query = """SELECT * FROM tblzonedef WHERE activezone = true;"""

    cursor.execute(db_query)

    data = cursor.fetchall()
    
    return data

def getActiveTagZones(cursor, x, y):
    """
    Function to get active tag zone based on coordinate
    """

    db_query = f"""SELECT * FROM tblzonedef 
    WHERE activezone = true AND tblzonedef.x_lower <= {x} AND tblzonedef.x_upper >= {x} 
    AND tblzonedef.y_lower <= {y} AND tblzonedef.y_upper >= {y};"""
    
    cursor.execute(db_query)

    data = cursor.fetchall()
    if len(data) == 1:
        return data[0]
    else:
        return (1, 'No Zone', 0, 0, 0, 0)

def getZoneName(cursor, ZoneID):
    """
    Function to get a Zone name based on the id
    """

    db_query = f"""SELECT ZoneName FROM tblzonedef
    WHERE ZoneID = {ZoneID}"""

    cursor.execute(db_query)

    return cursor.fetchone()[0]
    
def getLastInProdWIPBasedOnTagId(cursor, tagid):
    """
    Function to get the last inprod WIP and QTY 
    set on a tag
    """
    
    db_query = f"""SELECT WIP, QTY FROM tblorders
    WHERE inprod = True AND tagid = '{tagid}'
    ORDER BY t_start ASC"""

    cursor.execute(db_query)

    data = cursor.fetchall()

    if len(data) <= 0:
        return 0, 0
    return data[-1][0], data[-1][1]

def getLastInProdBasedOnTagIdExt(cursor, tagid):
    """
    Function to get last in prod WIP, QTY and t_start
    set on a tag
    """
    
    db_query = f"""SELECT WIP, QTY, t_start FROM tblorders
    WHERE inprod = True AND tagid = '{tagid}'
    ORDER BY t_start ASC"""

    cursor.execute(db_query)

    data = cursor.fetchall()

    if len(data) <= 0:
        return 0, 0, 0
    return data[-1][0], data[-1][1], data[-1][2]

def getAllWIPOverride(cursor):
    """
    Function to get all overridden WIPs in 
    the queue
    """

    db_query = f"""SELECT * FROM wipOverrideQueue"""

    cursor.execute(db_query)

    data = cursor.fetchall()
    
    return data

def getInactiveInProdTags(cursor):
    """
    Function to get inactive inprod tags
    """

    db_query = f"""SELECT tblOrders.tagID, tblOrders.wip, tblOrders.qty, inactivetags.inactive_duration FROM tblOrders
    INNER JOIN inactivetags ON tblOrders.tagid = inactivetags.tagid AND tblOrders.wip = inactivetags.wip AND tblOrders.qty = inactivetags.qty
    WHERE inprod = true"""

    cursor.execute(db_query)
    data = cursor.fetchall()
    return data

def getRushTags(cursor):
    """
    Function to get all rush tags
    """

    db_query = f"""SELECT * FROM tblOrders
    WHERE rush = true AND inprod = true"""

    cursor.execute(db_query)
    data = cursor.fetchall()
    return data

def getNonRushTags(cursor):
    """
    Function to get all non-rush tags
    """
    db_query = f"""SELECT * FROM tblOrders
    WHERE rush = false AND inprod = true"""

    cursor.execute(db_query)
    data = cursor.fetchall()
    return data

"""
----------------
CHECK/DATA FUNCTIONS
----------------
"""

def checkIfNewWIP(cursor, WIP, QTY):
    """
    Function to check if a WIP is in tblOrders
    """

    db_query = f"""SELECT * FROM tblorders
    WHERE WIP = {WIP} AND QTY = {QTY}"""

    cursor.execute(db_query)

    data = cursor.fetchall()
    if len(data) > 0:
        return False
    return True

def checkIfTagZoneOnPath(cursor, WIP, QTY, zoneID):
    """
    Function to check if a WIP, QTY and zoneID is in tblPaths
    """
    
    db_query = f"""SELECT * FROM tblPaths
    WHERE WIP = {WIP} AND QTY = {QTY} AND ZoneID = {zoneID}"""

    cursor.execute(db_query)

    data = cursor.fetchall()
    if len(data) > 0:
        return True
    return False

def queryZoneDurationBasedOnTblRawLocations(cursor, WIP, QTY, zoneID):
    """
    Function to get the duration of a WIP and QTY in a given zone
    """
    
    db_query = f"""SELECT Timestamp FROM tblRawLocations
    WHERE WIP = {WIP} AND QTY = {QTY} AND ZoneID = {zoneID}
    ORDER BY Timestamp ASC"""

    cursor.execute(db_query)

    data = cursor.fetchall()

    if len(data) >= 2:
        return data[-1][0] - data[0][0]
    return 0
