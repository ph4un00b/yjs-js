import './style.css';

import Quill from 'quill';
import QuillCursors from 'quill-cursors';

Quill.register('modules/cursors', QuillCursors);

const quill = new Quill(document.querySelector('#editor')!, {
  modules: {
    cursors: true,
    toolbar: [	
      // adding some basic Quill content features
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['image', 'code-block'],
    ],
    history: {
      // Local undo shouldn't undo changes
      // from remote users
      userOnly: true,
    },
  },
  placeholder: 'Start collaborating...',
  theme: 'snow', // 'bubble' is also great
});

import * as Y from 'yjs';
import { QuillBinding } from 'y-quill';

// A Yjs document holds the shared data
const ydoc = new Y.Doc();
// Define a shared text type on the document
const ytext = ydoc.getText('jamon');

// Create an editor-binding which
// "binds" the quill editor to a Y.Text type.
const binding = new QuillBinding(ytext, quill);
console.log({ binding });

import { WebsocketProvider } from 'y-websocket';
console.log({"env": import.meta.env});
const wsProvider = new WebsocketProvider(import.meta.env.VITE_WS_URL, '', ydoc);

wsProvider.on('status', (event: { status: any }) => {
  console.log(event.status); // logs "connected" or "disconnected"
});
