import { Suspense } from 'react';
import DragDrop from "./DragDrop";

import "./app.css";

function App() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='center'>
        <DragDrop />
      </div>
    </Suspense>
  );
}

export default App
