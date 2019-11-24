from tkinter import * 
from tkinter.font import Font 
import os, subprocess, sys, threading, pickle


class Installation(threading.Thread):
    def __init__(self, dep):
        threading.Thread.__init__(self)
        self.dep = dep
    
    
    def run(self):
        global isInstall
        if self.dep == "python":
            global label_pip
            val = subprocess.call('pip install -r requirements.txt')

            if val == 1:
                label_pip['fg'] = 'red'
                label_pip['text'] = 'erreur ✘'
            else: 
                label_pip['fg'] = 'green'
                label_pip['text'] = 'succes ✓'

            isInstall = False
            label_pip.update()

        elif self.dep  == "npm":
            global label_npm

            ls = os.popen('dir /B node_modules').read()
            ls = ls.split('\n')
            
            if "jquery" not in ls:
                val = subprocess.call('npm i jquery --save ', shell=True)
                if val == 0:
                    label_npm['fg'] = 'green'
                    label_npm['text'] = 'succes ✓'
                else:
                    label_npm['fg'] = 'red'
                    label_npm['text'] = 'erreur ✘'
            else:
                label_npm['fg'] = 'green'
                label_npm['text'] = 'Ok ✓'
            
            label_npm.update()
            isInstall = False
        
        verify()
                    


def verify():
    global label_npm
    global label_pip

    if (label_npm['text'] == 'Ok ✓' and label_pip['text'] == 'succes ✓') or ((label_npm['text'] == 'succes ✓' and label_pip['text'] == 'succes ✓')):
        Button(fen, text="Fermer", fg="teal", width=15, height=3, font = Font(size=14), command=fen.quit).pack(pady=10)
        file = open('check.pickle', 'wb')
        val = True
        check = pickle.dump(val, file)
        file.close()
    
        

def chargement():
    global isInstall
    global label_pip
    global isMount 
    if isInstall:
        if isMount:
            if len(label_pip['text']) == 13:
                isMount = False
            else:
                label_pip['text'] += '.'
        else:
            if len(label_pip['text']) == 10:
                isMount = True
            else:
                label_pip['text'] = label_pip['text'][:-1]

        label_pip.update()
        fen.after(500, chargement)
        

def chargement_npm():
    global isInstall
    global label_npm
    global isMount0 
    if isInstall:
        if isMount0:
            if len(label_npm['text']) == 13:
                isMount0 = False
            else:
                label_npm['text'] += '.'
        else:
            if len(label_npm['text']) == 10:
                isMount0 = True
            else:
                label_npm['text'] = label_npm['text'][:-1]

        label_pip.update()
        fen.after(500, chargement_npm)


def run():
    global isInstall
    global label_pip
    install = Installation("python")
    install.start()
    isInstall = True
    label_pip['text'] = "chargement"
    label_pip.update()
    chargement()


def run_npm():
    global isInstall
    global label_npm
    install = Installation("npm")
    install.start()
    isInstall = True
    label_npm['text'] = "chargement"
    label_npm.update()
    chargement_npm()


def main():
    global label_pip
    
    fen.title("Verification")

    Label(fen, text = "Dependance Python", font = Font(size=14, underline=1)).pack()
    Button(fen, text="Installer", width = 15, font = Font(size=12), command=run).pack(pady=15)

    label_pip.pack()


    Label(fen, text = "Dependance Node", font = Font(size=14, underline=1)).pack(pady=10)
    Button(fen, text="Installer", width = 15, font = Font(size=12), command=run_npm).pack(pady=10)

    label_npm.pack()


def __fin__():
    fen.mainloop()


if __name__ == '__main__':
    fen = Tk()
    fen.geometry("250x300")
    isInstall = False
    isMount = True
    isMount0 = True
    label_pip = Label(fen, text="")
    label_npm = Label(fen, text="")
    main()
    __fin__()

