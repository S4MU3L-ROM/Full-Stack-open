## 0.6:  New note in Single page app diagram
```mermaid
sequenceDiagram
participant browser
participant server

    Note right of browser: The user writes a note in the text field and clicks Save
    Note right of browser: JavaScript intercepts the form submission
    Note right of browser: The browser updates the notes list on the page

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of server: The server saves the new note
    server-->>browser: 201 Created {"message":"note created"}
    deactivate server

    Note right of browser: The browser stays on the same page and does not reload
```
