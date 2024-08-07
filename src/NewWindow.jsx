import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

function NewWindow({ children, onClose }) {
    const newWindowRef = useRef(null);
    const [container, setContainer] = useState(null);

    useEffect(() => {
        // Check if the new window exists, if not, create it
        if (!newWindowRef.current || newWindowRef.current.closed) {
            newWindowRef.current = window.open('', '', 'width=600,height=400');
        }

        // Ensure the window is still available
        if (!newWindowRef.current) {
            return;
        }

        // Create a container div for the React component if not already created
        // Check if the container div already exists
        let containerDiv = newWindowRef.current.document.getElementById('root');
        if (!containerDiv) {
            containerDiv = newWindowRef.current.document.createElement('div');
            containerDiv.setAttribute('id', 'root');
            newWindowRef.current.document.body.appendChild(containerDiv);
        }
        setContainer(containerDiv);

        // Add event listener to clean up on close
        newWindowRef.current.addEventListener('beforeunload', onClose);

        // Cleanup function
        return () => {
            newWindowRef.current.removeEventListener('beforeunload', onClose);
            // Do not close the window here to keep it open for future updates
        };
    }, [container, onClose]);

    // Render the children into the new window's container
    return container ? ReactDOM.createPortal(children, container) : null;
}

export default NewWindow;
