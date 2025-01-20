sequenceDiagram
    participant browser
    participant server

    Note right of browser: User writes a note in the text field and clicks the Save button

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/spa/new_note with JSON payload
    activate server
    server-->>browser: 201 Created (confirmation of note saved)
    deactivate server

    Note right of browser: The browser fetches updated notes to display them

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa/data.json
    activate server
    server-->>browser: Updated list of notes in JSON format
    deactivate server

    Note right of browser: The browser dynamically renders the updated notes without reloading the page
