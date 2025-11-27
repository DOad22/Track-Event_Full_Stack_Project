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

import { SignIn, SignUp, UserButton, useUser } from "@clerk/clerk-react";

function App() {
  const [scores, setScores] = useState<Score[]>([]);
  const [message, setMessage] = useState("Welcome to EventHub Shared State!");

  const { participants, loading, error } = useParticipantBridge();
  const { isSignedIn, user } = useUser(); // Clerk hook to check login

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

        {/* Auth buttons */}
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "1rem" }}>
          {isSignedIn ? (
            <UserButton /> // Shows user info and Sign Out
          ) : (
            <>
              <a href="/sign-in" style={{ marginRight: "1rem" }}>Sign In</a>
              <a href="/sign-up">Sign Up</a>
            </>
          )}
        </div>

        <main>
          <Routes>
            {/* Public Auth Pages */}
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />

            {/* Home */}
            <Route path="/" element={<h2>Welcome to EventHub</h2>} />

            {/* Event Creator */}
            <Route path="/create" element={<EventCreator />} />

            {/* Score Tracking */}
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

            {/* Participant Manager */}
            <Route path="/participants" element={<ParticipantTracker />} />

            {/* Past Events */}
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
