## Architecture Layout Document
Name: Daljeet Kaur(DK)
Project: Event Management App

## Hook: useEvents
1. What does this hook do?
- The useEvents hook is used to manage all event data in the app.
- It keeps track of the event list, lets users add new events, and delete old ones.
- It uses React’s useState and useEffect to handle this data easily.

2. How did you decide what logic to include, and how does it separate concerns?
- I put all the event logic inside this hook to keep the code organized.
- The hook deals with how data works, while the component only shows the data on the screen.


3. Where is this used and how?
- The useEvents hook is used in the EventApp.tsx file.
- It is imported and used like this:

const { events, addEvent, deleteEvent } = useEvents();

- events shows the list of events
- addEvent() adds a new event
- deleteEvent() removes an event

This keeps the main component simple and clean.

## Repository: eventRepository
1. What does this repository do?
- The eventRepository stores all the event data and provides functions to get, add, or delete events.
- It keeps the data in one place so it’s easier to manage.

2. How did you decide what logic to include, and how does it separate concerns?
- I added only data-related code here, like adding and removing events.
- This keeps data handling separate from the UI and logic, making the project more organized.

3. Where is this used and how?
- The eventRepository is used by the useEvents hook through the event service.
- When we add or delete an event, the hook calls the repository to update the data.

## Service: eventService
1. What does this service do?
- The eventService connects the hook and the repository.
- It handles getting, adding, and deleting events by calling the repository and returning updated data.

2. How did you decide what logic to include, and how does it separate concerns?
- I added only the logic that deals with passing data between the hook and repository.
- This keeps data handling and UI code separate and easy to manage.

3. Where is this used and how?
- The eventService is used inside the useEvents hook.
- When we add or delete an event, the hook calls the service, and the service updates the data through the repository.