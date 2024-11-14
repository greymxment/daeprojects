def ask_question(question_text, correct_answer, points_for_correct, points_for_incorrect):
    """Asks a question and returns the points earned."""
    user_answer = input(question_text).strip()
    if user_answer.lower() == correct_answer.lower():  # Case insensitive check
        print(f"Correct! +{points_for_correct} pts")
        return points_for_correct
    else:
        print(f"Wrong! -{points_for_incorrect} pts")
        return -points_for_incorrect

# Main quiz function
def quiz_game():
    user_nickname = input("Hello user! What is your nickname? ")
    print(f"Hello, {user_nickname}, welcome to my quiz! You need 1500 points to win. "
          "Each correct answer grants you 150 points, and every wrong answer deducts 50 points. "
          "Bonus questions grant extra points but have greater penalties (this is very unserious).")

    # Initialize total points variable
    total_points = 0

    # List of quiz questions with their answers and point values
    quiz_questions = [
        ("What is the square root of 25? ", '5', 150, 50),
        ("Bonus question: What's 9 plus 10? ", '21', 250, 100),
        ("Bonus question: Spell red. (hint: beetlejuice) ", 'lster', 250, 75),
        ("Who you gonna call? ", 'ghostbusters', 150, 50),
        ("What is 8 times 8? ", '64', 150, 50),
        ("Bonus question: I am _____? ", 'steve', 250, 75),
        ("What is the square root of 144? ", '12', 150, 50),
        ("What is 9 x 9? ", '81', 150, 50),
        ("What was the former capital of Japan? ", 'kyoto', 150, 50),
        ("Does Kay have superpowers? ", 'yes', 150, 50),
        ("Bonus Question: Slang for 'Not genuine or true; false' ", 'bogus', 250, 75)
    ]

    # Loop through questions
    for question in quiz_questions:
        question_text, correct_answer, points_for_correct, points_for_incorrect = question
        total_points += ask_question(question_text, correct_answer, points_for_correct, points_for_incorrect)

    # Final score
    print("Total points:", total_points)

    if total_points >= 1500:
        print("YOU WIN! You got more than or equal to 1500 pts. Thanks for playing!")
    else:
        print("Aw shucks, you got less than the required amount of points. Try again.")

# Start the quiz game
quiz_game()