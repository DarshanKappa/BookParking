import collections


Card = collections.namedtuple('Card', ['rank', 'suit'])

# print(Card.rank)
# print(Card.suit)


class FrenchDeck:
    ranks = [str(n) for n in range(2, 11)] + list('JQKA')
    suits = 'spades diamonds clubs hearts'.split()
    
    def __init__(self):
        self._cards = [Card(rank, suit) for suit in self.suits for rank in self.ranks]

    def __len__(self):
        print('-------len called-----------')
        return len(self._cards)
    
    def __getitem__(self, position):
        print('--------get called---------')
        return self._cards[position]


deck = FrenchDeck()

# print(len(deck))
# print(deck[12::13])

suit_values = dict(spades=3, hearts=2, diamonds=1, clubs=0)

def spades_hight(card):
    rank_value = FrenchDeck.ranks.index(card.rank)
    return rank_value * len(suit_values) + suit_values[card.suit]


# for i in range(len(deck)):
#     print(deck[i])
#     print(spades_hight(deck[i]))
    
    
    
    
    
    
# import math

# class Vector:
#     def __init__(self, x=0, y=0):
#         self.x = x
#         self.y = y
    
#     def __repr__(self):
#         return f"Vector({self.x!r}, {self.y!r})"
    
#     def __abs__(self):
#         return math.hypot(self.x, self.y)

#     def __boo__(self):
#         return bool(abs(self))
    
#     def __add__(self, other):
#         x = self.x + other.x
#         y = self.y + other.y
#         return Vector(x, y)

#     def __mul__(self, scalar):
#         return Vector(self.x * scalar, self.y * scalar)
    
    
# v1 = Vector(1, 2)
# v2 = Vector(4, 5)

# print(v1 + v2)

# print(v1 * 3)
    
    


import array
import collections


a = array.array('l', [2,3,43,5])



# for i in a:
#     print(i)

# print(type(a))



q = collections.deque()


from collections import abc


# a = abc.Sequence()


# print(a)

# import time
# c = time.time()
# count1 = 10000
# list2 = [i for i in range(count1)]

# d = time.time()
# print(d-c)

# a = time.time()
# list1 = []
# count = 10000
# for i in range(count):
#     list1.append(i)
    
# b = time.time()
# print(b-a)

# data = [1,2,44,5,6,267,6,4,3,3,3,4,5,67,8,23,856,32,63]

# def f(x):
#     return x


# v = [y for x in data if type(y := f(x)) == int]

# if bool(d:= ''):
#     print(d)
# print(v)
    
# string = '#(@&@()))!*$*><<?.,,\|";:"'

# beyond_ascii = list(filter(lambda x : x<100, map(ord, string)))
    
# print(beyond_ascii)

from time import time
    

# s = 'kdfifikejf3r9033-0vkmvpowgiw0ifpodkvfl;sdkfdspoifposdifksdflksdvkpsdiweirf3ksdlvksd;kvkdkfsdif03wfkdslvks'*10
# v = '190834-8498124838484984983483483248324327423748734873284723748789074893748937498237489372487487498748372487'*10
# a = time()
# l1 = []
# for i in s:
#     for j in v:
#         l1.append((i, j))
# print(time()-a)

# b = time()
# l2 = [(i, j) for i in s for j in v]
# print(time()-b)

# a = ('dkfjkdf', 390, (3,'kd'))s
# b = ('dkfjkdf', 390, (3,'kd'))
# print(a)

# print(hash(a))
# print(hash(b))

# print(a)

# m = 2
# n= 1
# m + n
# print(m)

# l = [1,2,3,4,5,6]

# lc = l

# print(l)
# print(lc)
# lc.append(10)
# print(l)
# print(lc)

# t = (1, 2, [3, 4])

# print('-------------------------------------------')

# a,b,*c  = (1,2,3,4,5)
# print(a,c,b)

# t = ()

# t = a , b, c
# print(t)

import os



# print(os.getcwd())
# print(os.path.split())

# t = 1, 3, ('Darshan', 1)
# print(t)

# # value = ('ok', 'file1', 'file2', 'file3')
# value = ('2', 1)
# f1 = 'Darshan'
# l1 = 'Prajapati'
# f2 = 'Sahil'
# l2 = 'Chuahan'

# match value:
#     case ('se', *files ):
#         print(f"files {files!r}")
#     case ['2', *x]:
#         print(x)
#     case _: 
#         print('defualt')
        
# print('---------------------------------------------------')
        
# print('Darshan Prajapati'[::-1])

# invoice = """
# 0-------8-------------------------------40----------52----55-------------
# 1909    Darshan Prajapati               $17.5       3     $52.50         
# 1833    Jaimin Jethva                   $24.5       4     $132.50        
# 1855    Sahil Chuahan                   $15.5       6     $552.50        
# 2038    Chirag Thakkar                  $34.5       2     $452.50        
# -------------------------------------------------------------------------        
# 0000    All                             $92.0       15    $1190.00       
# """ 


# print(invoice[slice(0, 75)])
# print(invoice[slice(0, 8)])
# print(invoice[slice(8, 40)])
# print(invoice[slice(40, 52)])
# print(invoice[slice(52, 58)])
# print(invoice[slice(58, 75)])

# # for i in invoice.split('\n')[2:]:
# #     print(i[0:8], i[slice(8, 40)], i[55:])
# for i in invoice.split('\n')[2:]:
#     print(i)
    
# print('\n'*5)

# myList = [1,[1,2]]

# print(myList*3)



# l = [4, 2,5,2,56,8,3,23,2,567,32, 3, 0]
# l.sort()
# print(l)
# # print(l)

# # print(sorted(l, key=lambda x: str(x)))

import bisect

# b = bisect.bisect(l, 56, 0, len(l)-1)
# print(b)
# print(id(l))
# bisect.insort(l, 30)
# print(l)
# print(id(l))

from array import array
from random import random

# floats = array('d', (random() for _ in range(10**7)))

# print(floats[-1])

# fp = open('floats.bin', 'wb')

# floats.tofile(fp)
# fp.close()

# floats2 = array('d')
# fp = open('floats.bin', 'rb')
# floats2.fromfile(fp, 10**7)
# fp.close()
# print(floats2[-1])

# print(floats == floats2)

# file = os.path.getsize('./floats.bin')
# print(f"{file/1000000} MB")

from array import array

# a  = array('d', (i for i in range(1000)))
# print(type(a))
# import numpy as np

# octets = array('B', range(6))

# print(octets)

# m1 = memoryview(octets)

# print(m1.tolist())

# m2 = m1.cast('B', [2, 3])

# print(m2.tolist())

# m3 = m1.cast('B', [3, 2])

# print(m3.tolist())

# m2[1, 1] = 22
# m3[1, 1] = 33

# print(m1.tolist())

# print(octets)

# print(m2[0, 0])





# l = [1, 2, 3, 4, 5, 6]

# print(l)

# l.append(10)

# print(l)

# l.pop(0)

# print(l)

# l.insert(0, 11)

# print(l)

# print(__builtins__.__dict__)


print('-----------------Chapter 3-------------- ')

dial_codes = [
    (880, 'Bangladesh'),
    (55, 'Brazil'),
    (86, 'China'),
    (91, 'India'),
    (62, 'Indonesia'),
    (81, 'Japan'),
    (234, 'Nigeria'),
    (92, 'Pakistan'),
    (7, 'Russia'),
    (1, 'United States'),
]

# country_dial = {str(country).upper(): code for code, country in dial_codes}

# print(country_dial)

# print(help())




def get_creators(record: dict) -> list:
    match record:
        case {'type': 'book', 'api': 2, 'authors': [*names]}:
            return names
        case {'type': 'book', 'api': 1, 'author': name}:
            return [name]
        case {'type': 'book'}:
            return ValueError(f"invalid 'book' record: {record!r}")
        case _:
            return ValueError(f"Invalid record: {record!r}")


print(get_creators(dict(api=1, author='Darshan', type='book', title='Godel, Escher, Bach')))


from collections.abc import Mapping


count = 0 
l = []

# while(count<20):
#     l.append(count)
#     count += 1
    
# print(l)


d = {'key': False, 'key2': True, 'key3':'Value'}

# print(d.get('key', ''))

from collections import UserDict

# class TempDict(UserDict):
    
#     def __missing__(self, key, *args):
#         print('-=--')
#         print(self, key, args)
    
#     def __getitem__(self, key, *args):
        
#         print(self, key)
#         raise KeyError
        
# d = TempDict({'dkfjdf':33})

# # print(d.get('k', '383'))

# d = {(12, 1, *(1, 2)): 1}

# print(d)




# s1 = {1, 2, 3, 4, 5, 1}
# s2 = {4, 5, 6, 7, 8, 9, 6}

# print(s1)
# print(s2)

# print(s1 | s2)

# print(s1 & s2)

# print(s1 - s2)

# print(s1 ^ s2)

# print(s1.intersection(s2))


# from unicodedata import name

# def fun(x):
#     # print(x)
#     return x

# print({chr(i) for i in range(32, 256) if 'SIGN' in fun(name(chr(i), ''))})


 
# d = {'list': ([2, 3, 4],)}

# for i in d.values():
#     print(i)
 

 

# -----------------------_Chapter 4 ------------------------------------------


from array import array

# numbers = array('b', [-2, -1, 0, 1, 2])
# octets = bytes(numbers)
# print(len(octets))
# print(octets)


# print(str('El Niño').encode('utf_8'))
# print(str('El Niño').encode('utf_8').decode('utf_8'))
# # for i in str('El Niño').encode('utf_8'):
# #     print(i, bytes(i).decode('utf_8'))
# print('-'*60)

# num = array('h', [5600, -3232, -3, 0])
# octets = bytes(num)

# print(octets)
# print(len(octets))
# print(len(octets[0:1]))
# print(octets[0:3])
# print(octets.decode('utf_8'))



# file = open('cafe.txt', 'w', encoding='utf_8')
# file.write("café")
# file.close()

# file = open('cafe.txt').read()
# print(file)


# from unicodedata import normalize, combining

# text = "São Paulo"
# print(text)
# print(len(text))
# nfd = normalize('NFD', text)
# print(nfd)
# print(len(nfd))
# shaved = "".join(c for c in nfd if not combining(c))
# print(shaved)
# for i in nfd:
#     print(i)


# -------------------------- Chaper - 5 ---------------------------------



# from collections import namedtuple

# Coordinate = namedtuple('Coordinate', 'lat lon')
# print(Coordinate)

# coordinate1 = Coordinate(lat=12.54, lon=160.33)

# print(coordinate1)

# print(coordinate1==Coordinate(lat=12.54, lon=160.33))



# import typing

# Coordinate = typing.NamedTuple('Coordinate', [('lat', float), ('log', float)])
# print(Coordinate)
# print(typing.get_type_hints(Coordinate))


# kwargs = {'log': float}

# Coordinate = typing.NamedTuple('Coordinate', lat=float, **kwargs)
# print(Coordinate)
# print(typing.get_type_hints(Coordinate))


# from typing import NamedTuple

# class Coordinate(NamedTuple):
#     first_field: int
#     second_field: float
#     third_field: str
#     fourth_field: str = "Darshan"
    
    

# obj = Coordinate(first_field=12, second_field=3.14, third_field='pie')
# print(obj)

# # obj.first_field= 2
# # print(obj)


# from dataclasses import dataclass

# @dataclass
# class Coordinate:
#     first_field: int
#     second_field: float
#     third_field: str
#     fourth_field: str = "Darshan"


# obj = Coordinate(3, 3, 'df')
# print(obj)

# obj.first_field= 'Darshan'
# print(obj)

print('-------------- Chaper - 5 -------------------', '\n'*5)


# def fun(x):
#     x.append(11)
#     print(x)
    
# def fun2(x):
#     x = 20
#     print(x)
    
    
    
# a = [10, ]
# print(a)
# fun(a)
# print(a)

# b = 10
# print(b)
# fun2(b)
# print(b)


a = [1, 2, 3, 4, ['d,dkfd', 3], 'str']

print(a, end=', ')
del a
# print(a)

def fun():
    return 33

print(type(fun))

print(fun())

f = fun
print(f())

FUN = fun

print(FUN())

a = [0, 1,2 , 3, 4, 5, 6, 7, 8, 9, 10]

b = filter(lambda x: x%2==0 , a)

c = map(lambda x: x/2, list(b))

# all()

print(a)
print(b)
print(list(c))
print(id(a))
print(id(b))
print(id(c))

from enum import Enum

# class CarsType: 


def tag(name, *content, class_=None, **attrs):
    """Generate one or more HTML tags"""

    if class_ is not None:
        attrs['class'] = class_
    attr_pairs = (f' {attr}="{value}"' for attr, value in sorted(attrs.items()))
    attr_str = ''.join(attr_pairs)
    if content:
        elements = (f'<{name}{attr_str}>{c}</{name}>' for c in content)
        return '\n'.join(elements)
    else:
        return f'<{name}{attr_str} />'
    
    
    
    
print('-------------------Chapter - 8 ----------------------', '\n'*3)


from typing import Optional

def func(count: int, singular: str, plural: str = '', list_view: Optional[list] = None) -> tuple[int, str, tuple]:
    return '1' if count else '0'


func('str', 33)


from collections import abc


def double(x: abc.Sequence):
    return x * 2 * 'k'


# double('3')

from typing import Union, TypeVar

def parse_token(token: str, color_map: dict[str, int], later: object) -> Union[str, float]:
    """
    This is Token refreshin function. \n
    Return refresh token and access token.
    """
    try:
        return float(token)
    except ValueError:
        return token


# parse_token()


def func1(x: object = ... ) -> None:
    pass


func1()


from python_lab2 import registry

print(registry)


