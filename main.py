import sys
if sys.platform == "win32":
	import verification
import eel
import os
import json
import hashlib
import mysql.connector
from whichcraft import which
from datetime import datetime


user, users = '', None

if sys.platform == 'linux':
	path = '/usr/bin/electron'

elif sys.platform == 'win32':
	path = r'node_modules\electron\dist\electron'

else:
	path = which('electron')

options = {
	'mode' : 'custom',

	'args' : [
				'/usr/bin/electron4'
					if sys.platform == 'linux'
						else 'node_modules\electron\dist\electron' if sys.platform == 'win32'
							else f'{which("electron")}',
		 '.'] ,

	'port' : 1903
}

eel.init('view')


def database():
	file = open('package.json', 'r')
	file_parse = json.load(file)
	key = hashlib.sha1(file_parse['author'].encode())
	file.close()
	return mysql.connector.connect(**db_value(key.hexdigest()))


@eel.expose
def setUser(val):
	global user
	user = val


@eel.expose
def getUser():
	global user
	return user.capitalize()


@eel.expose
def setUsers(val):
	global users
	users = val


def main():
	eel.start('main.html',  options=options)


@eel.expose
def login(usr, passwd):
	try:
		db = database()
	except:
		return "Une erreur s'est produite"
	else:
		cursor = db.cursor()
		cursor.execute('''
			SELECT 1 FROM Membre WHERE username=%s AND password=%s
		''', (usr, passwd))

		if len(cursor.fetchall()) == 1:
			return True
		else:
			return 'Authentification failed'


@eel.expose
def getMember():
	global users

	if users is None:
		try:
			db = database()
		except:
			eel.afficher("Probleme au niveau de la connexion...")
			return None
		else:
			cursor = db.cursor()
			cursor.execute('''
				SELECT username FROM Membre;
			''')
			users = cursor.fetchall()
			return users
	else:
		return users


def db_value(key):
	val  = os.popen(f".\\db.windows {key}"
					if sys.platform == "win32"
					else f"./db.linux {key}")
	val = val.read().split(' ')

	return {
	'host' : val[0],
	'user' : val[1],
	'password' : val[2],
	'database' : val[3] }


@eel.expose
def addCotisation(usr, somme, mois, annee):
	try:
		db = database()
	except:
		eel.afficher("Probleme au niveau de la connexion...")
		return None
	else:
		cursor = db.cursor()
		try:
			cursor.execute('''
				UPDATE Argent SET paye=paye+%s WHERE username=%s AND mois=%s AND annee=%s
			''', (somme, usr, mois, annee) )
		except:
			db.rollback()
			return False

	try:
		cursor.execute('''
			INSERT INTO Transaction(username, somme, motif, date) VALUES (%s, %s, %s, %s)
		''', (usr, somme, "cotisation", datetime.today()) )
	except:
		db.rollback()
		return False
	else:
		db.commit()
		return True


@eel.expose
def addDepense(usr, date, somme, motif):
	try:
		db = database()
	except:
		eel.afficher("Une erreur s'est produite lors de la connexion au base de donnée")
		return None
	else:
		cursor = db.cursor()

		if motif.lower() == 'repas':
			try:
				cursor.execute('''
					INSERT INTO Repas(username, somme, date) VALUES(%s, %s, %s)
				''', (usr, somme, date) )
			except:
				db.rollback()
				return False
		else:
			try:
				cursor.execute('''
					INSERT INTO Depense(username, somme, date, motif) VALUES(%s, %s, %s, %s)
				''', (usr, somme, date, motif) )

			except:
				db.rollback()
				return False

		try:
			cursor.execute('''
				INSERT INTO Transaction(username, somme, motif, date) VALUES (%s, %s, %s, %s)
			''', (usr, -int(somme), motif, datetime.today()) )
		except:
			db.rollback()
			return None
		else:
			db.commit()
			return True


@eel.expose
def getHistory():
	try:
		db = database()
	except:
		eel.afficher("Une erreur s'est produite lors de la connexion")
		return None
	else:
		cursor = db.cursor()

		try:
			cursor.execute('''
				SELECT * FROM Transaction ORDER BY id DESC LIMIT 20
			''')
		except:
			return (False, None)

		else:
			value = cursor.fetchall()
			for i in range(len(value)):
				value = list(value)
				value[i] = list(value[i])
				value[i][2] = value[i][2].strftime(r"%d/%m/%Y à %H:%M:%S")
			return (True, value)


@eel.expose
def privilege():
	global user
	try:
		db = database()
	except:
		eel.afficher("Une erreur s'est produite lors de la connexion")
		return None
	else:
		cursor = db.cursor()

		cursor.execute('''
			SELECT privilege FROM Membre WHERE username=%s
		''', (user,))

		return cursor.fetchall()


def kill_prog():
	os.system('netstat -paunt|grep 1903 > /tmp/.file.tmp')

	val = os.popen('cut -d / -f 1 /tmp/.file.tmp && rm /tmp/.file.tmp')
	val = val.read()
	if val != '':
		val = val.split(' ')[-1][:-1]
		os.system(f'kill -9 {val}')



if __name__ == '__main__':
	if sys.platform == 'linux':
		kill_prog()
	main()
