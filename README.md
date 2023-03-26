# SC2006-Lab-Software-Engineering

## How To Run
#### Using IntelliJ
- Build Project (Build > Build Project)
- Run MealMateApplication.java
- Open localhost:8080 on browser

## Frontend
- Download the frontend file
- u can run each html page individually
- Basic template done 

## Backend
Note: Need to run the application to test the following

### Testing of API Routes in Postman

#### [GET] Get All Recipes - http://localhost:8080/recipes/all

Example of request body (in raw, JSON format):

`{
    "title": "Recipe 2",
    "author": "Jane Doe",
    "description": "This is my recipe 2.",
    "dateCreated": "2023-03-18T00:00:00",
    "numOfBookmarks": 0,
    "preparationTime": "1 Hour",
    "portions": 2,
    "calories": 300,
    "ingredients": [],
    "steps": "Step 1: Cook",
    "dietType": "",
    "mealType": "Lunch"
}`