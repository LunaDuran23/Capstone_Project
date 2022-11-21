from math import factorial
from operator import index
from numpy import mat
import face_recognition
import os
import cv2
import numpy as np

#usar funcion helper en vez de os.listdir() en mac
def mylistdir(directory):
    """A specialized version of os.listdir() that ignores files that
    start with a leading period."""
    filelist = os.listdir(directory)
    return [x for x in filelist
            if not (x.startswith('.'))]

knownFacesFolder = 'known_faces'
unknownFacesFolder = 'unknown_faces'

tolerance = 0.4 # DEFAULT FOR FACE RECOGNITION (entre menos fotos haya de cada individuo mayor tolerancia debe haber)

frameThick = 3
fontThick = 2

model_cnn = 'cnn' # convolutional neural network o utilizar HOG para mejor rendimiento

knownNames = [] # guardar los nombres dados a cada carpeta (identidad)
knownFaces = [] # guardar la info de cada rostro

print("Loading known faces...")

for name in mylistdir(knownFacesFolder): # iterate over known identities inside known faces folder 
    print('\n')
    for fileName in mylistdir(f"./{knownFacesFolder}/{name}"): # iterate over all pictures for identity
        print(f'Encoding: {name}/{fileName}')
        image = face_recognition.load_image_file(f"./{knownFacesFolder}/{name}/{fileName}") #load image
        encoding = face_recognition.face_encodings(image)[0] #encode, In case tgheres more than one face it will only tak,e the first opne detected
        print(f'el tipo de dato del enconding es: {type(encoding)}')
        print(f'\t Faces detected: {len(encoding)/128}')
        #add info to lists
        knownFaces.append(encoding)
        knownNames.append(name)

print("... Known faces loaded!\n\n")

cap = cv2.VideoCapture(0) #if want to use video replace 0 with 'filename.mp3'
t= True

while t:
    _, image = cap.read()

    unknownFaceLocations = face_recognition.face_locations(image)
    unknownFaceEncodings = face_recognition.face_encodings(image, unknownFaceLocations)

    cv2.imshow('image', image)
    
    k = cv2.waitKey(30) & 0xff
    if k == 27:
        break

    for faceEncoding in unknownFaceEncodings:
        matches = face_recognition.compare_faces(knownFaces, faceEncoding, tolerance)
        name = 'Unknown'
        faceDistances = face_recognition.face_distance(knownFaces, faceEncoding)
        bestMatchIndex = np.argmin(faceDistances)

        if matches[bestMatchIndex]:
                name = knownNames[bestMatchIndex]

    print(f"{name} es quien aparece en la foto")