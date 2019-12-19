#!/usr/bin/python
# -*- coding: utf-8 -*-

from utility import Node1, PriorityQueue
import numpy as np
import json
#from pyeasyga import pyeasyga
import math
import sys


Choisi=[] # vecteur qui va contenier les colis
data_genetique_sac = [] #données pour l'algorithme genetique

#lecture du fichier Json et construction de la matrice qu'on utilisera. pour les colis

#with open('/Users/Nicolas/PhpstormProjects/ecpfinal/Algo/newjson.json', 'r') as json_data:
  #donneejson = json.load(json_data)

donneejson = json.loads(sys.argv[1])
print donneejson

# le nombre de colis
tailleMatriceColis = len(donneejson) - 1

inputData = np.zeros(shape=(tailleMatriceColis + 1, 8))

# volume du coffre du chauffeur
volumeCoffre = donneejson[0]['volume']

inputData[0][0] = tailleMatriceColis
inputData[0][1] = volumeCoffre
inputData[0][2] = donneejson[0]["latDepart"]
inputData[0][3] = donneejson[0]["longDepart"]
inputData[0][4] = donneejson[0]["latArrivee"]
inputData[0][5] = donneejson[0]["longArrivee"]



for j in range(1, tailleMatriceColis+1):

  i = int(j)

  inputData[i][0] = donneejson[i]["idColis"]
  inputData[i][1] = donneejson[i]["distance"]
  inputData[i][2] = donneejson[i]["prix"]
  inputData[i][3] = donneejson[i]["volume"]
  inputData[i][4] = donneejson[i]["latDepart"]
  inputData[i][5] = donneejson[i]["longDepart"]
  inputData[i][6] = donneejson[i]["latArrivee"]
  inputData[i][7] = donneejson[i]["longArrivee"]

# sac a dos méthode de l'algorithme génétique



# define a fitness function
def SadHeuristique(individual, data):

    values, volumes = 0, 0
    for selected, box in zip(individual, data):
        if selected:
            values += box.get('value')
            volumes += box.get('volume')
    if volumes > 50:           #ici pour le poids max je pense
        values = 0
    return values

# sac à dos méthode exacte

def SadExact():

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
        values.append(int(inputData[i][2])) # on recupere le prix
        weights.append(int(inputData[i][3])) # on recupre la volume


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



 # on vas construire la matrice carre pour le TSP

#calcul de ma distance entre deux points
def distance(lat1, lon1, lat2, lon2):
  distanceX = (lon2-lon1)*40000*math.cos((lat1+lat2)*math.pi/360)/360
  distanceY = (lat1-lat2)*40000/360
  dist = math.sqrt( (distanceX*distanceX) + (distanceY*distanceY))

  return dist
def matriceVC(taken):


    items = int(inputData[0][0])
    voyageurCommerce = []
    M_Enregistrement= []
#on parcour la matrice donnée par le SAD et on vas recuperer les info nécessaires des colis sélectionnés dans la grande
#matrice
    for k in range(0, items):
        if taken[k] == 1:
          voyageurCommerce.append((inputData[k + 1][4]))  # latitude de depart
          voyageurCommerce.append((inputData[k + 1][5]))  # longitude de depart
          voyageurCommerce.append((inputData[k + 1][6]))  # latitude d'arriver
          voyageurCommerce.append((inputData[k + 1][7]))  # longitude d'arriver

          # matrice permettant d enregistrer
          M_Enregistrement.append((inputData[k + 1][0]))
          M_Enregistrement.append((inputData[k + 1][4]))  # latitude de depart
          M_Enregistrement.append((inputData[k + 1][5]))  # longitude de depart
          M_Enregistrement.append((inputData[k + 1][0]))
          M_Enregistrement.append((inputData[k + 1][6]))  # latitude d'arriver
          M_Enregistrement.append((inputData[k + 1][7]))  # longitude d'arriver

    taille = len(voyageurCommerce)

    voyageurCommerce1 = np.zeros(shape=(taille / 2, taille / 2))
    # print voyageurCommerce

    for i in range(0, taille, 2):

        for j in range(0, taille, 2):
          voyageurCommerce1[i / 2][j / 2] = distance(voyageurCommerce[i],voyageurCommerce[i + 1],voyageurCommerce[j],voyageurCommerce[j + 1])
          '''voyageurCommerce1[i / 2][j / 2] = np.sqrt(((voyageurCommerce[i] - voyageurCommerce[j]) ** 2) + (
                    (voyageurCommerce[i + 1] - voyageurCommerce[j + 1]) ** 2))'''

    voyageurCommerce1[1][0]=0
    #
    #print M_Enregistrement
    outputData = voyageurCommerce1  #matrice de distance avec 0 en diagonale
    #print outputData
    return outputData,M_Enregistrement



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
            x = parent[len(parent) - 1]
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
# implémentation du voyageur de commerce

def travel(adj_mat, src=0):

    tailleMTsp=np.shape(adj_mat)[0]
    if tailleMTsp == 0:
        #print ("Impossible: Pas de colis choisis")
        optimal_tour_src =0
        optimal_length=0

    elif tailleMTsp == 2:
        optimal_tour_src =[0, 1, 0]
        optimal_length=adj_mat[0][1]


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
            # optimal_length
        # on met le résultat dans le format json afin de pouvoir l'enregistré


    return optimal_tour_src,optimal_length

def enregistrement(optimal_tour_src,M_Enregistrement):
    taille_tsp = len(optimal_tour_src)
    dic = {}
    for i in range(0, taille_tsp - 1):
        indic = str(i + 1)
        valeur = optimal_tour_src[i]
        dic["colis" + indic] = [M_Enregistrement[3 * valeur], M_Enregistrement[3 * valeur + 1],M_Enregistrement[3 * valeur + 2]]
    # on enregistre l'ordre de parcours des colis dans le dossier test.json
    #with open('./test.json', 'w') as f:
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



def SAD():
    if tailleMatriceColis < 12:

        solution_sac = SadExact()
        #print "exacte : ", solution_sac

    else:
        for i in range(1, tailleMatriceColis + 1):
            #indice = i
            #tempon = {'value': donneejson["colis" + str(indice)][0], 'volume': donneejson["colis" + str(indice)][1]}
            tempon ={'value': inputData[i][2], 'volume':inputData[i][3]}
            data_genetique_sac.append(tempon)
        #print data_genetique_sac

        #ga = pyeasyga.GeneticAlgorithm(data_genetique_sac)  # initialise the GA with data
        #ga.fitness_function = SadHeuristique  # set the GA's fitness function
        #ga.run()  # run the GA
        #solution_sac = ga.best_individual()[1]

        #print "genetique : ", solution_sac

    return solution_sac


def NombreDeColis(taken):
  NColis=0             #objet qui permet de compter le nombre de colis pris

  for i in range(0,len(taken),1):
   if taken[i]==1 :
      NColis=NColis + 1

  return NColis



def BestToRemove(chosen):
  #print("inside fonction")
  meilleur=[]

  '''ne pas oublier le cas de merde'''
  #print("--------ici.1")

  meilleur=travel(matriceVC(chosen)[0])[0][:]
  #print("--------ici.2")

  minDistance = travel(matriceVC(chosen)[0])[1]
  #print("--------ici.3")

  bestChosen=[]

  bestChosen=chosen[:]

  keep=chosen[:]  #je concerve la valeur de chosen dans un vecteur


  #print("dans la boucle for")

  for i in range(0,len(chosen),1):


    if chosen[i]==1 :
      #retirer.append(i)
      chosen[i]=0    #ne plus prendre l'element qui avait été pris
      voyager=travel(matriceVC(chosen)[0])
      distance = voyager[1]

      if distance < minDistance:
          minDistance = distance
          meilleur = voyager[0][:]
          bestChosen = chosen[:]

    chosen = keep[:]  # je remet chosen à sa valeur de depart

  return meilleur, minDistance, bestChosen


# gestion du detour max

def BestWithDetour(chosen, detourMax):
    ok = True  # cet objet me permet d'entrer au moins une fois dans la boucle while vu que le 'di...while' a été supprimé en python
    colisPris = chosen[:]
    #distanceParcourue = 0
    voyage=travel(matriceVC(chosen)[0])
    trajetOptimal = voyage[0]
    distanceParcourue = voyage[1]



    #while ok == True or distanceParcourue > detourMax:

    while distanceParcourue > detourMax:
        #ok = False


        # print travel(chosen)[1]
        #distanceParcourue = travel(matriceVC(chosen)[0])[1]

        # while distnaceParcourue > detourMax :
        # il y a un keep à faire
        #print("-----------colisPris1", colisPris)
        BTR = BestToRemove(colisPris)
        #print("***********btr", BTR[1])
        trajetOptimal = BTR[0]
        distanceParcourue = BTR[1]
        #print("-----------distanceParcourue1", distanceParcourue)
        colisPris = BTR[2]
        pris = trajetOptimal
        #print("-----------colisPris2", colisPris)
        #print("-----------distanceParcourue", distanceParcourue)





        ''' if NombreDeColis(colisPris) == 0:
            print('rien à gerer pour le detour max')
            distnaceParcourue = 0
            trajetOptimal = 0



        elif NombreDeColis(colisPris) == 1:
            distnaceParcourue = travel(matriceVC(chosen))[1]
            print  "bl ", distnaceParcourue
            trajetOptimal = [0, 1, 0]  # à voir si je garde cette façon de mettre le trajet optimal pour ce cas ci

            if distnaceParcourue > detourMax:
                print('Aucune solution pour ce detourMax')
                distnaceParcourue = 0
                trajetOptimal = 0
                colisPris = np.zeros(shape=(len(colisPris)))

         else : '''






    return trajetOptimal, distanceParcourue, colisPris


if __name__ == '__main__':
    choisi=SAD()

    matrice_tsp = matriceVC(choisi)
    #print "matrice :",  inputData


    #print "----------------"
    #print travel(matriceVC(choisi)[0])

    #print "**************"
    maximumDetour = 500

    p = BestWithDetour(choisi[:], maximumDetour)
    enregistrement(p[0], matrice_tsp[1])

    #print p
    #print "matrice_tsp" ,matrice_tsp
    #print travel(matrice_tsp[0])


