define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./content/static/api/main.js",
    "group": "C__Users_BryanPikaard_Desktop_Code_JavaScript_TypicalBot_typicalbot_dashboard_content_static_api_main_js",
    "groupTitle": "C__Users_BryanPikaard_Desktop_Code_JavaScript_TypicalBot_typicalbot_dashboard_content_static_api_main_js",
    "name": ""
  },
  {
    "type": "get",
    "url": "/joke",
    "title": "Jokes",
    "version": "1.0.0",
    "name": "Jokes",
    "group": "TypicalBot",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authentication",
            "description": "<p>TypicalBot API token.</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/api/v1/joke"
      }
    ],
    "filename": "./app.js",
    "groupTitle": "TypicalBot"
  },
  {
    "type": "get",
    "url": "/quote",
    "title": "Quotes",
    "version": "1.0.0",
    "name": "Quotes",
    "group": "TypicalBot",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authentication",
            "description": "<p>TypicalBot API token.</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/api/v1/quote"
      }
    ],
    "filename": "./app.js",
    "groupTitle": "TypicalBot"
  },
  {
    "type": "get",
    "url": "/stats",
    "title": "Statistics",
    "version": "1.0.0",
    "name": "Statistics",
    "group": "TypicalBot",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authentication",
            "description": "<p>TypicalBot API token.</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/api/v1/stats"
      }
    ],
    "filename": "./app.js",
    "groupTitle": "TypicalBot"
  },
  {
    "type": "get",
    "url": "/tiger",
    "title": "Tigers",
    "version": "1.0.0",
    "name": "Tigers",
    "group": "TypicalBot",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authentication",
            "description": "<p>TypicalBot API token.</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/api/v1/tiger"
      }
    ],
    "filename": "./app.js",
    "groupTitle": "TypicalBot"
  },
  {
    "type": "get",
    "url": "/yomomma",
    "title": "Yomomma Jokes",
    "version": "1.0.0",
    "name": "Yomomma_Jokes",
    "group": "TypicalBot",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authentication",
            "description": "<p>TypicalBot API token.</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/api/v1/yomomma"
      }
    ],
    "filename": "./app.js",
    "groupTitle": "TypicalBot"
  }
] });
