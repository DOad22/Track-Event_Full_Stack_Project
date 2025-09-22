import '../src/App.css'
import EventCreator from './components/event-creator/EventCreator';
import ScoreTracking from "./components/score-tracker/score";
import PastEvents from "./components/event-history/PastEvents";
import ParticipantList from "./components/participant-manager/ParticipantList";
function App() {

return (
    <div className="app">
      <header className="app-header">
        <h1>Game tracking </h1>
      </header>
      <main>
        <EventCreator/>
        <ScoreTracking />
        <ParticipantList />
        <PastEvents/>
      </main>
      <footer className="app-footer">
        <p>
          Created by: Daljeet Kaur, Sukhtab Singh Warya, Prabhjot Singh, Arshnoorpreet Kaur
        </p>
      </footer>
    </div>
  );
}

export default App;
