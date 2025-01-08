import './App.css'
import { LoadingButton } from './components/LoadingButton';

function App() {
  const handleClick = async () => {
    // 模拟异步操作
    await new Promise(resolve => setTimeout(resolve, 50000));
  };

  return (
    <div className="app">
      <LoadingButton onClick={handleClick} />
    </div>
  )
}

export default App
