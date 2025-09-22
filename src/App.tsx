import '../src/App.css'
import ScoreTracking from "./components/score-tracker/score"
function App() {

return (
    <div className="app">
      <header className="app-header">
        <h1>Game tracking </h1>
      </header>
      <main>

        <ScoreTracking />
      </main>
      <footer className="app-footer">
        <p>
          Created by: Daljeet Kaur, Sukhtab Singh Warya, Prabhjot Singh, Arshnoorpreet Kaur
        </p>
      </footer>
    </div>
  );
}

export default App
