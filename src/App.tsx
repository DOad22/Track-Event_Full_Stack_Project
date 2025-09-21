import "./App.css";
import ParticipantList from "./components/participant-manager/ParticipantList";

function App() {
  return (
    <div className="participant-list">
      <header>
        <h1>EventHub</h1>
      </header>

      <main>
        <ParticipantList />
      </main>

      <footer>
        <p>Team Members: Daljeet Kaur,Sukhtab Singh Warya, Prabhjot Singh, Arshnoorpreet Kaur</p>
      </footer>
    </div>
  );
}

export default App;
