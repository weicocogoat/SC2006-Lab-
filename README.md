# SC2006-Lab-Software-Engineering

## How To Navigate
### Frontend
- How to access: MealMate > src > main > resources 
- Subfolders:
	- Static: CSS, JS and image folders are stored here
	- Files: Contains JSON files for supermarkets
	- Templates: Contains HTML files for views
		- Fragments: Contains reusable code of the web application (i.e. Navigation Bar, Common Scripts and Stylesheets)

### Backend
- How to access: MealMate > src > java/code/codecrafters/MealMate
- Subfolders:
	- config: Interfaces between frontend and backend files
	- controller: Java code for all controllers
	- dto: Data Transfer Object Classes
	- enums: Java code for enum types
	- model: Java code for all entities
	- repository: Connects to MongoDB
	- security: Component and Configuration classes
	- services: Service classes for Email and User (for Authentication)

## How To Run
### Using IntelliJ (Recommended)
- Build Project (Build > Build Project)
- Run MealMateApplication.java and wait for the following messages to appear:
	- Tomcat started on port(s): 8080 (http) with context path ''
	- Started MealMateApplication in ... seconds (JVM running for ...)
- Open http://localhost:8080 on browser to open MealMate's web application

## API Routes
### AuthController

#### [POST] Authenticate User (Login) - http://localhost:8080/api/auth/login
Parameters/Body: LoginDTO

#### [POST] Regiser User - http://localhost:8080/api/auth/register
Parameters/Body: SignUpDTO

### FeedbackController

#### [POST] Send Feedback - http://localhost:8080/feedback
Parameters/Body: Feedback Object

### MealController

#### [GET] Retrieve All Meals - http://localhost:8080/api/meal/all
Parameters/Body: -


#### [GET] Retreieve Meal by ID - http://localhost:8080/api/meal/find/{id}
Parameters/Body: MealId


#### [GET] Retrieve Meals by User - http://localhost:8080/api/meal/user/{id}
Parameters/Body: UserId


#### [POST] Retrieve Meals by User ID and Date - http://localhost:8080/api/meal/find/mealDate
Paramaters/Body: MealDateDTO (contains UserId and MealDate)


#### [POST] Save Meal - http://localhost:8080/api/meal/save
Paramaters/Body: Meal Object


#### [DELETE] Delete Meal - http://localhost:8080/api/meal/delete
Paramaters/Body: MealId



### RecipeController

#### [GET] Retrieve All Recipes - http://localhost:8080/api/recipes/all
Paramaters/Body: -


#### [GET] Retrieve Recipe by ID - http://localhost:8080/api/recipes/find/{id}
Paramaters/Body: RecipeId


#### [GET] Retrieve All Recipes Sorted by Bookmarks (Descending) - http://localhost:8080/api/recipes/all/sort/bookmarks
Paramaters/Body: -


#### [GET] Retrieve Recipes by User ID - http://localhost:8080/api/recipes/user/{id}
Paramaters/Body: UserId


#### [POST] Create Recipe - http://localhost:8080/api/recipes/create
Paramaters/Body: Recipe Object


#### [POST] Update Recipe - http://localhost:8080/api/recipes/update
Paramaters/Body: Recipe Object


#### [DELETE] Delete Recipe - http://localhost:8080/api/recipes/delete/{id}
Paramaters/Body: RecipeId


### UserController

#### [GET] Get User by ID - http://localhost:8080/api/users/{id}
Paramaters/Body: UserId


#### [POST] Update User Details - http://localhost:8080/api/users/save/{id}
Paramaters/Body: User Oject


#### [GET] Get User Recipe Bookmarks - http://localhost:8080/api/users/{id}/bookmarks
Paramaters/Body: UserId


#### [GET] Check if User Bookmarked Specific Recipe - http://localhost:8080/api/users/{id}/bookmarks/{recipeId}
Paramaters/Body: UserId and RecipeId


#### [POST] Add Bookmark - http://localhost:8080/api/users/{id}/bookmarks/add/{recipeId}
Paramaters/Body: UserId and RecipeId


#### [POST] Remove Bookmark - http://localhost:8080/api/users/{id}/bookmarks/remove/{recipeId}
Paramaters/Body: UserId and RecipeId
