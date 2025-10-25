## Hook: useScores
1. What does this hook do?
-  The useScores hook manages all the logic for adding and retrieving scores in the ScoreTracker component. It provides two main functions - one for getting the current list of scores and another for adding new ones.

2. How did you decide what logic to include in that implementation, and how does that correctly separate solution concerns?
-  I put the logic in a hook so it can be reused in other components if needed. It keeps the main component cleaner since all the logic is handled here instead of inside the UI.

3. Where is this implementation made use of in the project and how?
-  It is used inside the ScoreTracker component. The component calls this hook to show and add scores.

## Service: scoreService
1. What does this service do?
-  The scoreService checks and validates score data before it’s saved. It prevents invalid or negative scores and creates properly structured score objects.

2. How did you decide what logic to include in that implementation, and how does that correctly separate solution concerns?
-  Validation rules belong to the business logic, not in the UI or data layer. By putting this rule in the service, it ensures consistent and clean data across all components.

3. Where is this implementation made use of in the project and how?
-  The scoreService is used in the useScores hook. When a new score is added, the hook calls this service to validate the points before saving it in the repository.

## Repository : scoreRepository

1. What does this repository do?
-  The scoreRepository handles data storage for scores. It can get all scores or add new ones to the list (using test data for now).

2. How did you decide what logic to include in that implementation, and how does that correctly separate solution concerns?
-  Repositories are for data access, so I included only data-handling functions here. This separates data storage from business logic and UI work.

3. Where is this implementation made use of in the project and how?
-  The repository is used by the scoreService and useScores hook. It provides and updates the score data that the component then displays.