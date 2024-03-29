# Digital Twin Tag
Capstone Project for Team 33

## Description
The Digital Twin Tag (DTT) is a project designed to gather information on components using the tag to build a digitalized twin. The project is an all in one real-time system used to monitor different components. By tagging different entities the user is able to gather insightful information about the entities positioning within a designated area. The information can then be analysed based on the user's preferences and needs.

## Team Members
|Name|Student Number|Role|
|-|-|-|
|Alexander Yu|300120635|Backend/Cloud|
|Gabriel Beaupré-Jacques|300119485|Server|
|Alexis Verana|300116080|Frontend|
|Alois Clerc|300070936|Full Stack|
|Sonya Patel|300124330|Full Stack|

## Technologies Used
* Eliko Ultra-Wideband Real-Time Location System (UWB RTLS)
* Python
  * Matplotlib
  * PyQT5

## Other Tools
* Jira
* AWS RDS

## Objectives

### Term 1 Winter
Development of user interface, visualization, cloud storage database for Eliko system and rink IoT sensors. Deliver working interface before summer.

### Term 2 Fall
Expand analytics platform through development of task recognition algorithms using 2D position, IMU, historical data on player, etc.

## Architecture

The architecture of this project is comprised of four different structures.

Eliko System:

The Eliko system is responsible for the real time location tracking of the different tags. There are physical anchors within the facility placed to capture many tags within the designated zone.

Real Time System:

The real time system is responsible for the real time visualization of that tags. The user interface will support the display of the list of tags, graphing for tag movement and a real time camera feed of the designated zone.

Cloud System (Aggregator):

The cloud system is responsible for pulling data from the Eliko system and to push the information into the cloud.

Cloud Service:

The cloud service is responsible for storing past data. It will pull and push data.

## Risks

## Legal and Social Issues

## Plans for first Release 