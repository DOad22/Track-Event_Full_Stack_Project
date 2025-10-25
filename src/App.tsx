import "../src/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import EventCreator from "./components/event-creator/EventCreator";
import ScoreTracking from "./components/score-tracker/score";
import PastEvents from "./components/event-history/PastEvents";
import ParticipantTracker from "./components/participant-manager/ParticipantList";
import Header from "./Header/header";
import Footer from "./Footer/footer";
import { Score } from "./types";
import { useParticipantBridge } from "./hooks/useParticipantBridge";

function App() {
  const [scores, setScores] = useState<Score[]>([]);
  const [message, setMessage] = useState("Welcome to EventHub Shared State!");

  const { participants, loading, error } = useParticipantBridge();

  const addScore = (participantId: number, points: number) => {
    setScores([
      ...scores,
      {
        id: Date.now(), 
        participantId,
        points,
      },
    ]);
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
                loading ? (
                  <p>Loading participants...</p>
                ) : error ? (
                  <p>Error loading participants</p>
                ) : (
                  <ScoreTracking participants={participants} />

                )
              }
            />

            <Route path="/participants" element={<ParticipantTracker />} />

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
