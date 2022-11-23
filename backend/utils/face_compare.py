import face_recognition
import PIL.Image
from typing import Union


def picCompare(pic1loc: str, pic2loc: Union[str, bytes]) -> float:
    image1 = face_recognition.load_image_file(pic1loc)
    encoding1 = face_recognition.face_encodings(image1)[0]
    image2 = face_recognition.load_image_file(pic2loc)
    encoding2 = face_recognition.face_encodings(image2)[0]
    faceDistances = face_recognition.face_distance([encoding1], encoding2)
    return faceDistances[0]


def isSamePerson(pic1loc: str, pic2loc: Union[str, bytes], threshold=0.6) -> bool:
    """Receives two filepaths of the image.
    Compares the two images expecting faces and then returns True if their similar.

    The default threshold for distance is 0.6.

    Lower values will result in stricter validation.



    Parameters
    ----------
    pic1loc : str
        Path to picture 1
    pic2loc : str
        Path to picture 2
    threshold : float, optional
        The threshold or strictness of the comparison, by default 0.6
    Returns
    -------
    bool
        Whether the faces are of the same person.
    """
    return picCompare(pic1loc, pic2loc) <= threshold


# def in_memory_compare(bytes, loc):
#     im = PIL.Image.open(file)
#     if mode:
#         im = im.convert(mode)
#     return np.array(im)
