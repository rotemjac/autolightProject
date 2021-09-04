# # # https://www.pyimagesearch.com/2015/01/26/multi-scale-template-matching-using-python-opencv/
# #
# # # import the necessary packages
# # import sys
# # #sys.path.append('C:\\Python39\\Lib\\site-packages')
# # #sys.path.append('C:\\Users\\danit\\Desktop\\computer_science\\year3\\Sem2\\final_proj_dir\\autolight_react_node\\server\\imgProcessing\\Lib\\site-packages')
# # import numpy as np
# # import argparse
# # import imutils
# # import glob
# # import cv2
# # import matplotlib.pyplot as plt
# # import _thread
# # import concurrent.futures
# # from PIL import Image
# # from os import walk
# # import pyodbc
# #
# #
# # def connectToDb():
# #     conn = pyodbc.connect('Driver={SQL Server};'
# #                           'Server=autolight-db.cvpwxpqfprzu.us-east-1.rds.amazonaws.com;'
# #                           'Database=autoLightDb;'
# #                           'UID=admin;'
# #                           'PWD=autolight;'
# #                           'Trusted_Connection=no;')
# #
# #     cursor = conn.cursor()
# #     cursor.execute('SELECT id, SearchImgDir FROM dbo.WarningLightsTbl')
# #     return cursor
# #
# #
# # def isIntersects(firstLoc, firstSize, secondLoc, secondSize):
# #     if firstLoc[0] > secondLoc[0] + secondSize[0] or firstLoc[1] > secondLoc[1] + secondSize[1] or \
# #             firstLoc[0] + firstSize[0] < secondLoc[0] or firstLoc[1] + firstSize[1] < secondLoc[1]:
# #         return False
# #     return True
# #
# #
# # def getTemplates(cursor):
# #     templates = {}
# #     queryRow = cursor.fetchone()
# #     while queryRow:
# #         imgPath = queryRow[1]
# #         templates[queryRow[0]] = []
# #         for (dirpath, dirnames, filenames) in walk(imgPath):
# #             for fileName in filenames:
# #                 templates[queryRow[0]].append(cv2.imread(dirpath + "/" + fileName, cv2.COLOR_BGR2GRAY))
# #         queryRow = cursor.fetchone()
# #     return templates
# #
# #
# # cursor = connectToDb()
# # templates = getTemplates(cursor)
# # numOfResults = 9 # get from user
# # image = cv2.imread("C:\\Users\\danit\\Desktop\\pics\\idan's dashboard photos-20210803T233001Z-001\\idan_s dashboard photos\\chosen photos\\additional no background.jpeg",
# #                    cv2.COLOR_BGR2GRAY)
# # #image = cv2.imread("C:\\Users\\danit\\Desktop\\pics\\Dashboards-20210724T112528Z-001\\Dashboards\\Dash7.jpg",
# #  #                  cv2.COLOR_BGR2GRAY) # get from user
# # (tHImg, tWImg) = image.shape[:2]
# # minImgSize = min(tHImg, tWImg);
# # imgScale = minImgSize / 400;
# #
# # image = cv2.resize(image, (int(tWImg / imgScale), int(tHImg / imgScale)), interpolation=cv2.INTER_AREA)
# #
# # def calcMatchTemplate(templateId):
# #     templatePics = templates[templateId]
# #     totalMaxVal = 0;
# #     totalMaxLoc = 0;
# #     matchTemplateWidth = 0;
# #     matchTemplateHeight = 0;
# #     for templatePic in templatePics:
# #         for scale in range(1, 90, 3):
# #             currScale = 0.17 + (scale * 0.01);
# #             resized = imutils.resize(templatePic, width=int(templatePic.shape[1] * currScale))
# #             result = cv2.matchTemplate(image, resized, cv2.TM_CCOEFF_NORMED)
# #             (minVal, maxVal, minLoc, maxLoc) = cv2.minMaxLoc(result)
# #             # TODO if maxVal bigger than 0.6 and in other location, also return.
# #             # sort by heighest of each image
# #             # when checking insersection - if returned true - remove the current location
# #             # and insert (the rest locations) back to the list at the right place
# #             if (maxVal > totalMaxVal):
# #                 totalMaxVal = maxVal
# #                 totalMaxLoc = maxLoc
# #                 (matchTemplateHeight, matchTemplateWidth) = resized.shape[:2]
# #     return (totalMaxVal, totalMaxLoc, matchTemplateHeight, matchTemplateWidth, templateId);
# #
# #
# # results = []
# # with concurrent.futures.ThreadPoolExecutor() as executor:
# #     futures = [executor.submit(calcMatchTemplate, templateId) for templateId in templates]
# #     results = [f.result() for f in futures]
# #
# # # for result in results:
# # results = sorted(results, key=lambda x: x[0])
# # highestScores = [results[len(results) - 1]]
# #
# # for i in range(len(results) - 2, 0, -1):
# #     if numOfResults <= len(highestScores):
# #         break
# #     currRes = results[i]
# #     isIntersect = False
# #     for currImg in highestScores:
# #         if isIntersects(currImg[1], (currImg[3], currImg[2]), currRes[1], (currRes[3], currRes[2])):
# #             isIntersect = True
# #             break
# #     if not isIntersect:
# #         highestScores.append(currRes)
# #
# # for currHighestScore in highestScores:
# #     cv2.rectangle(image, (currHighestScore[1][0], currHighestScore[1][1]),
# #               (currHighestScore[1][0] + currHighestScore[3], currHighestScore[1][1] + currHighestScore[2]), (0, 0, 255), 2, 8, 0)
# # cv2.imshow('output', image)
# # plt.imshow(image), plt.show()
# #
# #
# #
# # print(highestScores)
# # sys.stdout.flush()
#
#
# # #
# # # ##Danit version !
# # #
# #
#
# # import the necessary packages
# import sys
# # sys.path.append('C:\\Python39\\Lib\\site-packages')
# # sys.path.append('C:\\Users\\danit\\Desktop\\computer_science\\year3\\Sem2\\final_proj_dir\\autolight_react_node\\server\\imgProcessing\\Lib\\site-packages')
# import numpy as np
# import argparse
# import imutils
# import glob
# import cv2
# import matplotlib.pyplot as plt
# import _thread
# import concurrent.futures
# from PIL import Image
# from os import walk
# import pyodbc
#
#
#
# def connectToDb():
#     conn = pyodbc.connect('Driver={SQL Server};'
#                           'Server=autolight-db.cvpwxpqfprzu.us-east-1.rds.amazonaws.com;'
#                           'Database=autoLightDb;'
#                           'UID=admin;'
#                           'PWD=autolight;'
#                           'Trusted_Connection=no;')
#
#     cursor = conn.cursor()
#     cursor.execute('SELECT id, SearchImgDir FROM dbo.WarningLightsTbl')
#     return cursor
#
#
# def isIntersects(firstLoc, firstSize, secondLoc, secondSize):
#     if firstLoc[0] > secondLoc[0] + secondSize[0] or firstLoc[1] > secondLoc[1] + secondSize[1] or \
#             firstLoc[0] + firstSize[0] < secondLoc[0] or firstLoc[1] + firstSize[1] < secondLoc[1]:
#         return False
#     return True
#
#
# def getTemplates(cursor):
#     templates = {}
#     queryRow = cursor.fetchone()
#     while queryRow:
#         imgPath = queryRow[1]
#         templates[queryRow[0]] = []
#         for (dirpath, dirnames, filenames) in walk(imgPath):
#             for fileName in filenames:
#                 templates[queryRow[0]].append(cv2.imread(dirpath + "/" + fileName, cv2.COLOR_BGR2GRAY))
#         queryRow = cursor.fetchone()
#     return templates
#
#
#
# cursor = connectToDb()
# templates = getTemplates(cursor)
#
# numOfResults = int(sys.argv[1])
# # numOfResults = 9  # get from user
#
# image = cv2.imread(
#     ".\\server\\uploaded\\uploadedImg.jpg",
#     # "C:\\Users\\danit\\Desktop\\pics\\checkedDash\\with full beam.jpeg",
#     cv2.COLOR_BGR2GRAY)
# # image = cv2.imread(
# #     "C:\\Users\\danit\\Desktop\\pics\\idan's dashboard photos-20210803T233001Z-001\\idan_s dashboard photos\\chosen photos\\additional no background.jpeg",
# #     cv2.COLOR_BGR2GRAY)
# # image = cv2.imread("C:\\Users\\danit\\Desktop\\pics\\idan's dashboard photos-20210803T233001Z-001\\idan_s dashboard photos\\chosen photos\\coolant.jpeg",
# #                    cv2.COLOR_BGR2GRAY)
# # image = cv2.imread("C:\\Users\\danit\\Desktop\\pics\\Dashboards-20210724T112528Z-001\\Dashboards\\Dash7.jpg",
# #                  cv2.COLOR_BGR2GRAY) # get from user
# (tHImg, tWImg) = image.shape[:2]
# minImgSize = min(tHImg, tWImg);
# imgScale = minImgSize / 400;
#
# image = cv2.resize(image, (int(tWImg / imgScale), int(tHImg / imgScale)), interpolation=cv2.INTER_AREA)
#
#
# def calcMatchTemplate(templateId):
#     templatePics = templates[templateId]
#     totalMaxVal = 0;
#     totalMaxLoc = 0;
#     matchTemplateWidth = 0;
#     matchTemplateHeight = 0;
#     for templatePic in templatePics:
#         for scale in range(1, 90, 3):
#             currScale = 0.17 + (scale * 0.01);
#             resized = imutils.resize(templatePic, width=int(templatePic.shape[1] * currScale))
#             result = cv2.matchTemplate(image, resized, cv2.TM_CCOEFF_NORMED)
#             (minVal, maxVal, minLoc, maxLoc) = cv2.minMaxLoc(result)
#             # TODO if maxVal bigger than 0.6 and in other location, also return.
#             # sort by heighest of each image
#             # when checking insersection - if returned true - remove the current location
#             # and insert (the rest locations) back to the list at the right place
#             if (maxVal > totalMaxVal):
#                 totalMaxVal = maxVal
#                 totalMaxLoc = maxLoc
#                 (matchTemplateHeight, matchTemplateWidth) = resized.shape[:2]
#     return (totalMaxVal, totalMaxLoc, matchTemplateHeight, matchTemplateWidth, templateId);
#
#
# results = []
# with concurrent.futures.ThreadPoolExecutor() as executor:
#     futures = [executor.submit(calcMatchTemplate, templateId) for templateId in templates]
#     results = [f.result() for f in futures]
#
# # for result in results:
# results = sorted(results, key=lambda x: x[0])  # todo:add revered and change the code acccordingly?
# highestScores = [results[len(results) - 1]]
#
# for i in range(len(results) - 2, 0, -1):  # todo:change to while loop ?
#     if numOfResults <= len(highestScores):
#         break
#     currRes = results[i]
#     isIntersect = False
#     for currImg in highestScores:
#         if isIntersects(currImg[1], (currImg[3], currImg[2]), currRes[1], (currRes[3], currRes[2])):
#             isIntersect = True
#             break
#     if not isIntersect:
#         highestScores.append(currRes)
#
# idnentifiedIds = '('
# for currHighestScore in highestScores:
#     currVal = currHighestScore[0]
#     # if(currVal<0.7): #added#todo: add
#     #     break
#
#     cv2.rectangle(image, (currHighestScore[1][0], currHighestScore[1][1]),
#                   (currHighestScore[1][0] + currHighestScore[3], currHighestScore[1][1] + currHighestScore[2]),
#                   (0, 0, 255), 2, 8, 0)
#     currId = currHighestScore[4]
#     idnentifiedIds += "'" + str(currId) + "'," #added
#
# idnentifiedIds = idnentifiedIds[:-1] + ")"  # remove last "," #added
#
# cv2.imshow('output', image)
# plt.imshow(image), plt.show()
#
# cv2.imwrite("IdentificationResult.jpg", image) #todo: save  picture in client? update results page accordingly
#
# # print(highestScores)
#
#
# #added //todo:delete
# for score in highestScores:
#     print(score)
# print('')
#
# if(idnentifiedIds==")"):
#     print("No results were found")
# else:
#     print(idnentifiedIds)
#
#
# sys.stdout.flush()


import sys
from os import walk
import pyodbc
import numpy as np
import cv2
import itertools as it
from multiprocessing.pool import ThreadPool
from shapely.geometry import Polygon, LineString, point
import math
import boto3


def connectToDb():
    conn = pyodbc.connect('Driver={SQL Server};'
                          'Server=autolight-db.cvpwxpqfprzu.us-east-1.rds.amazonaws.com;'
                          'Database=autoLightDb;'
                          'UID=admin;'
                          'PWD=autolight;'
                          'Trusted_Connection=no;')

    cursor = conn.cursor()
    cursor.execute('SELECT id, SearchImgDir FROM dbo.WarningLightsTbl')
    return cursor


def PolygonSort(corners):
    n = len(corners)
    cx = float(sum(x for x, y in corners)) / n
    cy = float(sum(y for x, y in corners)) / n
    cornersWithAngles = []
    sortedCorners = []
    for x, y in corners:
        an = (np.arctan2(y - cy, x - cx) + 2.0 * np.pi) % (2.0 * np.pi)
        cornersWithAngles.append((x, y, an))
    cornersWithAngles.sort(key=lambda tup: tup[2])
    for cornerWithAngle in cornersWithAngles:
        sortedCorners.append((cornerWithAngle[0], cornerWithAngle[1]))
    return sortedCorners


def PolygonArea(corners):
    n = len(corners)
    area = 0.0
    for i in range(n):
        j = (i + 1) % n
        area += corners[i][0] * corners[j][1]
        area -= corners[j][0] * corners[i][1]
    area = abs(area) / 2.0
    return area


def isIntersects(firstCorners, secondCorners):
    poly1 = Polygon(firstCorners)
    poly2 = Polygon(secondCorners)

    return poly1.intersects(poly2)


def getPopularAndUnpopularTemplates(templates):
    popularTemplates = {}
    unPopularTemplates = {}
    for templateId in templates:
        if templateId in popularImagesIds:
            popularTemplates[templateId] = templates[templateId]
        else:
            unPopularTemplates[templateId] = templates[templateId]

    return popularTemplates, unPopularTemplates


# todo: insert queryRow[0] to variable curr Id
def getTemplates(cursor):
    templates = {}
    queryRow = cursor.fetchone()
    while queryRow:
        imgPath = queryRow[1]
        templates[queryRow[0]] = []
        for (dirpath, dirnames, filenames) in walk(imgPath):
            for fileName in filenames:
                templates[queryRow[0]].append(cv2.imread(dirpath + "/" + fileName, cv2.COLOR_BGR2BGRA))
        queryRow = cursor.fetchone()
    return templates


def affine_skew(tilt, phi, img, mask=None):
    '''
    affine_skew(tilt, phi, img, mask=None) -> skew_img, skew_mask, Ai
    Ai - is an affine transform matrix from skew_img to img
    '''
    h, w = img.shape[:2]
    if mask is None:
        mask = np.zeros((h, w), np.uint8)
        mask[:] = 255
    A = np.float32([[1, 0, 0], [0, 1, 0]])
    if phi != 0.0:
        phi = np.deg2rad(phi)
        s, c = np.sin(phi), np.cos(phi)
        A = np.float32([[c, -s], [s, c]])
        corners = [[0, 0], [w, 0], [w, h], [0, h]]
        tcorners = np.int32(np.dot(corners, A.T))
        x, y, w, h = cv2.boundingRect(tcorners.reshape(1, -1, 2))
        A = np.hstack([A, [[-x], [-y]]])
        img = cv2.warpAffine(img, A, (w, h), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REPLICATE)
    if tilt != 1.0:
        s = 0.8 * np.sqrt(tilt * tilt - 1)
        img = cv2.GaussianBlur(img, (0, 0), sigmaX=s, sigmaY=0.01)
        img = cv2.resize(img, (0, 0), fx=1.0 / tilt, fy=1.0, interpolation=cv2.INTER_NEAREST)
        A[0] /= tilt
    if phi != 0.0 or tilt != 1.0:
        h, w = img.shape[:2]
        mask = cv2.warpAffine(mask, A, (w, h), flags=cv2.INTER_NEAREST)
    Ai = cv2.invertAffineTransform(A)
    return img, mask, Ai


def affine_detect(detector, img, mask=None, pool=None):
    '''
    affine_detect(detector, img, mask=None, pool=None) -> keypoints, descrs
    Apply a set of affine transormations to the image, detect keypoints and
    reproject them into initial image coordinates.
    ThreadPool object passed to speedup the computation.
    '''
    params = [(1.0, 0.0)]
    for t in 2 ** (0.5 * np.arange(1, 6)):
        for phi in np.arange(0, 180, 72.0 / t):
            params.append((t, phi))

    def f(p):
        t, phi = p
        timg, tmask, Ai = affine_skew(t, phi, img)
        keypoints, descrs = detector.detectAndCompute(timg, tmask)
        for kp in keypoints:
            x, y = kp.pt
            kp.pt = tuple(np.dot(Ai, (x, y, 1)))
        if descrs is None:
            descrs = []
        return keypoints, descrs

    keypoints, descrs = [], []
    if pool is None:
        ires = it.imap(f, params)
    else:
        ires = pool.imap(f, params)
    for i, (k, d) in enumerate(ires):
        keypoints.extend(k)
        descrs.extend(d)
    return keypoints, np.array(descrs)


def filter_matches(kp1, kp2, matches, ratio=0.75):
    mkp1, mkp2 = [], []
    for m in matches:
        if len(m) == 2 and m[0].distance < m[1].distance * ratio:
            m = m[0]
            mkp1.append(kp1[m.queryIdx])
            mkp2.append(kp2[m.trainIdx])
    p1 = np.float32([kp.pt for kp in mkp1])
    p2 = np.float32([kp.pt for kp in mkp2])
    kp_pairs = zip(mkp1, mkp2)
    return p1, p2, kp_pairs


def match(desc1, desc2, kp1, kp2, matcher):
    raw_matches = matcher.knnMatch(desc1, trainDescriptors=desc2, k=2)  # 2
    p1, p2, kp_pairs = filter_matches(kp1, kp2, raw_matches)
    if len(p1) >= 4:
        H, status = cv2.findHomography(p1, p2, cv2.RANSAC, 5.0)
        kp_pairs = [kpp for kpp, flag in zip(kp_pairs, status) if flag]
        return np.sum(status), len(status), kp_pairs, H
    return 0, 1, None, None


def matchTemplate(templateId, templates, pool, detector, kp2, desc2, matcher, dashH, dashW):
    templatePics = templates[templateId]
    bestRatio = 0
    mostInliers = 0
    bestTemplatePic = {}
    bestH = {}

    for templatePic in templatePics:
        kp1, desc1 = affine_detect(detector, templatePic, pool=pool)
        inliers, matched, kpPairs, H = match(desc1, desc2, kp1, kp2, matcher)
        currRatio = (inliers / matched)
        if currRatio > 0.4 and inliers > mostInliers:
            bestRatio = currRatio
            mostInliers = inliers
            bestTemplatePic = templatePic
            bestH = H
    if mostInliers > 0 and H is not None:
        h1, w1 = bestTemplatePic.shape[:2]
        corners = np.float32([[0, 0], [w1, 0], [w1, h1], [0, h1]])
        corners = np.int32(cv2.perspectiveTransform(corners.reshape(1, -1, 2), bestH).reshape(-1, 2))

        if isLegalShape(corners, dashH, dashW):
            return (mostInliers, corners, templateId, bestRatio)

    return None


def isLegalShape(corners, dashH, dashW):
    return IsLegalArea(corners, dashH, dashW) and checkNoEqualCorners(corners) and checkNoOutOfBoundCorners(
        corners, dashH, dashW) and checkNoIntersectingLines(corners) and checkLegalShapeSizes(corners) and isValidAngle(
        corners)


def getDistance(p1=None, p2=None):
    return math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2)


def IsLegalArea(corners, dashH, dashW):
    corners_sorted = PolygonSort(corners)
    area = PolygonArea(corners_sorted)

    originalDashArea = dashH * dashW
    return area > (originalDashArea / 3200)


def checkNoEqualCorners(corners):
    for i in range(3):
        for j in range(i + 1, 4):
            if corners[i][0] == corners[j][0] and corners[i][1] == corners[j][1]:
                return False
    return True


def checkNoOutOfBoundCorners(corners, dashH, dashW):
    for corner in corners:
        if (corner[0] < 0) or (corner[0] > dashW) or (corner[1] < 0) or (corner[1] > dashH):
            return False
    return True


def checkNoIntersectingLines(corners):
    line1 = LineString([corners[0], corners[1]])
    line2 = LineString([corners[1], corners[2]])
    line3 = LineString([corners[2], corners[3]])
    line4 = LineString([corners[3], corners[0]])

    return not (line1.intersects(line3) or line2.intersects(line4))


def checkLegalShapeSizes(corners):
    sideA = getDistance(corners[0], corners[1])
    sideB = getDistance(corners[1], corners[2])
    sideC = getDistance(corners[2], corners[3])
    sideD = getDistance(corners[3], corners[0])

    return (max(sideA, sideC) / min(sideA, sideC)) < 2 and (
            max(sideB, sideD) / min(sideB, sideD)) < 2


def isValidAngle(corners):
    angleL01L23 = getAngle(corners[0], corners[1], corners[2], corners[3])
    angleL03L12 = getAngle(corners[0], corners[3], corners[1], corners[2])
    return (angleL01L23 >= 0 and angleL01L23 <= 10) or (angleL01L23 >= 170 and angleL01L23 <= 180) or \
           (angleL03L12 >= 0 and angleL03L12 <= 10) or (angleL03L12 >= 170 and angleL03L12 <= 180) or \
           (((angleL01L23 >= 0 and angleL01L23 <= 30) or (angleL01L23 >= 150 and angleL01L23 <= 180)) and \
            ((angleL03L12 >= 0 and angleL03L12 <= 30) or (angleL03L12 >= 150 and angleL03L12 <= 180)))


# Function to find the angle between two lines
def findAngle(line1Slope1, line2Slope):
    PI = 3.14159265

    # Store the tan value  of the angle
    angle = abs((line2Slope - line1Slope1) / (1 + line1Slope1 * line2Slope))

    # Calculate tan inverse of the angle
    ret = math.atan(angle)

    # Convert the angle from
    # radian to degree
    val = (ret * 180) / PI

    return (round(val, 4))


# Function to find the slope of a straight line
def slope(x1, y1, x2, y2):
    if x1 == x2:
        return (sys.maxsize)

    return ((y2 - y1) / (x2 - x1))


def getAngle(line1P1, line1P2, line2P1, line2P2):
    line1Slope = slope(line1P1[0], line1P1[1], line1P2[0], line1P2[1])
    line2Slope = slope(line2P1[0], line2P1[1], line2P2[0], line2P2[1])

    return findAngle(line1Slope, line2Slope)


def getHighestScores(results, numOfResults):
    results = sorted(results, key=lambda x: x[0], reverse=True)
    highestScores = []
    if (len(results) > 0):
        highestScores.append(results[0])

    for i in range(len(results)):
        if numOfResults <= len(highestScores):
            break
        currRes = results[i]
        isIntersect = False
        for currHighestScore in highestScores:
            if isIntersects(currHighestScore[1], currRes[1]):
                isIntersect = True
                break
        if not isIntersect:
            highestScores.append(currRes)

    return highestScores


def uploadS3(imgName):
    session = boto3.Session(
        aws_access_key_id='AKIA4CNNTWIMY2FQWQ4K',
        aws_secret_access_key='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',
    )
    s3 = session.resource('s3')

    # s3.meta.client.upload_file(Filename='.\\IdentificationResult.jpg', Bucket='autolight-bucket',
    #                            Key='IdentificationResult.jpg')

    s3.meta.client.upload_file(Filename='.\\IdentificationResult.jpg', Bucket='autolight-bucket',
                               Key='IdentificationResults/'+imgName)


def drawAndReturnMatches(highestScores, originalDash,imgName):
    identifiedIds = ""
    for currHighestScore in highestScores:
        # draw polygon around current match
        currCorners = currHighestScore[1]
        cv2.polylines(originalDash, [currCorners], True, (0, 255, 0), 2)

        # return current match ID
        currId = currHighestScore[2]
        identifiedIds += "'" + str(currId) + "',"

    identifiedIds = identifiedIds[:-1]  # remove last ","

    cv2.imwrite("IdentificationResult.jpg",
                originalDash)

    uploadS3(imgName)
    print(identifiedIds)


def runMatchOnTemplates(results, templates, pool, detector, kp2, desc2, matcher, dashH, dashW):
    for templateId in templates:
        result = matchTemplate(templateId, templates, pool, detector, kp2, desc2, matcher, dashH, dashW)
        if result is not None:
            results.append(result)


def identifyWarningLights():
    cursor = connectToDb()
    templates = getTemplates(cursor)
    popularTemplates, unPopularTemplates = getPopularAndUnpopularTemplates(templates)
    numOfResults = int(sys.argv[1])
    imgName = sys.argv[2]

    originalDash = cv2.imread(
        # "C:\\Users\\danit\\Desktop\\dashboards\\additional no background.jpeg",
        # "C:\\Users\\danit\\Desktop\\dashboards\\new4.jpg",
        # "C:\\Users\\danit\\Desktop\\dashboards\\n",
        ".\\server\\imgProcessing\\uploaded\\uploadedImg.jpg",
        # "C:\\Users\\danit\\Desktop\\pics\\Dashboards-20210724T112528Z-001\\Dashboards\\Dash12.jpg",
        # "C:\\Users\\danit\\Desktop\\pics\\Dashboards-20210724T112528Z-001\\idan's dashboard photos-20210803T233001Z-001\\idan_s dashboard photos\\chosen photos\\additional no background.jpeg",
        # "C:\\Users\\danit\\Desktop\\pics\\Dashboards-20210724T112528Z-001\\Dashboards\\Dash3a.jpg",
        cv2.IMREAD_UNCHANGED)

    dash = cv2.cvtColor(originalDash, cv2.COLOR_BGR2BGRA)
    dashH, dashW = dash.shape[:2]
    detector = cv2.xfeatures2d.SIFT_create(400)
    norm = cv2.NORM_L2
    matcher = cv2.BFMatcher(norm)

    pool = ThreadPool(processes=cv2.getNumberOfCPUs())
    kp2, desc2 = affine_detect(detector, dash, pool=pool)

    results = []
    runMatchOnTemplates(results, popularTemplates, pool, detector, kp2, desc2, matcher, dashH, dashW)
    highestScores = getHighestScores(results, numOfResults)
    if len(highestScores) < numOfResults:
        runMatchOnTemplates(results, unPopularTemplates, pool, detector, kp2, desc2, matcher, dashH, dashW)
        highestScores = getHighestScores(results, numOfResults)
    if len(highestScores) != 0:
        drawAndReturnMatches(highestScores, originalDash,imgName)
    else:
        print("")
    sys.stdout.flush()
    cv2.destroyAllWindows()


popularImagesIds = [2, 3, 4, 5, 6, 13, 17, 20, 30, 48, 55, 77, 78, 106]

# run function to identify warning lights
identifyWarningLights()
