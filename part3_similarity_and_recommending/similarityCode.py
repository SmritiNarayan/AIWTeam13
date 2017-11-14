import nltk
import csv
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.tokenize import RegexpTokenizer
import math

def getCount(wordList, w):
	count = 0
	for word in wordList:
		if w==word:
			count+=1
	return count

sites = []
rawL = []
unigramL = []
simMat = []
stopwordsL = list(set(stopwords.words('english')))

with open('aiw.csv',newline='\n') as csvfile:
	reader = csv.reader(csvfile)
	for row in reader:
		sites.append(row[0])
		#toker = RegexpTokenizer(r'((?<=[^\w\s])\w(?=[^\w\s])|(\W))+',gaps=True)
		wordsLR = word_tokenize(row[1])
		wordsL = []
		for w in wordsLR:
			if w not in stopwordsL:
				wordsL.append(w.lower())
		rawL.append(wordsL)

for i in range(len(sites)):
	simMat.append([])
	for j in range(len(sites)):
		counts1 = []
		counts2 = []
		wL = list(set(rawL[i]+rawL[i]))
		for w in wL:
			counts1.append(getCount(rawL[i],w))
			counts2.append(getCount(rawL[j],w))
		nr = 0
		dr1 = 0
		dr2 = 0
		for w in range(len(counts1)):
			nr += counts1[w]*counts2[w]
			dr1 += counts1[w]*counts1[w]
			dr2 += counts2[w]*counts2[w]
		dr = math.pow(dr1,0.5)*math.pow(dr2,0.5)
		if dr == 0:
			simMat[i].append(0)
		else:
			simMat[i].append(nr/dr)

#Build top 10 for each site 
top = []
for i in range(len(simMat)):
	#top[i] = []
	top.append([])
	for k in range(10):
		lg = -1
		lgIndex = -1
		for j in range(1,len(simMat[i])):
			if simMat[i][j]>lg and sites[j] not in top[i] and sites[i]!=sites[j]:
				lg = simMat[i][j]
				lgIndex = j
		top[i].append(sites[lgIndex])

print(top)
