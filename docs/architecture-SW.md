# Hook: usePastEvents
# What:
# - The usePastEvents hook handles all the front-end logic for the Past Events feature.
# - It manages adding new events, removing existing ones, and updating the search filter.
# - The hook calls functions from the eventService to read and modify event data.
# - It also controls the form input states, so when users type or add new data, the page updates in real time.
#
# Why this logic here:
# - Hooks are meant for presentation logic and state management.
# - By putting this logic in a hook, the PastEvents.tsx component stays clean and focused only on displaying data.
# - It separates UI concerns from business logic and data handling.
#
# Where used:
# - This hook is used inside the PastEvents.tsx component located in src/components/event-history/.
# - It provides the component with all event data and functions for adding, removing, and searching.

# Service: eventService
# What:
# - The eventService file manages all the business rules related to events.
# - It checks event inputs, sorts them by date, and ensures that data passed to the hook is in the correct format.
# - It communicates with the eventRepository to access or update event data.
#
# Why:
# - The service layer is where business logic belongs.
# - It keeps the logic for adding, removing, and sorting events separate from both the UI and data storage.
# - This makes the application more organized and easier to debug later.
#
# Where used:
# - The eventService is used by the usePastEvents hook.
# - Whenever the hook needs to read or update event data, it calls the service functions.

# Repository: eventRepository
# What:
# - The eventRepository is the data layer that handles CRUD (Create, Read, Update, Delete) operations.
# - It connects directly to the test data array (pastEvents.testdata.ts).
# - This is where data is read, saved, or modified before being sent to the service layer.
#
# Why:
# - The repository is meant only for data access.
# - It helps simulate how the app will connect to a real backend or database later.
# - By keeping data logic here, the service and hook do not need to worry about how the data is stored.
#
# Where used:
# - The eventRepository is used by the eventService to get and update event data.

# Test Data: pastEvents.testdata.ts
# What:
# - This file includes 10 sample EventItem objects stored in an array.
# - Each event object has an id, name, and date property.
# - It acts as a simple in-memory database for testing.
#
# Why:
# - This file satisfies the Sprint 3 requirement for test data.
# - It lets us test the entire system without connecting to a backend yet.
# - Later, this file can be replaced with a real API or database connection, but the structure will remain the same.
#
# Where used:
# - The test data is imported by eventRepository.ts for all CRUD operations.

# Type Definition: EventItem
# What:
# - The EventItem type defines the structure of an event.
# - It includes:
#   id: number
#   name: string
#   date: string
# - This makes sure that all event data is consistent throughout the code.
#
# Why:
# - TypeScript helps prevent data-related bugs by enforcing strict data types.
# - This makes it easier to find mistakes during development and ensures smooth data flow between files.
#
# Where used:
# - The EventItem type is imported and used in eventRepository.ts, eventService.ts, and usePastEvents.ts.

# Summary of Architecture
# - Repository (eventRepository.ts): Handles all data access and CRUD operations using test data.
# - Service (eventService.ts): Applies business rules, validates data, and sorts or filters events.
# - Hook (usePastEvents.ts): Manages UI logic, form states, and connects the UI to business logic.
# - Component (PastEvents.tsx): Displays the data and allows the user to add, remove, and search events.