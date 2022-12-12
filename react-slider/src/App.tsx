import './App.css';
import Slider from './Slider/Slider';

const App: React.FC = () => {
  return (
    <div className="App">
      <Slider autoPlay={false} autoPlayTime={5} width="px" height="px" />
    </div>
  );
}

export default App;
