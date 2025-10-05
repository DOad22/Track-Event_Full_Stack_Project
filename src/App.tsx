import "../src/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventCreator from "./components/event-creator/EventCreator";
import ScoreTracking from "./components/score-tracker/score";
import PastEvents from "./components/event-history/PastEvents";
import ParticipantList from "./components/participant-manager/ParticipantList";
import Header from "./Header/header";
import Footer from "./Footer/footer";
import { useState } from "react";

function App() {
  const [participants, setParticipants] = useState< { id: number; name: string; game: string }[]>([]);

  const [scores, setScores] = useState<{ participantId: number; points: number }[]>([]);

  const addParticipant = (name: string, game: string) => {
    setParticipants([
      ...participants,
      { id: Date.now(), name, game },
    ]);
  };

  const addScore = (participantId: number, points: number) => {
    setScores([...scores, { participantId, points }]);
  };

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
              element={
                <ScoreTracking
                  participants={participants}
                  scores={scores}
                  addScore={addScore}
                />
              }
            />
            <Route
              path="/participants"
              element={
                <ParticipantList
                  participants={participants}
                  addParticipant={addParticipant}
                />
              }
            />
            <Route path="/past" element={<PastEvents />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
