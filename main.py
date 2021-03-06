#!/usr/bin/python3

import sys
if sys.platform == "win32": import verification
import eel
import os
import json
import hashlib
import mysql.connector
import argparse
from whichcraft import which
from datetime import datetime
from playsound import playsound


parser = argparse.ArgumentParser()
parser.add_argument("-d", "--dev", action="store_true", help="Mode test")
parser.add_argument("-D", "--db-docker", action="store_true", help="Mode database docker")
parser.add_argument("-S", "--nosound", action="store_true", help="Mode database docker")
args = parser.parse_args()

user, users = '', None
mois_globale = ('Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin',
				'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre')

start_date = datetime(2019, 12, 16)
start_cuisine = datetime(2020, 1, 20)
today_date = datetime.today()

ro = None
cuisinier = None

if sys.platform == 'linux':
	path = '/usr/bin/electron'

elif sys.platform == 'win32':
	path = r'node_modules\electron\dist\electron'

else:
	path = which('electron')

options = {
	'mode' : 'custom',

	'args' : [path, '.'] ,

	'port' : 1903
}

eel.init('view')


def database():
    with open('package.json', 'r') as file:
        file_parse = json.load(file)
    key = hashlib.sha1(file_parse['author'].encode())
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


@eel.expose
def login(usr, passwd):
	passwd = hashlib.sha1(passwd.encode()).hexdigest()
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

	if args.dev:
			val = ['127.0.0.1',
					'foyer', 'foyer', 'foyer']
	else:
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
	with open('/tmp/.file.tmp') as file:
		for vfile in file:
			vfile = vfile.split('/')[0]
			os.system(f"kill -9 {vfile.split(' ')[-1]} 1&> /dev/null")
	os.system('rm /tmp/.file.tmp')


@eel.expose
def passwd(usr, password):
	# fonction pour changer de mot de passe user
	password = hashlib.sha1(password.encode()).hexdigest()
	try:
		db = database()
	except:
		eel.afficher("Une erreur s'est produite lors de la connexion")
		return None
	else:
		cursor = db.cursor()

	try:
		cursor.execute("UPDATE Membre SET password=%s WHERE username=%s", (password, usr))
		db.commit()
		return True
	except:
		db.rollback()
		return False


@eel.expose
def addUser(usr, password):
	password = hashlib.sha1(password.encode()).hexdigest()
	try:
		db = database()
	except:
		eel.afficher("Une erreur s'est produite lors de la connexion")
		return None
	else:
		cursor = db.cursor()

	try:
		cursor.execute("""
			INSERT INTO Membre(username, password, cuisinier, ordures) 
			SELECT %s, %s, max(cuisinier)+1, max(ordures)+1 FROM Membre
			""", (usr.lower(), password))
		db.commit()
		return True
	except Exception as e:
		print('ito ny bug >>', e)
		db.rollback()
		return False


@eel.expose
def delUser(usr, passwd):
	global user
	val = login(user, passwd)

	if val == True:
		pass
	else:
		eel.afficher(val)
		return None

	try:
		db = database()
	except:
		eel.afficher("Une erreur s'est produite lors de la connexion")
		return None
	else:
		cursor = db.cursor()

	try:
		cursor.execute("DELETE FROM Membre Where username=%s", (usr,))
		db.commit()
		return True
	except:
		db.rollback()
		return False


@eel.expose
def play_sound():
	if not args.nosound: playsound('view/assets/audio/qui2.mp3')


@eel.expose
def assigner(usr, somme, mois, annee):
	try:
		db = database()
	except:
		eel.afficher("Une erreur s'est produite lors de la connexion")
		return None
	else:
		cursor = db.cursor()

	if usr == 'foyer':
		try:
			cursor.execute("""
				SELECT 1 FROM Argent WHERE mois=%s AND annee=%s
			""", (mois, annee))
		except: return False
		if len(cursor.fetchall()) == 0:
			sql = "INSERT INTO Argent(username, mois, annee, apayer) VALUES (%s, %s, %s, %s)"
			data = []
			global users
			for user in users:
				data.append((user[0], mois, annee, somme))
			try:
				cursor.executemany(sql, data)
			except:
				db.rollback()
				return False
			db.commit()
			return True
		else:
			try:
				cursor.execute('''
					UPDATE Argent SET apayer=%s WHERE mois = %s AND annee = %s
				''', (somme, mois, annee))
			except:
				db.rollback()
				return False
			
			db.commit()
			return True

	else:
		try:
			cursor.execute('''
				UPDATE Argent SET apayer=%s WHERE username = %s AND mois = %s AND annee = %s
			''', (somme, usr, mois, annee))
		except:
			db.rollback()
			return False
		db.commit()
		return True

@eel.expose
def resteSomme(usr):
	usr = usr.lower()
	try:
		db = database()
	except:
		eel.afficher("Une erreur s'est produite lors de la connexion")
		return None
	cursor = db.cursor()

	try:
		cursor.execute("""
			SELECT apayer - paye FROM Argent WHERE username=%s AND mois=%s AND annee=%s
		""", (usr, mois_globale[datetime.today().month - 1], datetime.today().year))
	except:
		eel.afficher("Un probleme inattendue est survenue")
		return None
	
	return cursor.fetchall()[0] 


@eel.expose
def getMenu():
	global ro

	if ro is None:
		try:
			db = database()
		except:
			eel.afficher("Une erreur s'est produite lors de la connexion")
			return None
		cursor = db.cursor()

		value = ((today_date - start_date).days % 14) + 1 
		# selection du chiffre du repas

		try:
			cursor.execute("""
				SELECT menu, prix FROM Menu WHERE id=%s
			""", (value,))
		except Exception as e:
			print(e)
			eel.afficher('Probleme inattendue survenu')
			return None
		
		val = cursor.fetchall()
		ro = f"{val[0][0]} | {val[0][1]}"
	
	return ro


@eel.expose
def getCuisinier():
	global cuisinier
	global users

	if cuisinier is None:
		value = (today_date - start_cuisine).days % len(users)

		try:
			db = database()
		except:
			eel.afficher("Une erreur s'est produite lors de la connexion")
			return None
		cursor = db.cursor()

		try:
			cursor.execute("""
				SELECT username FROM Membre WHERE cuisinier=%s
			""", (value, ))
		except Exception as e:
			print(e)
			eel.afficher("Une erreur s'est produite")
			return None
		
		cuisinier = cursor.fetchall()
		cuisinier = cuisinier[0][0].capitalize()

	return cuisinier


def main():
	eel.start('login.html', options=options)


if __name__ == '__main__':
	if sys.platform == 'linux':
		kill_prog()
	main()
