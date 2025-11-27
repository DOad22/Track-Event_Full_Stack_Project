import "../src/App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

import EventCreator from "./components/event-creator/EventCreator";
import ScoreTracking from "./components/score-tracker/score";
import PastEvents from "./components/event-history/PastEvents";
import ParticipantTracker from "./components/participant-manager/ParticipantList";
import Footer from "./Footer/footer";

import { Score } from "./types";
import { useParticipantBridge } from "./hooks/useParticipantBridge";

import { SignIn, SignUp, UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";

function App() {
  const [scores, setScores] = useState<Score[]>([]);
  const [message, setMessage] = useState("Welcome to EventHub!");

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
        <header style={{ display: "flex", justifyContent: "space-between", padding: "1rem", alignItems: "center" }}>
          <h1>EventHub</h1>
          <div>
            <SignedOut>
              <a href="/sign-in" style={{ marginRight: "1rem" }}>Sign In</a>
              <a href="/sign-up">Sign Up</a>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>

        <SignedIn>
          <nav style={{ padding: "0.5rem 1rem", display: "flex", gap: "1rem", backgroundColor: "#f0f0f0" }}>
            <Link to="/">Home</Link>
            <Link to="/create">Create Event</Link>
            <Link to="/scores">Scores</Link>
            <Link to="/participants">Participants</Link>
            <Link to="/past">Past Events</Link>
          </nav>
        </SignedIn>

        <main style={{ padding: "1rem" }}>
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/" element={<h2>Welcome to EventHub!</h2>} />
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
            <Route path="/past" element={<PastEvents message={message} setMessage={setMessage} />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
