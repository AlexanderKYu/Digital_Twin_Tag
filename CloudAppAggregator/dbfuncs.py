import psycopg2
import sys
import boto3
import os
import config as db

conn = psycopg2.connect(
    database=db.DATABASE,
    user=db.USER,
    password=db.PASSWORD,
    host=db.HOST,
    port=db.PORT,
)

conn.autocommit = True
db_query = """SELECT * FROM test_vp_tags;"""
cursor = conn.cursor()

cursor.execute(db_query)

datas = cursor.fetchall()

for data in datas:
    print(data)

conn.close()