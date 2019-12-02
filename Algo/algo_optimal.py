#!/usr/bin/python
# -*- coding: utf-8 -*-


from utility import Node1, PriorityQueue
import numpy as np
import json
from pyeasyga import pyeasyga

Choisi=[] # vecteur qui va contenier les colis

with open('C:/Users/djakd/Desktop/algorosa/datajson.json', 'r') as json_data:
    donneejson = json.load(json_data)

# le nombre de colis
    tailleMatriceColis = len(donneejson) - 1

    #initialisation de la matrice pour la méthode exacte du sac à dos
    inputData = np.zeros(shape=(tailleMatriceColis + 1, 6))

    #volume du coffre du chauffeur
    volumeCoffre = donneejson["chauffeur"][0]

    inputData[0][0] = tailleMatriceColis
    inputData[0][1] = volumeCoffre

    #initialisation des données pour la méthode heuristique du sac à dos
    data_genetique_sac=[]

    for i in range(1, tailleMatriceColis + 1):
        indice = i

        for j in range(0, 6):
            inputData[i][j] = donneejson["colis" + str(indice)][j]


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
        values.append(int(inputData[i][0]))
        weights.append(int(inputData[i][1]))


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




def matriceVC(taken):

    # on vas construire la matrice carre pour le TSP
    items = int(inputData[0][0])
    voyageurCommerce = []

    for k in range(0, items):
        if taken[k] == 1:
            voyageurCommerce.append((inputData[k + 1][2]))
            voyageurCommerce.append((inputData[k + 1][3]))
            voyageurCommerce.append((inputData[k + 1][4]))
            voyageurCommerce.append((inputData[k + 1][5]))



    taille = len(voyageurCommerce)

    voyageurCommerce1 = np.zeros(shape=(taille / 2, taille / 2))
    # print voyageurCommerce

    for i in range(0, taille, 2):

        for j in range(0, taille, 2):
            # print i,j

            voyageurCommerce1[i / 2][j / 2] = np.sqrt(((voyageurCommerce[i] - voyageurCommerce[j]) ** 2) + (
                    (voyageurCommerce[i + 1] - voyageurCommerce[j + 1]) ** 2))

    outputData = voyageurCommerce1 #matrice de distance avec 0 en diagonale
    return outputData,voyageurCommerce



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
        print ("Impossible: Pas de colis choisis")
        optimal_tour_src =0
        optimal_length=0

    elif tailleMTsp == 2:
        print("Le meilleur tajet est d'aller directement chercher et deposer le seul colis choisi")
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

def enregistrement(optimal_tour_src,voyageurCommerce):
    taille_tsp = len(optimal_tour_src)
    dic = {}
    for i in range(0, taille_tsp - 1):
        indic = str(i + 1)
        valeur = optimal_tour_src[i]
        dic["colis" + indic] = [voyageurCommerce[2 * valeur], voyageurCommerce[2 * valeur + 1]]
    # on enregistre l'ordre de parcours des colis dans le dossier test.json
    with open('C:/Users/djakd/Desktop/algorosa/test.json', 'w') as f:
        json.dump(dic, f, indent=4)

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
    if tailleMatriceColis < 5:

        solution_sac = SadExact()
        print "exacte : ", solution_sac

    else:
        for i in range(1, tailleMatriceColis + 1):
            indice = i
            tempon = {'value': donneejson["colis" + str(indice)][0], 'volume': donneejson["colis" + str(indice)][1]}
            data_genetique_sac.append(tempon)
        #print data_genetique_sac

        ga = pyeasyga.GeneticAlgorithm(data_genetique_sac)  # initialise the GA with data
        ga.fitness_function = SadHeuristique  # set the GA's fitness function
        ga.run()  # run the GA
        solution_sac = ga.best_individual()[1]

        print "genetique : ", solution_sac

    return solution_sac


def NombreDeColis(taken):
  NColis=0             #objet qui permet de compter le nombre de colis pris

  for i in range(0,len(taken),1):
   if taken[i]==1 :
      NColis=NColis + 1

  return NColis



def BestToRemove(chosen):
  print("inside fonction")
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
    print ("i=", i)

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

    comp = 1

    #while ok == True or distanceParcourue > detourMax:

    while distanceParcourue > detourMax:
        #ok = False
        print "compt", comp

        # print travel(chosen)[1]
        #distanceParcourue = travel(matriceVC(chosen)[0])[1]

        # while distnaceParcourue > detourMax :
        # il y a un keep à faire
        print("-----------colisPris1", colisPris)
        BTR = BestToRemove(colisPris)
        print("***********btr", BTR[1])
        trajetOptimal = BTR[0]
        distanceParcourue = BTR[1]
        print("-----------distanceParcourue1", distanceParcourue)
        colisPris = BTR[2]
        pris = trajetOptimal
        print("-----------colisPris2", colisPris)
        print("-----------distanceParcourue", distanceParcourue)

        comp = comp+1



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
    print "matrice_tsp",  np.shape(matrice_tsp[0])
    enregistrement(travel(matrice_tsp[0])[0], matrice_tsp[1])

    print "----------------"
    print travel(matriceVC(choisi)[0])

    print "**************"
    maximumDetour = 200

    p = BestWithDetour(choisi[:], maximumDetour)
    print   p
    print "matrice_tsp" ,matrice_tsp
    #print travel(matrice_tsp[0])








