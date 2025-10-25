## Hook: useParticipants

1. What does this hook do?

- It loads participants, filters them by game, adds, confirms, declines, and removes participants. It also handles loading and error states for smooth UI updates.

2. How did you decide what logic to include in that implementation, and how does that correctly separate solution concerns?

- The hook focuses on UI-related logic only - managing React state and calling the service layer. This keeps the UI clean and separates data handling from display.

3. Where is this implementation made use of in the project and how?

- useParticipants is used inside the ParticipantList page. The component imports the hook and calls its functions to show, add, or update participants on the screen.

## Service: ParticipantService

1. What does this service do?

- The service acts as a middle layer between the hook and repository. It holds main business logic — like confirming or declining a participant’s status and uses the repository to fetch or update data.

2. How did you decide what logic to include in that implementation, and how does that correctly separate solution concerns?

- The service helps separate what to do from how data is stored. It prevents the hook from directly managing data or filtering logic and makes the code easier to test and change later.

3. Where is this implementation made use of in the project and how?

- The service is used inside useParticipants.ts. Every time a participant is added, updated, or deleted, the hook calls the corresponding service function.

## Repository: ParticipantRepository

1. What does this repository do?

- The repository simulates a data source. It holds all participant test data and provides methods to get, add, update, or delete participants.

2. How did you decide what logic to include in that implementation, and how does that correctly separate solution concerns?

- This separates data storage and retrieval from the logic layer. If a real database or API is added later, only this file needs to change, no change in service or hook.

3. Where is this implementation made use of in the project and how?

- The repository is used inside the ParticipantService. The service calls its functions like getAllParticipants() or addParticipant() to fetch or modify data.
