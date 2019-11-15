import eel
import sys
from db.database import database 


options = {
	'mode' : 'custom',
	'args' : ['/usr/bin/electron' if sys.platform == 'linux' else '', '.']
}

eel.init('view')

@eel.expose
def test():
	'''
		fonction pour les tests 
								'''
	print('hello')


def main():
	eel.start('login.html', position=(135, 35), options=options)


@eel.expose
def login(usr, passwd):
	try:
		db = database()
	except:
		return "Une erreur s'est produite"
	else:
		cursor = db.cursor()
		cursor.execute('''
			SELECT 1 FROM Users WHERE username=%s AND PASSWORD=%s
		''', (usr, passwd))

		
		if len(cursor.fetchall()) == 1:
			return True
		else:
			return 'Authentification failed' 



if __name__ == '__main__':
	main()
