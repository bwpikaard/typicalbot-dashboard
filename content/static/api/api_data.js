define({ "api": [
  {
    "type": "get",
    "url": "/v1/joke",
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
            "field": "Authorization",
            "description": "<p>TypicalBot API token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Authorization\": \"dQnKCHo9WRmk8V2xt+jDCC85LOo=\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>The response from the API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"data\": \"\\\"This is a joke. T'was it a funny one?\\\"\"\n}",
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
          "content": "HTTP/1.1 403 Unauthorized\n{\n    \"message\": \"Unauthorized\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/v1/joke"
      }
    ],
    "filename": "./api/joke.js",
    "groupTitle": "Entertainment"
  },
  {
    "type": "get",
    "url": "/v1/quote",
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
            "field": "Authorization",
            "description": "<p>TypicalBot API token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Authorization\": \"dQnKCHo9WRmk8V2xt+jDCC85LOo=\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>The response from the API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"data\": \"\\\"Don't do that!\\\"\"\n}",
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
          "content": "HTTP/1.1 403 Unauthorized\n{\n    \"message\": \"Unauthorized\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/v1/quote"
      }
    ],
    "filename": "./api/quote.js",
    "groupTitle": "Entertainment"
  },
  {
    "type": "get",
    "url": "/v1/tigr",
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
            "field": "Authorization",
            "description": "<p>TypicalBot API token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Authorization\": \"dQnKCHo9WRmk8V2xt+jDCC85LOo=\"\n}",
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
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.type",
            "description": "<p>The type of the data given.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data.data",
            "description": "<p>The Bufer array.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"data\": {\n        \"type\": \"Buffer\",\n        \"data\": [ . . . ]\n    }\n}",
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
          "content": "HTTP/1.1 403 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/v1/tiger"
      }
    ],
    "filename": "./api/tiger.js",
    "groupTitle": "Entertainment"
  },
  {
    "type": "get",
    "url": "/v1/yomomma",
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
            "field": "Authorization",
            "description": "<p>TypicalBot API token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Authorization\": \"dQnKCHo9WRmk8V2xt+jDCC85LOo=\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>The response from the API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"data\": \"\\\"Yo mama so fat she crushed the couch.\\\"\"\n}",
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
          "content": "HTTP/1.1 403 Unauthorized\n{\n    \"message\": \"Unauthorized\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/v1/yomomma"
      }
    ],
    "filename": "./api/yomomma.js",
    "groupTitle": "Entertainment"
  },
  {
    "type": "get",
    "url": "/v1/stats",
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
            "field": "Authorization",
            "description": "<p>TypicalBot API token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Authorization\": \"dQnKCHo9WRmk8V2xt+jDCC85LOo=\"\n}",
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
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.guilds",
            "description": "<p>The total number of gulds the bot is in.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.channels",
            "description": "<p>The total number of channels the bot is in.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.voiceConnections",
            "description": "<p>The total number of voice connections the bot is in.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.users",
            "description": "<p>The total number of users the bot can see.</p>"
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
          "content": "HTTP/1.1 403 Unauthorized\n{\n    \"message\": \"Unauthorized\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/v1/stats"
      }
    ],
    "filename": "./api/stats.js",
    "groupTitle": "TypicalBot"
  }
] });
