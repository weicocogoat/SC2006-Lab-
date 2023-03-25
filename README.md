# SC2006-Lab-Software-Engineering

## How To Navigate
### Frontend
- How to access: MealMate > src > main > resources 
- Static folder: CSS, JS and image folders are stored here
- Templates folder: all the HTML files are stored here 
- Fragments: contain reusable parts of the code / templates used

### Backend
- How to access: MealMate > src > java/code/codecrafters/MealMate
- Config: Interfaces between frontend and backend files  
- Controller: Java code for all controllers
- enums: Java code for enum types
- Model: Java code for all entities
- repository: Connects to MongoDB
- services: Not in use at the moment

## How To Run
### Using IntelliJ
- Build Project (Build > Build Project)
- Run MealMateApplication.java and wait for the following messages to appear:
	- Tomcat started on port(s): 8080 (http) with context path ''
	- Started MealMateApplication in ... seconds (JVM running for ...)
- Open localhost:8080 on browser to open MealMate's web application