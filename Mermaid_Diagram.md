sequenceDiagram
    participant browser
    participant server

    Note right of browser: User writes a note in the text field and clicks the Save button

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note with JSON payload
    activate server
    server-->>browser: 201 Created (confirmation of note saved)
    deactivate server

    Note right of browser: The browser fetches updated notes to display them

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: Updated list of notes in JSON format
    deactivate server

    Note right of browser: The browser executes the callback function to re-render the notes on the page
