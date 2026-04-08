No = int(input("Enter the number till what you want to print:- "))
a = 0
b = 1
c = 0
print(a)
print(b)
i=1
while i<No:
    c=a+b
    a=b
    b=c
    i=i+1
    print(c)