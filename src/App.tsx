import "../src/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import EventCreator from "./components/event-creator/EventCreator";
import ScoreTracking from "./components/score-tracker/score";
import PastEvents from "./components/event-history/PastEvents";
import ParticipantList from "./components/participant-manager/ParticipantList";
import Header from "./Header/header";
import Footer from "./Footer/footer";
import { Participant } from "./types";

function App() {
  const [participants, setParticipants] = useState<Participant[]>([]);

  const addParticipant = (name: string, game: string) => {
    const newParticipant = { id: Date.now(), name, game };
    setParticipants([...participants, newParticipant]);
  };

  const [message, setMessage] = useState("Welcome to EventHub Shared State!");

  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h2>Welcome to EventHub</h2>} />
            <Route path="/create" element={<EventCreator />} />
            <Route
              path="/scores"
              element={<ScoreTracking participants={participants} />}
            />
            <Route
              path="/participants"
              element={<ParticipantList participants={participants} addParticipant={addParticipant} />}
            />
            <Route
              path="/past"
              element={<PastEvents message={message} setMessage={setMessage} />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
