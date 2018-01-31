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
    "group": "Entertainment",
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
    "groupTitle": "Entertainment"
  },
  {
    "type": "get",
    "url": "/quote",
    "title": "Quotes",
    "version": "1.0.0",
    "name": "Quotes",
    "group": "Entertainment",
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
    "groupTitle": "Entertainment"
  },
  {
    "type": "get",
    "url": "/tiger",
    "title": "Tigers",
    "version": "1.0.0",
    "name": "Tigers",
    "group": "Entertainment",
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
    "groupTitle": "Entertainment"
  },
  {
    "type": "get",
    "url": "/yomomma",
    "title": "Yomomma Jokes",
    "version": "1.0.0",
    "name": "Yomomma_Jokes",
    "group": "Entertainment",
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
    "groupTitle": "Entertainment"
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
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Authentication\": \"dQnKCHo9WRmk8V2xt+jDCC85LOo=\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>The response from the API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"data\": {\n        \"guilds\": 34,\n        \"channels\": 886,\n        \"voiceConnections\": 0,\n        \"users\": 5034\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>The error encountered.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "resolution",
            "description": "<p>The way to fix the error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"resolution\": \"Supply an 'Authentication' header with your API token, which can be found on your profile page.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/v1/stats"
      }
    ],
    "filename": "./app.js",
    "groupTitle": "TypicalBot"
  }
] });
