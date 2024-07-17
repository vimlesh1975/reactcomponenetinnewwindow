import React, { useState } from 'react';
import NewWindow from './NewWindow';

const SecondComponent = React.memo(({ dd }) => {
  return <div>{dd} This is the second component displayed in a new window</div>;
});

const App = () => {
  const [showNewWindow, setShowNewWindow] = useState(false);
  const [aa, setAa] = useState(10);

  const handleOpenNewWindow = () => {
    setShowNewWindow(true);
  };

  const handleCloseNewWindow = () => {
    setShowNewWindow(false);
  };

  const handleSetAa = () => {
    setAa(prevAa => prevAa + 1);
  };

  return (
    <div>
      <button onClick={handleOpenNewWindow}>Open New Window</button>
      <button onClick={handleSetAa}>setAa</button>
      <SecondComponent dd={aa} />
      {showNewWindow && (
        <NewWindow onClose={handleCloseNewWindow}>
          <SecondComponent dd={aa} />
        </NewWindow>
      )}
    </div>
  );
};

export default App;
