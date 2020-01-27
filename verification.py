import pickle 
import os, sys

if sys.platform == "win32":
    file = open('check.pickle', 'rb')

    val = pickle.load(file)
    file.close()
    
    if not val:
        os.system('python check_windep.py')
    
    file.close()
