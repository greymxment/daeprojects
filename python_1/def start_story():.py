name=input("hello user! what is your nickname?")

print("Hello,", name,", welcome to my quiz. you need 1500 points to win, each correct answer grants you 150 and every wrong answer takes away 50, some questions will grant you extra points (this is very unserious)")

# start of quiz

# Initialize points variable
points = 0

# Question 1
print("What is the square root of 25?")
answer = input("Write your answer: ")
if answer == '5':
    print("Correct! +150 pts")
    points += 150  # Add points
else: 
    print("Wrong! -50 pts")
    points -= 50  # Subtract points

# Question 2
print("What's 9 plus 10?")
answer = input("Write your answer: ")
if answer == '21':
    print("Correct! Bonus 100 +250 pts")
    points += 250
else: 
    print("Wrong! -50 pts")
    points -= 50

# Question 3
print("Spell red. (hint: beetlejuice)")
answer = input("Write your answer: ")
if answer == 'lster' or 'LSTER':
    print("Correct! Bonus 100 +250 pts")
    points += 250
else: 
    print("Wrong! -50 pts")
    points -= 50

# Question 4
print("Who you gonna call?")
answer = input("Write your answer: ")
if answer.lower() == 'ghostbusters' or 'Ghostbusters':  # Case insensitive
    print("Correct! Bonus 50 +200 pts")
    points += 200
else: 
    print("Wrong! -50 pts")
    points -= 50

# Question 5
print("What is 8 times 8?")
answer = input("Write your answer: ")
if answer == '64':
    print("Correct! +150 pts")
    points += 150
else: 
    print("Wrong! -50 pts")
    points -= 50

# Question 6
print("I am _____?")
answer = input("Write your answer: ")
if answer.lower() == 'steve' or 'Steve':  # Case insensitive
    print("Correct! Bonus 100 +250 pts")
    points += 250
else: 
    print("Wrong! -50 pts")
    points -= 50

# Question 7
print("What is the square root of 144?")
answer = input("Write your answer: ")
if answer == '12':
    print("Correct! +150 pts")
    points += 150
else: 
    print("Wrong! -50 pts")
    points -= 50

print("9 x 9")
answer = input("Write your answer: ")
if answer == '81':
    print("Correct! +150 pts")
    points += 150
else: 
    print("Wrong! -50 pts")
    points -= 50

print("What was the former capitolo of Japan?")
answer = input("Write your answer: ")
if answer == 'kyoto' or 'Kyoto':
    print("Correct! +150 pts")
    points += 150
else: 
    print("Wrong! -50 pts")
    points -= 50

print("Does Kay have superpowers?")
answer = input("Write your answer: ")
if answer == 'true' or 'yes':
    print("Correct! bonus 100 +250 pts")
    points += 250
else: 
    print("Wrong! -50 pts")
    points -= 50

print("slang for 'Not genuine or true; false'")
answer = input("Write your answer: ")
if answer == 'bogus' or 'Bogus':
    print("Correct! bonus 100 +250 pts")
    points += 250
else: 
    print("Wrong! -50 pts")
    points -= 50

# Final score
print("Total points:", points)
''' 
if points > 10:
    print()
else:
    

'''




