import "../src/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 import EventCreator from "./components/event-creator/EventCreator";
import ScoreTracking from "./components/score-tracker/score";
import PastEvents from "./components/event-history/PastEvents";
import ParticipantList from "./components/participant-manager/ParticipantList";
import Header from "./Header/header";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h2>Welcome to EventHub</h2>} />
            <Route path="/create" element={<EventCreator />} />
            <Route path="/scores" element={<ScoreTracking />} />
            <Route path="/participants" element={<ParticipantList />} />
            <Route path="/past" element={<PastEvents />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}
 
export default App;