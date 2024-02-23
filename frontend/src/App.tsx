import Providers from "./components/providers";
import Todo from "./components/todo";

function App() {
  return (
    <Providers>
      <div className="relative h-screen flex flex-col items-center justify-center dark:bg-slate-900">
        <Todo />
      </div>
    </Providers>
  );
}

export default App;
