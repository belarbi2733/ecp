# !/usr/bin/python
# -*- coding: utf-8 -*-
import time

from utility import Node1, PriorityQueue
import numpy as np
from pyeasyga import pyeasyga
from decimal import *
import math
import random
import matplotlib
import matplotlib.pyplot as plt
import json
import sys
start_time = time.time()

global inputData, choisi, volumeCoffre, nbrColis, nbrPasssagers, maximumDetour, volMax
inputData = []
choisi = []

inputData_C = []
data_genetique_sac = []  # données pour l'algorithme genetique

'''on importe les données pour le transport des colis'''

#with open('./data_colis_final.json', 'r') as json_data:
    #donneejson = json.load(json_data)
donneejson = json.loads(sys.argv[1])

# le nombre de colis
nbrColis = len(donneejson) - 1

# initialisation de la matrice pour la méthode exacte du sac à dos
inputData1_C = np.zeros(shape=(nbrColis + 1, 8))

# volume du coffre du chauffeur
volumeCoffre = donneejson["chauffeur"][1]


inputData1_C[0][0] = nbrColis
inputData1_C[0][1] = volumeCoffre
inputData1_C[0][2] = donneejson["chauffeur"][0]  # id chauffeur
inputData1_C[0][3] = donneejson["chauffeur"][2]  # détour max
inputData1_C[0][4] = donneejson["chauffeur"][3]
inputData1_C[0][5] = donneejson["chauffeur"][4]
inputData1_C[0][6] = donneejson["chauffeur"][5]
inputData1_C[0][7] = donneejson["chauffeur"][6]



for k in range(1, nbrColis + 1):
  indice = k
  # print k

  inputData1_C[k][0] = donneejson["colis" + str(indice)][0]
  inputData1_C[k][1] = donneejson["colis" + str(indice)][1]
  inputData1_C[k][2] = donneejson["colis" + str(indice)][3]
  inputData1_C[k][3] = donneejson["colis" + str(indice)][2]
  inputData1_C[k][4] = donneejson["colis" + str(indice)][4]
  inputData1_C[k][5] = donneejson["colis" + str(indice)][5]
  inputData1_C[k][6] = donneejson["colis" + str(indice)][6]
  inputData1_C[k][7] = donneejson["colis" + str(indice)][7]

# print inputData1_C

inputData_C = inputData1_C  # inputData est la matrice globale qui va contenir les colis zone A - zone B et ensuite les colis horsZone
# inputData1 est la matrice qui contient uniquement les colis zoneA - zone B

Choisi = []  # vecteur qui va contenier les colis
inputData_P = []
data_genetique_sac = []
somme = 0

'''On importe les données pour le transport des passagers'''
#with open('./data_passager2.json', 'r') as json_data:
    #donneejson = json.load(json_data)
donneejson2 = json.loads(sys.argv[2])

# le nombre de passagers
nbrPasssagers = len(donneejson2) - 1

# initialisation de la matrice pour la méthode exacte du sac à dos
inputData1_P = np.zeros(shape=(nbrPasssagers + 1, 9))

# nbrPlace est la variable pour le nombre de place disponibles dans la voiture
nbrPlaces = donneejson2["chauffeur"][1]

inputData1_P[0][0] = nbrPasssagers
inputData1_P[0][1] = nbrPlaces
inputData1_P[0][2] = donneejson2["chauffeur"][0]  # id du chauffeur
inputData1_P[0][3] = donneejson2["chauffeur"][7]  # volume du coffre
inputData1_P[0][4] = donneejson2["chauffeur"][3]  # latitude depart
inputData1_P[0][5] = donneejson2["chauffeur"][4]  # longitude depart
inputData1_P[0][6] = donneejson2["chauffeur"][5]  # latA
inputData1_P[0][7] = donneejson2["chauffeur"][6]  # longA
inputData1_P[0][8] = donneejson2["chauffeur"][2]  # detour maximum du chauffeur'''

# initialisation des données pour la méthode heuristique du sac à dos

for i in range(1, nbrPasssagers + 1):
  indice = i
  somme = somme + donneejson2["passager" + str(indice)][1]

for i in range(1, nbrPasssagers + 1):
  indice = i

  # nous allons faire un sac à dos qui minimise la distance c'est pourquoi nous prénons à chaque fois la somme
  # des distances sur la distance entre chaque point de départ et le point de départ du chauffeur.

  tempon = Decimal(somme) / Decimal(donneejson2["passager" + str(indice)][1])
  inputData1_P[i][0] = donneejson2["passager" + str(indice)][0]
  inputData1_P[i][1] = tempon.quantize(Decimal('.001'), rounding=ROUND_HALF_UP)
  inputData1_P[i][2] = donneejson2["passager" + str(indice)][3]  # prix
  inputData1_P[i][3] = donneejson2["passager" + str(indice)][2]  # volume
  inputData1_P[i][4] = donneejson2["passager" + str(indice)][4]  # latD
  inputData1_P[i][5] = donneejson2["passager" + str(indice)][5]  # longD
  inputData1_P[i][6] = donneejson2["passager" + str(indice)][6]  # latA
  inputData1_P[i][7] = donneejson2["passager" + str(indice)][7]  # longA
  inputData1_P[i][8] = donneejson2["passager" + str(indice)][8]  # volume bagages

# print inputData1_P


inputData_P = inputData1_P


def addColis(mesDonnees):
    Donnees = []

    #with open('./horsZone_colis_final.json', 'r') as json_data:
        #donneejson = json.load(json_data)
    donneejson3 = json.loads(sys.argv[3])
    # le nombre de colis
    tailleMatrice = len(donneejson3)-1

    # initialisation de la matrice pour la méthode exacte du sac à dos
    myData = np.zeros(shape=(tailleMatrice, 8))

    for i in range(0, tailleMatrice):
      indice = i + 1

      myData[i][0] = donneejson3["colis" + str(indice)][0]
      myData[i][1] = donneejson3["colis" + str(indice)][1]
      myData[i][2] = donneejson3["colis" + str(indice)][3]
      myData[i][3] = donneejson3["colis" + str(indice)][2]
      myData[i][4] = donneejson3["colis" + str(indice)][4]
      myData[i][5] = donneejson3["colis" + str(indice)][5]
      myData[i][6] = donneejson3["colis" + str(indice)][6]
      myData[i][7] = donneejson3["colis" + str(indice)][7]

    Donnees = np.append(mesDonnees, myData, axis=0)
    Donnees[0][0] = Donnees[0][0] + tailleMatrice  # on change la valeur du nombre de colis total dans la matrice

    return Donnees


def addPassagers(mesDonnees):
    Donnees = []

    #with open('./horsZone_colis_final.json', 'r') as json_data:
            #donneejson = json.load(json_data)
    donneejson4 = json.loads(sys.argv[4])
    # le nombre de colis
    tailleMatrice = len(donneejson4)-1

    # initialisation de la matrice pour la méthode exacte du sac à dos
    myData = np.zeros(shape=(tailleMatrice, 9))

    for i in range(0, tailleMatrice):
        indice = i + 1

        myData[i][0] = donneejson4["passager" + str(indice)][0]
        # myData[i][1] = tempon.quantize(Decimal('.001'), rounding=ROUND_HALF_UP)
        myData[i][2] = donneejson4["passager" + str(indice)][3]  # prix
        myData[i][3] = donneejson4["passager" + str(indice)][2]  # volume
        myData[i][4] = donneejson4["passager" + str(indice)][4]  # latDd
        myData[i][5] = donneejson4["passager" + str(indice)][5]  # longD
        myData[i][6] = donneejson4["passager" + str(indice)][6]  # latA
        myData[i][7] = donneejson4["passager" + str(indice)][7]  # longA
        myData[i][8] = donneejson4["passager" + str(indice)][8]  # volume bagages

    Donnees = np.append(mesDonnees, myData, axis=0)
    Donnees[0][0] = Donnees[0][0] + tailleMatrice  # on change la valeur du nombre de passagers total dans la matrice

    return Donnees


# sac à dos méthode heuristique

def SadHeuristique(individual, data):
    values, volumes = 0, 0
    for selected, box in zip(individual, data):
        if selected:
            values += box.get('value')
            volumes += box.get('volume')
    if volumes > volMax:  # ici pour le poids max je pense
        values = 0
    return values


# sac à dos méthode exacte

def SadExact(comp):  # comp est la preference avec laquelle on effectue le sac à dos
    items = int(inputData[0][0])

    global capacity
    capacity = int(inputData[0][1])
    global values
    values = []
    global weights
    weights = []
    values.append(0)
    weights.append(0)

    for i in range(1, items + 1):
        values.append(int(inputData[i][comp]))
        weights.append(int(inputData[i][3]))

    global dst
    dst = {}
    global lst
    for i in range(1, items + 1):
        dst[str(i)] = float(values[i]) / float(weights[i])

    dst = sorted(dst.items(), key=lambda x: x[1], reverse=True)
    lst = []
    lst.append(0)
    for item in iter(dst):
        lst.append(int(item[0]))

    global bestnode
    bestnode = Node(0, 0, 0, [], [])

    # Branch and bound Method
    value = 0
    room = capacity
    ptr = 0

    rootNode = Node(lst[ptr], capacity, 0, [], [])
    iterativepreorder(rootNode)

    taken = []
    value = 0

    for i in range(1, items + 1):
        if i in bestnode.selected:
            taken.append(1)
            value += values[i]
        else:
            taken.append(0)

    return taken


# calcul de ma distance entre deux points
def distance(lat1, lon1, lat2, lon2):
    distanceX = (lon2 - lon1) * 40000 * math.cos((lat1 + lat2) * math.pi / 360) / 360
    distanceY = (lat1 - lat2) * 40000 / 360
    dist = math.sqrt((distanceX * distanceX) + (distanceY * distanceY))
    return dist


def SAD(nbr, comp, position):
    '''Fonction permettant de faire le choix entre la méthode exacte  et la méthode heuristique pour la résolution
    du problème du sac à dos. '''

    if nbr < 12:

        solution_sac = SadExact(comp)
        #print "exacte : ", solution_sac

    else:
        for i in range(1, nbr + 1):
            tempon = {'value': inputData[i][2], 'volume': inputData[i][position]}
            data_genetique_sac.append(tempon)

        ga = pyeasyga.GeneticAlgorithm(data_genetique_sac)  # initialise the GA with data
        ga.fitness_function = SadHeuristique  # set the GA's fitness function
        ga.run()  # run the GA
        solution_sac = ga.best_individual()[1]

        #print "genetique : ", solution_sac

    return solution_sac


def SAD_passagers():
    '''Fonction permettant de faire le choix entre la méthode exacte  et la méthode heuristique pour la résolution
    du problème du sac à dos. '''

    if nbrPasssagers < 12:

        solution_sac = SadExact(1)  # comp=1 pour les passagers
        #print "exacte : ", solution_sac

    else:
        for i in range(1, nbrPasssagers + 1):
            tempon = {'value': inputData[i][2], 'volume': inputData[i][1]}
            data_genetique_sac.append(tempon)

        ga = pyeasyga.GeneticAlgorithm(data_genetique_sac)  # initialise the GA with data
        ga.fitness_function = SadHeuristique  # set the GA's fitness function
        ga.run()  # run the GA
        solution_sac = ga.best_individual()[1]

        #print "genetique : ", solution_sac

    return solution_sac


# fonction sac à dos à utiliser pendant tout le programme:
# elle choisi entre la méthde heuristique et la méthode exacte en fonction du nombre de colis

def SAD_colis():
    if nbrColis < 12:

        solution_sac = SadExact(2)
        #print "sad exact : ", solution_sac

    else:
        for i in range(1, nbrColis + 1):
            tempon = {'value': inputData[i][2], 'volume': inputData[i][3]}
            data_genetique_sac.append(tempon)

        ga = pyeasyga.GeneticAlgorithm(data_genetique_sac)  # initialise the GA with data
        ga.fitness_function = SadHeuristique  # set the GA's fitness function
        ga.run()  # run the GA
        solution_sac = ga.best_individual()[1]

        #print "sad genetique : ", solution_sac

    return solution_sac


def matriceVC(taken):
    # on vas construire la matrice carrée pour le TSP
    items = len(taken)
    voyageurCommerce = []
    M_Enregistrement = []

    voyageurCommerce.append((inputData[0][4]))
    voyageurCommerce.append((inputData[0][5]))
    voyageurCommerce.append((inputData[0][6]))
    voyageurCommerce.append((inputData[0][7]))

    M_Enregistrement.append((inputData[0][2]))
    M_Enregistrement.append((inputData[0][4]))
    M_Enregistrement.append((inputData[0][5]))
    M_Enregistrement.append((inputData[0][2]))
    M_Enregistrement.append((inputData[0][6]))
    M_Enregistrement.append((inputData[0][7]))

    for k in range(0, items):
        if taken[k] == 1:
            voyageurCommerce.append((inputData[k + 1][4]))
            voyageurCommerce.append((inputData[k + 1][5]))
            voyageurCommerce.append((inputData[k + 1][6]))
            voyageurCommerce.append((inputData[k + 1][7]))

            # matrice permettant d enregistrer
            M_Enregistrement.append((inputData[k + 1][0]))
            M_Enregistrement.append((inputData[k + 1][4]))  # latitude de depart
            M_Enregistrement.append((inputData[k + 1][5]))  # longitude de depart
            M_Enregistrement.append((inputData[k + 1][0]))
            M_Enregistrement.append((inputData[k + 1][6]))  # latitude d'arriver
            M_Enregistrement.append((inputData[k + 1][7]))  # longitude d'arriver

    taille = len(voyageurCommerce)

    if taille != 0:

        voyageurCommerce1 = np.zeros(shape=(taille / 2, taille / 2))

        for i in range(0, taille, 2):

            for j in range(0, taille, 2):
                voyageurCommerce1[i / 2][j / 2] = distance(voyageurCommerce[i], voyageurCommerce[i + 1],
                                                           voyageurCommerce[j], voyageurCommerce[j + 1])

        voyageurCommerce1[1][0] = 0

        outputData = voyageurCommerce1  # matrice de distance avec 0 en diagonale

    return outputData, M_Enregistrement


class Node:

    def __init__(self, ptr, room, value, selected, rmlist):
        self.ptr = ptr
        self.room = room
        self.value = value
        self.selected = selected
        self.rmlist = rmlist
        self.left = None
        self.right = None


def iterativepreorder(x):
    parent = []

    while parent or x != None:
        if x != None and x.ptr < len(values) - 1:
            parent.append(x)
            xleft = Node(x.ptr + 1, x.room - weights[lst[x.ptr + 1]], x.value + values[lst[x.ptr + 1]],
                         x.selected + [lst[x.ptr + 1]], x.rmlist)
            if calc_room(xleft.room):
                x = xleft

                visit(x)
            else:
                x = None
        else:
            x = parent[len(parent)-1]
            parent.remove(x)

            xright = Node(x.ptr + 1, x.room, x.value, x.selected, x.rmlist + [lst[x.ptr + 1]])

            if calc_bound(xright.rmlist):
                x = xright

            else:
                x = None


def visit(x):
    global bestnode
    if (x.value > bestnode.value):
        bestnode = x


def calc_room(room):
    if (room < 0):
        return False
    else:
        return True


def calc_bound(rmlist):
    fit = 0
    best = 0
    for item in dst:
        if (find(int(item[0]), rmlist) == False):
            itemw = weights[int(item[0])]
            while (fit < capacity and itemw > 0):
                best += float(item[1])
                itemw -= 1
                fit += 1
    if (best > bestnode.value):
        return True
    else:
        return False


def find(item, rmlist):
    try:
        item = rmlist.index(item)
        return True
    except ValueError:
        return False


# import sys
# implémentation du voyageur de commerce (méthode exacte)

def travelExact(adj_mat,Enregistrement, src=0):
    tailleMTsp = np.shape(adj_mat)[0]
    if tailleMTsp == 0:
        #print ("Impossible: Pas de colis choisis")
        optimal_tour_src = 0
        optimal_length = 0

    elif tailleMTsp == 2:
        #print("Le meilleur tajet est d'aller directement chercher et deposer le seul colis choisi")
        optimal_tour_src = [0, 1, 0]
        optimal_length = adj_mat[0][1]


    else:
        optimal_tour = []
        n = len(adj_mat)
        if not n:
            raise ValueError("Invalid adj Matrix")
        u = Node1()
        PQ = PriorityQueue()
        optimal_length = 0
        v = Node1(level=0, path=[0])
        min_length = float('inf')  # infinity
        v.bound = bound(adj_mat, v)
        PQ.put(v)
        while not PQ.empty():
            v = PQ.get()
            if v.bound < min_length:
                u.level = v.level + 1
                for i in filter(lambda x: x not in v.path, range(1, n)):
                    u.path = v.path[:]
                    u.path.append(i)
                    if u.level == n - 2:
                        l = set(range(1, n)) - set(u.path)
                        u.path.append(list(l)[0])
                        # putting the first vertex at last
                        u.path.append(0)

                        _len = length(adj_mat, u)
                        if _len < min_length:
                            min_length = _len
                            optimal_length = _len
                            optimal_tour = u.path[:]

                    else:
                        u.bound = bound(adj_mat, u)
                        if u.bound < min_length:
                            PQ.put(u)
                    # make a new node at each iteration! python it is!!
                    u = Node1(level=u.level)

        # shifting to proper source(start of path)
        optimal_tour_src = optimal_tour
        if src is not 1:
            optimal_tour_src = optimal_tour[:-1]
            y = optimal_tour_src.index(src)
            optimal_tour_src = optimal_tour_src[y:] + optimal_tour_src[:y]
            optimal_tour_src.append(optimal_tour_src[0])

        # on met le résultat dans le format json afin de pouvoir l'enregistré
        matrice_enregistrement=Enregistrement

    return optimal_tour_src, optimal_length, matrice_enregistrement


class Ville:
    def __init__(self, lon, lat, nom):
        self.lon = lon
        self.lat = lat
        self.nom = nom

    def distance(self, ville):
        distanceX = (ville.lon - self.lon) * 40000 * math.cos((self.lat + ville.lat) * math.pi / 360) / 360
        distanceY = (self.lat - ville.lat) * 40000 / 360
        distance = math.sqrt((distanceX * distanceX) + (distanceY * distanceY))

        return distance

    def getNom(self):
        return self.nom


class GestionnaireCircuit:
    villesDestinations = []

    def ajouterVille(self, ville):
        self.villesDestinations.append(ville)

    def getVille(self, index):
        return self.villesDestinations[index]

    def nombreVilles(self):
        return len(self.villesDestinations)

    def retirerVille(self):
        del self.villesDestinations[:]


class Circuit:
    def __init__(self, gestionnaireCircuit, circuit=None):
        self.gestionnaireCircuit = gestionnaireCircuit
        self.circuit = []
        self.fitness = 0.0
        self.distance = 0
        if circuit is not None:
            self.circuit = circuit
        else:
            for i in range(0, self.gestionnaireCircuit.nombreVilles()):
                self.circuit.append(None)

    def __len__(self):
        return len(self.circuit)

    def __getitem__(self, index):
        return self.circuit[index]

    def __setitem__(self, key, value):
        self.circuit[key] = value

    def genererIndividu(self):
        for indiceVille in range(0, self.gestionnaireCircuit.nombreVilles()):
            self.setVille(indiceVille, self.gestionnaireCircuit.getVille(indiceVille))
        random.shuffle(self.circuit)

    def getVille(self, circuitPosition):
        return self.circuit[circuitPosition]

    def setVille(self, circuitPosition, ville):
        self.circuit[circuitPosition] = ville
        self.fitness = 0.0
        self.distance = 0

    def getFitness(self):
        if self.fitness == 0:
            self.fitness = 1 / float(self.getDistance())
        return self.fitness

    def getDistance(self):
        if self.distance == 0:
            circuitDistance = 0
            for indiceVille in range(0, self.tailleCircuit()):
                villeOrigine = self.getVille(indiceVille)
                villeArrivee = None
                if indiceVille + 1 < self.tailleCircuit():
                    villeArrivee = self.getVille(indiceVille + 1)
                else:
                    # villeArrivee = self.getVille(indiceVille) #pour éviter de faire une boucle
                    villeArrivee = self.getVille(0)

                circuitDistance += villeOrigine.distance(villeArrivee)

            self.distance = circuitDistance
        return self.distance

    def tailleCircuit(self):
        return len(self.circuit)

    def contientVille(self, ville):
        return ville in self.circuit

    # partie 3


class Population:
    def __init__(self, gestionnaireCircuit, taillePopulation, init):
        self.circuits = []
        for i in range(0, taillePopulation):
            self.circuits.append(None)

        if init:
            for i in range(0, taillePopulation):
                nouveauCircuit = Circuit(gestionnaireCircuit)
                nouveauCircuit.genererIndividu()
                self.sauvegarderCircuit(i, nouveauCircuit)

    def __setitem__(self, key, value):
        self.circuits[key] = value

    def __getitem__(self, index):
        return self.circuits[index]

    def sauvegarderCircuit(self, index, circuit):
        self.circuits[index] = circuit

    def getCircuit(self, index):
        return self.circuits[index]

    def getFittest(self):
        fittest = self.circuits[0]
        for i in range(0, self.taillePopulation()):
            if fittest.getFitness() <= self.getCircuit(i).getFitness():
                fittest = self.getCircuit(i)
        return fittest

    def taillePopulation(self):
        return len(self.circuits)


# partie 4
class GA:
    def __init__(self, gestionnaireCircuit):
        self.gestionnaireCircuit = gestionnaireCircuit
        self.tauxMutation = 0.015
        self.tailleTournoi = 5
        self.elitisme = True

    def evoluerPopulation(self, pop):
        nouvellePopulation = Population(self.gestionnaireCircuit, pop.taillePopulation(), False)
        elitismeOffset = 0

        if self.elitisme:
            nouvellePopulation.sauvegarderCircuit(0, pop.getFittest())
            elitismeOffset = 1

        for i in range(elitismeOffset, nouvellePopulation.taillePopulation()):
            parent1 = self.selectionTournoi(pop)
            parent2 = self.selectionTournoi(pop)
            enfant = self.crossover(parent1, parent2)
            nouvellePopulation.sauvegarderCircuit(i, enfant)

        for i in range(elitismeOffset, nouvellePopulation.taillePopulation()):
            self.muter(nouvellePopulation.getCircuit(i))

        return nouvellePopulation

    def crossover(self, parent1, parent2):
        enfant = Circuit(self.gestionnaireCircuit)

        startPos = int(random.random() * parent1.tailleCircuit())
        endPos = int(random.random() * parent1.tailleCircuit())

        for i in range(0, enfant.tailleCircuit()):
            if startPos < endPos and i > startPos and i < endPos:
                enfant.setVille(i, parent1.getVille(i))
            elif startPos > endPos:
                if not (i < startPos and i > endPos):
                    enfant.setVille(i, parent1.getVille(i))

        for i in range(0, parent2.tailleCircuit()):
            if not enfant.contientVille(parent2.getVille(i)):
                for ii in range(0, enfant.tailleCircuit()):
                    if enfant.getVille(ii) == None:
                        enfant.setVille(ii, parent2.getVille(i))
                        break

        return enfant

    def muter(self, circuit):
        for circuitPos1 in range(0, circuit.tailleCircuit()):
            if random.random() < self.tauxMutation:
                circuitPos2 = int(circuit.tailleCircuit() * random.random())

                ville1 = circuit.getVille(circuitPos1)
                ville2 = circuit.getVille(circuitPos2)

                circuit.setVille(circuitPos2, ville1)
                circuit.setVille(circuitPos1, ville2)

    def selectionTournoi(self, pop):
        tournoi = Population(self.gestionnaireCircuit, self.tailleTournoi, False)
        for i in range(0, self.tailleTournoi):
            randomId = int(random.random() * pop.taillePopulation())
            tournoi.sauvegarderCircuit(i, pop.getCircuit(randomId))
        fittest = tournoi.getFittest()
        return fittest


# partie 5

def travelHeuristique(taken):
    mesIndices = {}
    position = 1

    #on vas construire la matrice utilisé pour l'enregistrement
    M_Enregistrement = []
    items = len(taken)

    M_Enregistrement.append((inputData[0][2]))
    M_Enregistrement.append((inputData[0][4]))
    M_Enregistrement.append((inputData[0][5]))
    M_Enregistrement.append((inputData[0][2]))
    M_Enregistrement.append((inputData[0][6]))
    M_Enregistrement.append((inputData[0][7]))

    for k in range(0, items):
        if taken[k] == 1:
            M_Enregistrement.append((inputData[k + 1][0]))
            M_Enregistrement.append((inputData[k + 1][4]))  # latitude de depart
            M_Enregistrement.append((inputData[k + 1][5]))  # longitude de depart
            M_Enregistrement.append((inputData[k + 1][0]))
            M_Enregistrement.append((inputData[k + 1][6]))  # latitude d'arriver
            M_Enregistrement.append((inputData[k + 1][7]))  # longitude d'arriver

    gc = GestionnaireCircuit()
    # for i in range (0, len(inputData)):
    for k in range(0, len(taken)):
        if taken[k] == 1:
            nom = 2 * position
            mesIndices[nom] = k + 1
            latitude = inputData[k + 1][4]
            longitude = inputData[k + 1][5]
            # print (latitude,longitude)
            ville_i = Ville(longitude, latitude, nom)

            gc.ajouterVille(ville_i)
            # nom2= 'arrive'+ str(indice)
            nom2 = 2 * position + 1
            mesIndices[nom2] = k + 1
            latitude2 = inputData[k + 1][6]
            longitude2 = inputData[k + 1][7]
            ville_ii = Ville(longitude2, latitude2, nom2)
            gc.ajouterVille(ville_ii)
            position = position + 1

    # on initialise la population avec 50 circuits
    pop = Population(gc, 50, True)
    #print("Distance initiale : " + str(pop.getFittest().getDistance()))

    # On fait evoluer notre population sur 100 generations
    ga = GA(gc)
    pop = ga.evoluerPopulation(pop)
    for i in range(0, 100):
        pop = ga.evoluerPopulation(pop)

    dist = pop.getFittest().getDistance()

    #print ("Distance finale : ", dist)
    meilleurePopulation = pop.getFittest()

    # for i in range(1,len(meilleurePopulation)):
    #  print(meilleurePopulation.getNom(i))

    lons = []
    lats = []
    noms = []
    for ville in meilleurePopulation.circuit:
        lons.append(ville.lon)
        lats.append(ville.lat)
        noms.append(ville.nom)

    #print(noms)

    monTrajet = StartWithDepartures(noms)
    #print"après modification:", monTrajet

    #print "==============================="
    #print mesIndices

    latDepart = inputData[0, 4]
    lonDepart = inputData[0, 5]
    latArrivee = inputData[0, 6]
    lonArrivee = inputData[0, 7]

    #print latDepart, lonDepart, latArrivee, lonArrivee

    latDebut = inputData[mesIndices[monTrajet[0]]][4]
    lonDebut = inputData[mesIndices[monTrajet[0]]][5]
    latFin = inputData[mesIndices[monTrajet[-1]]][6]
    lonFin = inputData[mesIndices[monTrajet[-1]]][7]

    #print latDebut, lonDebut, latFin, lonFin

    dist1 = distance(latDepart, lonDepart, latDebut, lonDebut)
    dist2 = distance(latArrivee, lonArrivee, latFin, lonFin)
    distTotale = dist1 + dist + dist2

    newTrajet = [0] + monTrajet + [1]
    # print newTrajet, "------", distTotale
    gc.retirerVille()

    return newTrajet, distTotale,M_Enregistrement


# if __name__ == '__main__':
#   tak=[0,1,0,0,1,0,0,0]
#   pat= travelHeuristique(tak)
#   print pat


def travel(taken):
    if NombreDeColis(taken) <= 4:
        return travelExact(matriceVC(taken)[0],matriceVC(taken)[1])

    else:
        return travelHeuristique(taken)




def enregistrement(optimal_tour_src, M_Enregistrement,dist):
    taille_tsp = len(optimal_tour_src)
    dic = {}
    dic["parcours"] = [inputData[0][2], dist]
    for i in range(0, taille_tsp - 1):
        indic = str(i + 1)
        valeur = optimal_tour_src[i]
        dic["adresse" + indic] = [M_Enregistrement[3 * valeur], M_Enregistrement[3 * valeur + 1],
                                   M_Enregistrement[3 * valeur + 2]]
    # on enregistre l'ordre de parcours des colis dans le dossier test.json
    # with open('./Sortie.json', 'w') as f:
        #json.dump(dic, f, indent=4)
    print dic

    return dic


def length(adj_mat, node):
    tour = node.path
    # returns the sum of two consecutive elements of tour in adj[i][j]
    return sum([adj_mat[tour[i]][tour[i + 1]] for i in xrange(len(tour) - 1)])


def bound(adj_mat, node):
    path = node.path
    _bound = 0

    n = len(adj_mat)
    determined, last = path[:-1], path[-1]
    # remain is index based
    remain = filter(lambda x: x not in path, range(n))

    # for the edges that are certain
    for i in xrange(len(path) - 1):
        _bound += adj_mat[path[i]][path[i + 1]]

    # for the last item
    _bound += min([adj_mat[last][i] for i in remain])

    p = [path[0]] + remain
    # for the undetermined nodes
    for r in remain:
        _bound += min([adj_mat[r][i] for i in filter(lambda x: x != r, p)])
    return _bound


# fonction qui calcule le nombre de colis choisi dans un ensemble donné de colis

def NombreDeColis(taken):
    NColis = 0  # objet qui permet de compter le nombre de colis pris

    for i in range(0, len(taken), 1):
        if taken[i] == 1:
            NColis = NColis + 1

    return NColis



#####################################
# auteur:Augustin
# date:02/12
# maj:04/12
# Objectif: Cette boucle nous donne pour chaque numéro de colis le moment où on le prend et où on le dépose en fonction de la sortie du VC
# entrées : l'ordre de passage des colis (graphe()) et les numéros des colis pris (TRAJET())
# sortie  : ordre de passage avec les mini-trajets joint au numéro du colis pris ou déposer dans le graphe
#####################################

def nv_graphe(TRAJET, graphe):
    p = 0
    lien = []
    # print"trajet",TRAJET,"graphe",graphe
    # for i in range(0, len(TRAJET)):
    #   if TRAJET[i]==1:
    #     mini1=[]
    #     mini2=[]
    #     mini1.append(2*p)
    #     mini1.append(i)
    #     mini2.append(2*p+1)
    #     mini2.append(i)
    #     p=p+1
    #     lien=lien+[mini1]+[mini2]

    for i in range(1, len(TRAJET)):
        if TRAJET[i - 1] == 1:
            mini1 = []
            mini2 = []
            mini1.append(2 * (p + 1))
            mini1.append(i - 1)
            mini2.append(2 * (p + 1) + 1)
            mini2.append(i - 1)
            p = p + 1
            lien = lien + [mini1] + [mini2]
    if TRAJET[len(TRAJET) - 1] == 1:
        mini1 = []
        mini2 = []
        mini1.append(2 * (p + 1))
        mini1.append(i)
        mini2.append(2 * (p + 1) + 1)
        mini2.append(i)
        lien = lien + [mini1] + [mini2]
    # print (lien)
    # [0,1,0,1,0,0,1] -> [[0, 1], [1, 1], [2, 3], [3, 3], [4, 6], [5, 6]] #[[numéro du sommet de départ,rang du 1 ie numéro du colis],[numéro du sommet d'arrivée,rang du 1 ie numéro du colis]]
    # On va transformer graphe() pour obtenir l'ordre de passage des sommets présélectionnés avec leur numéro de colis
    for i in range(0, len(lien)):
        for j in range(0, len(graphe)):
            if graphe[j] == lien[i][0]:
                graphe[j] = lien[i]
            if graphe[j] == 0:
                graphe[j] = [0, "depart"]
            if graphe[j] == 1:
                graphe[j] = [1, "arrivee"]
    return graphe


# nv_graphe([0,1,1,0,0,0,1],[0,2,1,4,3,5])->[[0, 1], [2, 2], [1, 1], [4, 6], [3, 2], [5, 6]]
######################################
# Objectif : On constitue ici la liste des sommets pondérés par leur volume
# Auteur : Augustin
# Date : 30/11
# dernière maj: 04/12
# En entrée : la liste des sommets graphe et la liste des volumes V triés dans l'ordre des sommets
# En sortie : un vecteur constitué de binôme : [n°sommet, volume]
######################################

def GV(graphe, V):
    GV = []
    for g in range(1, len(graphe) - 2):
        i = graphe[g][0]
        j = graphe[g][1]
        if i % 2 == 0:
            GV = GV + [[i, V[j]]]  # le numéro du sommet i correspond au numéro du mini-trajet.
        if i % 2 == 1:  # Il suffit donc d'ajouter dans l'ordre les sommets de ''graphe''
            GV = GV + [[i, -V[j]]]  # en les pondérant par leur volume à ajouter ou retirer à ce moment-là.
    return (GV)


# test : GV([[0,1],[2,5],[1,1],[3,5]],[10,3,2,24,23,20]) -> [[0, 3], [2, 20], [1, -3], [3, -20]]
# ca fonctionne bien comme on veut


######################################
# Objectif : La vérification du volume se fera sur chaque arête :
#           A chaque sommet on calcule le volume puis on vérifie qu'il est inférieur à Vmax.
# Auteur : Augustin
# Date : 28/11
# dernière maj: 30/11
# En entrée : La liste des binaires de GV et le volume max du coffre
# En sortie : TRUE si le coffre ne déborde pas à un moment du voyage avec le graphe proposé par le VC, FALSE sinon
######################################

def Vol(List_sommets_V, Vmax):
    V = 0
    for g in range(1, len(List_sommets_V) - 2):  # g représente un sommet
        V = V + List_sommets_V[g][1]  # V(g) est négatif si on le dépose et positif si on le prend
        if V > Vmax:  # dans ce cas, on ne peut pas prendre le colis i (suggéré ci-dessus) : on le rejette par false
            return 0
    return 1  # si à tout instant le volume est inférieur au volume du coffre alors on accepte le colis i (suggéré ci-dessus)


# ca fonctionne bien comme on veut
# ex : V([[0, 3], [2, 20], [1, -3], [3, -20]],7) -> 0
#     V([[0, 3], [2, 20], [1, -3], [3, -20]],23) -> 1

######################################
# Objectif : Remplir le tableau de B/V
# Auteur : Augustin
# Date : 25/11
# dernière maj: 30/11
# Antécédents :
#      Auparavant l'API nous aura permis de sélectionner des trajets qui se situent dans une enveloppe autour du chemin optimal (trouvé par l'API)
#      Chaque sélection de trajet nous donnera un bénéfice Bi et un volume Vi.
# En entrée : on a besoin de tous les Bi et Vi pour les mini-trajets, présents dans deux vecteurs appelés B et V. L est le nombre de colis dasn la ville.
# En sortie : le vecteur BV de binôme [B/V,n°sommet] trié par ordre décroissant selon B/V
######################################
def BVd(B, V, L):
    BV = []
    for i in range(L, len(B)):
        BV = BV + [[float(B[i]) / float(V[i]), i - L]]  # création des binômes
    BV.sort(reverse=True)
    return (BV)


# ca fonctionne bien comme on veut
# test : BVd([10,2,20,10],[8,5,1,1],2) -> [[20.0, 0], [10.0, 1]]


######################################
# Objectif : Optimiser le bénéfice et le volume du coffre en acceptant des mini-trajets ente deux villes.
# Auteur : Augustin
# Date : 28/11
# dernière maj: 06/12
# Antécédents :
#      Auparavant l'API nous aura permis de sélectionner des trajets qui se situent dans une enveloppe autour du chemin optimal (trouvé par l'API)
#      Chaque sélection de trajet nous donnera un bénéfice Bi et un volume Vi.
# En entrée : La matrice des trajets de la ville A à la ville B (trajets[i][j]=distance reliant i à j) et la liste des mini-trajets sur le trajet A->B (mini_trajets) et B et V, le volume maximal du coffre Vmax
# En sortie : un circuit optimal appelé solution() composé des trajets de A à B et de mini_trajets sélectionnés
#               ->Les binômes sont dans l'ordre de passage des colis
#               ->1er élément de chaque binôme : N° colis parmis les colis sélectionnés
#               ->2ème élément de chaque binôme : N° colis réel // prise si le premier élément est pair, dépôt sinon
######################################



def fn_mini_trajets(B, V, Vmax, maxDetour, trajet_initial):
    #############################################################################
    # initialisation avec les trajets de la ville A à la ville B grac au sac-à-dos
    #print "t_init", trajet_initial
    L = len(trajet_initial)
    temps_min = travel(trajet_initial)[1]
    #############################################################################

    #############################################################################
    # initialisation des mini-trajets qui dépendent du rapport Bénéfice/volume
    BV = BVd(B, V, L)
    # print(BV)
    mini_trajets_pris = []
    for e in range(0, len(BV)):
        mini_trajets_pris = mini_trajets_pris + [0]
    # print(mini_trajets_pris)
    #############################################################################

    # On teste à chaque boucle si le colis de B/V le plus fort non testé répond aux contraintes de temps et de volume
    for i in range(0, len(mini_trajets_pris)):

        #############################################################################
        # composition de l'entrée du voyageur de commerce établie avec le rang du B/V suivant le plus grand :
        mini_trajets_pris[BV[i][1]] = 1
        TRAJET = trajet_initial + mini_trajets_pris

        #print "trajet", TRAJET
        # vérification de la contrainte de temps par le voyageur de commerce et détermination de l'ordre de passage
        voyage = travel(TRAJET)
        graphe = voyage[0]
        #print"graphe", graphe
        #############################################################################

        #############################################################################
        # test detour max
        temps = voyage[1]
        #print "tpsmax", maxDetour, "mon tps", temps, "tmp min", temps_min

        t = temps - temps_min
        if (t > maxDetour):
            # print "t",t,"maxdetour",maxDetour
            mini_trajets_pris[BV[i][1]] = 0
            #print "test temps", mini_trajets_pris[BV[i][1]]
            continue
        #print "test temps", mini_trajets_pris[BV[i][1]]
        #############################################################################
        # test Volume
        # paramétrage du trajet donné par le voyageur de commerce pour calculer les volumes
        graphe2 = nv_graphe(TRAJET, graphe)  # Dans l'ordre des colis pris, on ajoute le numéro de ces colis.
        # print("nv",graphe2)
        GV1 = GV(graphe2,
                 V)  # on pondère chaque sommet i par son volume +V[i] si on prend le colis et -V[i] si on le dépose
        # print(GV1)
        # tester si à tout instant le volume est inférieur au volume max
        if Vol(GV1, Vmax) == 0:  # On vérifie que pour tout sommet le volume dans la voiture est inférieur à Vmax
            mini_trajets_pris[BV[i][1]] = 0  # Le cas échéant, on retire le mini-trajet testé.
        #print "test vol", Vol(GV1, Vmax)
    #############################################################################

    #############################################################################
    # on constitue la solution avec le vecteur final des colis pris
    VALIDES = trajet_initial + mini_trajets_pris
    # print(VALIDES)
    solution = travel(VALIDES)[0]
    return (VALIDES, nv_graphe(VALIDES, solution))


#############################################################################

# exemple:
# fn_mini_trajets(benefices, volumes, volumeCoffre)->
# ([1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
# [[0, 0], [4, 8], [5, 8], [1, 0], [3, 3], [2, 3], [0, 0]])


#####################################################
# objectif : calculer le volume max pour les colis hors-zone
# entrée : volume du coffre et le vecteur des volumes des bagages
# sortie : nouveau volume max
#####################################################
def Nv_Vol(Vol_coffre, Vol_bagages):
    S = sum(Vol_bagages)
    Nv_Volume = Vol_coffre - S
    return Nv_Volume


#############################################################################
'''Cette fonction se base sur le fait que tous les points de departs sont
referencés par des nombres pairs et les points d'arrivée par des nombres impairs
 dans le vecteur du trajet à parcourir; ce qui jusqu'ici a toujours été le cas'''


#############################################################################


def StartWithDepartures1(trajet):
    #print "modif1"

    # del trajet[-1]    #effacer la partie "retour au point de depart" pas besoin dan l'heuristique

    for i in range(len(trajet) - 1, -1, -1):
        # print "*****", i

        # print '///test trajet', trajet, trajet[-1]
        if (trajet[-1]) % 2 == 0:
            # print "inside"

            temp = trajet[-1]
            del trajet[-1]

            # print "before1", trajet
            trajet = [temp] + trajet

            # print "before2", trajet

        else:  # il s'arrete dès qu'il rencontre un element impair (un point final, une arrivée)
            break

    return trajet


#############################################################################
'''Cette fonction se base sur le fait que tous les points de departs sont
referencés par des nombres pairs et les points d'arrivée par des nombres impairs
 dans le vecteur du trajet à parcourir; ce qui jusqu'ici a toujours été le cas'''


#############################################################################


def StartWithDepartures2(trajet):
    #print "modif2"

    # del trajet[-1]    #effacer la partie "retour au point de depart" pas besoin dans l'heuristique
    #
    for i in range(len(trajet)):
        # print "*****", i

        # print '///test trajet', trajet, trajet[0]
        if (trajet[0]) % 2 == 1:
            # print "inside"

            temp = trajet[0]
            del trajet[0]

            # print "before1", trajet
            trajet = trajet + [temp]

            # print "before2", trajet

        else:  # il s'arrete dès qu'il rencontre un element impair (un point final, une arrivée)
            break

    return trajet


#############################################################################
'''Cette fonction se base sur le fait que tous les points de departs sont
referencés par des nombres pairs et les points d'arrivée par des nombres impairs
 dans le vecteur du trajet à parcourir; ce qui jusqu'ici a toujours été le cas'''


#############################################################################


def StartWithDepartures(trajet):
    keep = trajet[:]  # necessaire

    resultat = StartWithDepartures1(trajet)
    if (resultat == keep):  # s'il n'ya pas eu de modification
        resultat = StartWithDepartures2(keep)

    return resultat


# fonction qui cherche le meilleur colis à enlever dans un vecteur de colis pris parmi plusieurs
# afin de minimiser la distance à parcourir
# chosen: vecteur contenant les colis pris ou pas pris: 1 si le colis est pris et 0 sinon.
# benefices: vecteur des benefices de chaque colis dans l'ordre des colis.

def RespectDetourMax(chosen, benefices,
                     maxDetour):  # maxDetour est la somme du detour rentré par le chauffeur et du trajet initial du chauffeur

    dist_sur_benef_dictionnary = {}  # la distance sur benefice est à minimiser
    # c'est un dictionnaire avec pour clés des indices qui representent chacun des colis et pour valeurs d/b
    dist_sur_benef = []

    #print("inside fonction")
    meilleur = []

    meilleur = travel(chosen)[0][:]

    minDistance = travel(chosen)[1]

    bestChosen = []
    bestChosen = chosen[:]
    keep = chosen[:]  # je concerve la valeur de chosen dans un vecteur

    restDetour = maxDetour - minDistance  # detour restant = detour maximum - distance du trajet

    if restDetour >= 0:
        print "le trajet rentre déjà dans le detour maximum imposé"

    else:

        ##### je remplis le dictionnaire
        for i in range(0, len(chosen)):
            if chosen[i] == 1:
                chosen[i] = 0
                # MVC=matriceVC(chosen)[0]

                dist = travel(chosen)[1]

                valeur = (float(dist) / float(benefices[i]))
                dist_sur_benef_dictionnary[
                    i] = valeur  # attention, ici le colis i+1 est representé par le nombre i dans le dictionnaire

            chosen = keep[:]

        #print "****avant tri", dist_sur_benef_dictionnary
        liste = sorted(dist_sur_benef_dictionnary.items(),
                       key=lambda t: t[1])  # tri en fonction des valeurs (tri par ordre croissant)

        dist_sur_benef = liste[:]  # avec cette commande, on passe d'un dictionnaire à une liste de tuples

        ##############################################
        # retransformer la liste obtenue en dictionnaire
        '''for couple in liste:
          dist_sur_benef[couple[0]]= couple[1]'''
        ##############################################

        #print "****apres tri", dist_sur_benef

        listeCles = []
        for couple in dist_sur_benef:
            listeCles.append(couple[0])

        #print "ma liste de clés: ", listeCles
        i = 0
        removed = []
        enleves = []
        enleves_dictionnary = {}

        ###### je retire des colis jusqu'à atteindre le detour maximum
        #print "le detour restant: ", maxDetour, "-", minDistance, "=", restDetour

        while restDetour < 0:
            #print "inside while loop"
            i = i + 1

            if i > len(listeCles):
                #print "A voir_________pas moyen de rentrer dans le detour max proposé"
                break

            else:

                bestChosen[listeCles[
                    -i]] = 0  # retirer le dernier element dans le dictionnaire c'est à dire celui qui a le b/d le plus grand
                removed.append(listeCles[-i])
                voyager = travel(bestChosen)
                meilleur = voyager[0]
                minDistance = voyager[1]

                restDetour = maxDetour - minDistance

                #print listeCles[
                  #  -i], "+++", bestChosen, "le detour restant: ", maxDetour, "-", minDistance, "=", restDetour

        ###### j'essaie de voir si je ne peux pas remettre des colis
        copie = bestChosen[:]
        #print ".....removed.....", removed


        ##### remplissage du dictionnaire des colis enlevés

        for i in range(0, len(removed)):
           # print "remove:", removed[i], ";", dist_sur_benef_dictionnary[removed[i]]
            enleves_dictionnary[removed[i]] = dist_sur_benef_dictionnary[removed[i]]

        #print "****avant second tri", enleves_dictionnary

        liste = sorted(enleves_dictionnary.items(),
                       key=lambda t: t[1])  # tri en fonction des valeurs (tri par ordre croissant)

        enleves = liste[:]
        #print "****apres second tri", enleves

        ##### retransformer la liste obtenue en dictionnaire
        '''for k,v in liste:
          enleves[k]=v'''

        # for j in range(0, len(enleves.keys())):
        for couple in enleves:
            bestChosen[couple[0]] = 1
            distance = (travel(bestChosen))[1]
            restant = maxDetour - distance
            #print "new bestChosen", bestChosen
            #print "+++", bestChosen, "le detour restant: ", maxDetour, "-", distance, "=", restant

            if restant < 0:
               # print "i am inside hahaha"
                bestChosen = copie[:]

        voyage = travel(bestChosen)
        meilleur = voyage[0]
        minDistance = voyage[1]

    return meilleur, minDistance, bestChosen


# inputData=addColis(inputData1_C)         #on ne sait pas modifier la valeur d'une variable globale à l'interieur d'une fonction donc je suis obligé
# de le faire dans le main et donc separer chaque algo en deux mini algos


def Algo_Colis():
    benefices = []
    volumes = []

    for i in range(1, len(inputData)):
        benefices.append(inputData[i][2])
        volumes.append(inputData[i][3])

    #print "benefices", benefices
    #print "volumes", volumes
    #print len(benefices), len(volumes)

    #print " "
    #print "***************** retrait colis **********************"
    #print " "

    #print choisi
    newBest = RespectDetourMax(choisi, benefices, maximumDetour)
    #print  "///////newbest", newBest

    detourRestant = maximumDetour - newBest[1]

    if detourRestant > 0:  # les colis du fichier horsZone doivent etre dans un rayon de 'detourRestant' unités (cf database)
        #print ('******mini-trajets********')
        result = fn_mini_trajets(benefices, volumes, volumeCoffre, detourRestant, newBest[2])
        #print result
        #matrice = matriceVC(result[0])
        trav = travel(result[0])
        #print "après mini-trajet: ", trav

    #return result[0], trav, matrice[1]
    #return result[0], trav, trav[2]

    return trav



def Algo_Passagers():
    benefices = []
    volumes = []

    for i in range(1, len(inputData)):
        benefices.append(inputData[i][2])
        volumes.append(inputData[i][3])

    #print "benefices", benefices
    #print "volumes", volumes
    #print len(benefices), len(volumes)

    #print " "
    #print "*****************retrait passagers**********************"
    #print " "


    #print choisi
    newBest = RespectDetourMax(choisi, benefices, maximumDetour)
    #print  "///////newbest", newBest

    detourRestant = maximumDetour - newBest[1]

    if detourRestant > 0:  # les colis du fichier horsZone doivent etre dans un rayon de 'detourRestant' unités (cf database)
        #print ('******mini-trajets********')
        result = fn_mini_trajets(benefices, volumes, nbrPlaces, detourRestant, newBest[2])
        #print result
        #matrice = matriceVC(result[0])
        trav = travel(result[0])
        #print "après mini-trajet: ", trav

    #return result[0], trav, matrice[1]
    #return result[0], trav, trav[2]
    return trav

'''ne pas oublier de faire l'enregistrement'''

if __name__ == '__main__':
    detourChauffeur_p = inputData1_P[0][8]  # détour
    detourChauffeur_c = inputData1_C[0][3]  # détour
    #print detourChauffeur_c
    #choix = 1  # à recuperer de la base de données
    choix = json.loads(sys.argv[5])

    # Faire tourner l'algorithme des colis
    if choix == 1:
        volMax = volumeCoffre
        inputData = inputData_C
        #print ""
        #print "############Algorithme des colis###########"
        #print ""

        choisi = SAD(nbrColis, 2, 3)

        cheminSimple = distance(inputData[0][4], inputData[0][5], inputData[0][6], inputData[0][7])
        #print "chemin simple", cheminSimple

        maximumDetour = cheminSimple + detourChauffeur_c  # somme du detour rentré par le chauffeur et du trajet simple du chauffeur
        #print('---detour maximum---', maximumDetour)
        #print "zoneA-zoneB", travel(choisi)

        inputData = addColis(
            inputData1_C)  # on ne sait pas modifier la valeur d'une variable globale à l'interieur d'une fonction donc je suis obligé
        # de le faire dans le main et donc separer chaque algo en deux mini algos
        sol = Algo_Colis()

        #print 'ok'
        enregistrement(sol[0],sol[2],sol[1])

    # Faire tourner l'algorithme des passagers
    if choix == 2:
        volMax = nbrPasssagers
        inputData = inputData_P
        #print ""
        #print "############Algorithme des passagers###########"
        #print ""

        choisi = SAD(nbrPasssagers, 1, 1)
        cheminSimple = distance(inputData[0][4], inputData[0][5], inputData[0][6], inputData[0][7])
        #print "chemin simple", cheminSimple

        maximumDetour = cheminSimple + detourChauffeur_p  # somme du detour rentré par le chauffeur et du trajet simple du chauffeur
        #print('---detour maximum---', maximumDetour)
        #print "zoneA-zoneB", travel(choisi)

        inputData = addPassagers(inputData1_P)  # on ne sait pas modifier la valeur d'une variable globale à l'interieur d'une fonction donc je suis obligé
        # de le faire dans le main et donc separer chaque algo en deux mini algos
        sol = Algo_Passagers()

        #print 'ok'
        enregistrement(sol[0], sol[2],sol[1])

    # Faire tourner l'algorithme des passagers et l'algorithme des colis
    if choix == 3:
        volMax = nbrPasssagers
        inputData = inputData_P
        #print ""
        #print "##########Algorithme des passagers et des colis##############"
        #print "##########On commence par les passagers##############"
        #print ""

        choisi = SAD(nbrPasssagers, 1, 1)
        cheminSimple = distance(inputData[0][4], inputData[0][5], inputData[0][6], inputData[0][7])
        #print "chemin simple", cheminSimple

        maximumDetour = cheminSimple + detourChauffeur_p  # somme du detour rentré par le chauffeur et du trajet simple du chauffeur
        #print('---detour maximum---', maximumDetour)
        #print "zoneA-zoneB", travel(choisi)

        # temp=Algo_Passagers_debut()
        inputData = addPassagers(inputData1_P)  # on ne sait pas modifier la valeur d'une variable globale à l'interieur d'une fonction donc je suis obligé
        # de le faire dans le main et donc separer chaque algo en deux mini algos
        sol = Algo_Passagers()

        solution = []
        # Algo_Passagers_debut()
        solution = sol[0]
        #print "------sol-----", sol
        #print "------solution-----", solution

        #print ""
        #print "##########on passe aux colis##############"
        #print ""

        maximumDetour = maximumDetour - (sol[1])[
            1]  # reinitialiser le maximum detour avec le maximum detour qu'il reste
        #print "---new max detour---", maximumDetour
        volumeCoffre = inputData[0][3]
        #print "avant", volumeCoffre

        # volumeBagages=[]
        for i in range(len(solution)):
            if solution[i] == 1:
                # volumeCoffre = volumeCoffre - 50
                volumeCoffre = volumeCoffre - inputData[i + 1][8]

        # volumeCoffre = Nv_Vol(inputData[0][3], volumeBagages)

        #print "apres", volumeCoffre

        if volumeCoffre > 0:
            inputData = inputData_C
            inputData[0][1] = volumeCoffre

            # Algo_Colis_debut()
            volMax = volumeCoffre
            choisi = SAD(nbrColis, 2, 3)

            '''cheminSimple= distance(inputData[0][4], inputData[0][5], inputData[0][6], inputData[0][7])
            #cheminSimple= 212     #à recuperer de la base de données
            print "chemin simple", cheminSimple

            maximumDetour = cheminSimple + detourChauffeur    #somme du detour rentré par le chauffeur et du trajet simple du chauffeur
            print('---detour maximum---', maximumDetour)'''

            #print "zoneA-zoneB", travel(choisi)

            # temp=Algo_Colis_debut()
            inputData = addColis(
                inputData1_C)  # on ne sait pas modifier la valeur d'une variable globale à l'interieur d'une fonction donc je suis obligé
            # de le faire dans le main et donc separer chaque algo en deux mini algos

            Algo_Colis()

        elif volumeCoffre == 0:
            #print "Plus de place dans le coffre"
            print "null"

        else:  # (volumeCoffre < 0)
            #print "le volume des bagages a depassé le volume du coffre"  # problème à gerer
            print "null"

    # Affichage du temps d execution
    #print("Temps d execution : %s secondes ---" % (time.time() - start_time))
