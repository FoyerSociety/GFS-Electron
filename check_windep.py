from tkinter import * 
from tkinter.font import Font 
import os, sys, time, threading


class Installation(threading.Thread):
    def __init__(self):
        threading.Thread.__init__(self)
    
    
    def run(self):
        global isInstall
        os.system('pip install -r requirements.txt')
        isInstall = False
        global label_pip
        label_pip['text'] = ''



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
        

def run():
    global isInstall
    global label_pip
    install = Installation()
    install.start()
    isInstall = True
    label_pip['text'] = "chargement"
    label_pip.update()
    chargement()


def main():
    global label_pip
    
    fen.title("Verification")

    Label(fen, text = "Dependance Python", font = Font(size=14, underline=1)).pack()
    Button(fen, text="Installer", width = 15, font = Font(size=12), command=run).pack(pady=20)

    label_pip.pack()

    Label(fen, text = "Dependance Node", font = Font(size=14, underline=1)).pack()
    Button(fen, text="Installer", width = 15, font = Font(size=12), command=run).pack(pady=20)


def __fin__():
    fen.mainloop()


if __name__ == '__main__':
    fen = Tk()
    fen.geometry("250x220")
    isInstall = False
    isMount = True
    label_pip = Label(fen, text="")
    main()
    __fin__()

