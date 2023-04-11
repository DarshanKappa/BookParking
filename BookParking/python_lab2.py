

registry = []

def decorator(func):
    print('running decorator')
    print(func.__name__)
    registry.append((func, func.__name__))
    
    def wrapper(*args, **kwargs):
        print('running wrapper')
        return func(*args, **kwargs)
    
    return wrapper

@decorator
def fun1():
    print('running function 1')
    
    
    
if __name__ == '__main__':
    print('running main')
    print(registry)

    # fun1()
    
    
def make_averager():
    series = []
    
    def averager(new_value):
        series.append(new_value)
        total = sum(series)
        return total/len(series)

    return averager

ave = make_averager()

print(ave(10))
print(ave(5))
print(ave(80))
print(ave(35))
print(ave(13))
print(ave(1))

print(ave.__code__.co_freevars)
print(ave.__code__.co_varnames)
print(ave.__closure__[0].cell_contents)