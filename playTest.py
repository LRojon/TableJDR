import sounddevice as sd
import soundfile as sf
import time

data, fs = sf.read('sound/sound.wav')
class Test(object):
    def play(self):
        sd.play(data, fs, blocking=True)

a = Test()
a.play()