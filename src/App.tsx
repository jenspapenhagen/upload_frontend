import { Suspense } from 'react';
import DragDrop from "./DragDrop";

function App() {

  return(
    <Suspense fallback={<div>Loading...</div>}>
      <DragDrop />
    </Suspense>
  );
}

export default App
