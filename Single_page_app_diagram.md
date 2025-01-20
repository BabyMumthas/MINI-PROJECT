sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document (Single Page App version)
    deactivate server

    Note right of browser: The browser starts loading the SPA, which includes JavaScript

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: The CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: The JavaScript file (includes SPA logic)
    deactivate server

    Note right of browser: The JavaScript executes and dynamically loads the content

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: JSON data for notes
    deactivate server

    Note right of browser: The browser renders the notes dynamically without reloading the page
