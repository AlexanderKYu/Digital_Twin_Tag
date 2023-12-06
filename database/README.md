# Database

## database connection

Prerequisite: pgadmin4, AWS RDS database connection info

## File dbfuncs

Has all functions related to management of the database

### Connection Management
Deals with the connection of the backend to the database

`db_connection()`

`closeDBConnection(conn)`

### Initialization Functions
Functions ran upon initialization of database environment

`db_init(cursor)`

`define_hard_zones(cursor)`

### Delete Functions
Function used to delete data

`delete_all(cursor)` ***Note: This function should not be used unless needed. Will delete all tables and data within the database***

`deleteWIPOverrideFromQueue(cursor, WIP, QTY)`
Deletes a WIP from queue when front-end supervisor sets t_end to overridden WIP

`clearAllInactive(cursor)`
Clear all Inactive tags before populating it again in the poll
***Note: This function should be deprecated later. It is bad practice to completely clear the table as the front-end maybe querying for incomplete data. Instead during the poll it should check the 48 hour criteria and if a tag no longer satisfies it, the entry should be deleted and if a new tag satisfies the condition it should be added.***

### Insert Functions
Functions used to insert new data entries into the database

`dbPushTblOrders(cursor, WIP, QTY, tagID, inProd, t_start, t_end, time_on_floor, build_time, lastZone, zoneName)`

`dbPushTblPaths(cursor, WIP, QTY, tagID, zoneID, zoneName, time)`

`dbPushTblRawLocations(cursor, WIP, QTY, tagID, timestamp, x, y, zoneID)`

`dbPushZoneDef(cursor, ZoneName, x_lower, x_upper, y_lower, y_upper)`
Push a new zone definition. If the zone being pushed has a name that matches with a zone that is currently active, it will deactivate the previous zone. This will set a new entry with the updates attributes like coordinates.

`dbPushInactiveTags(cursor, tagID, WIP, QTY, inactive_duration)`

`addWIPOverrideIntoQueue(cursor, WIP, QTY)`

### Update Functions
Functions used to update existing data entries in the database

`dbUpdateWipStatus(cursor, WIP, QTY, tagID, timestamp, x, y, zoneID)`

`dbUpdateWIPOnTblPaths(cursor, WIP, QTY, zoneID)`

`setWIPInProd(cursor, WIP, QTY, inprod)`

`setProdEndTime(cursor, WIP, QTY, timestamp)`

`manualWIPOverrideForAllQTY(cursor, WIP, t_end)`

`manualWIPOverrideForQTY(cursor, WIP, QTY, t_end)`

`disableZoneDef(cursor, ZoneName)`

### Get Functions

`getActiveTimes(cursor)`
***Deprecated Function*** Gathered actives times to determine threshold based on 5 minute polling.
Threshold is then used to determine if the production floor is active or not.

`getActiveZones(cursor)`
Returns all the active set zones

`getActiveTagZones(cursor, x, y)`

`getZoneName(cursor, ZoneID)`

`getLastInProdWIPBasedOnTagId(cursor, tagid)`

`getLastInProdBasedOnTagIdExt(cursor, tagid)`

`getAllWIPOverride(cursor)`

`getInactiveInProdTags(cursor)`