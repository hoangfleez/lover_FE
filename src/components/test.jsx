import React, { useState } from 'react';

function App() {
  const [showInput, setShowInput] = useState(false);

  const handleClick = () => {
    setShowInput(true);
  };

  return (
    <div>
      <table>
        <tbody>
          <tr>
            {showInput ? (
              <td>
                <input type="text" />
              </td>
            ) : (
              <td>
                <button onClick={handleClick}>Button</button>
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;