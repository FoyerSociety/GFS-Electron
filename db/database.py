import mysql.connector


def database():
		return mysql.connector.connect(
			host = "remotemysql.com",
			username = "g13Pj1NqxI",
			password = "amaahRSUrM",
			database = "g13Pj1NqxI"
		)
