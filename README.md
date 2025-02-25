# Concise Logging
An advanced yet easy-to-use logging library.

## Features
- Colorful Logging: Different colors for TRACE, DEBUG, INFO, WARN, ERROR, and FATAL messages.  
- Custom Time Format: Pick 12-hour or 24-hour time, with optional Unix time.  
- Extra Tags: Add custom tags to make log messages clearer.  
- Multiple Methods: Log using TRACE, DEBUG, INFO, WARN, ERROR, and FATAL.  

## Installation
### Node.js  
Install via npm:
```
npm install concise-logging
```

### Python  
Install via pip:
```
pip install concise-logging
```

## Usage Examples
### Node.js Example
```js
const ConciseLogger = require('concise-logging');

const logger = new ConciseLogger({ time_format: 24, unix: true });

logger.trace("SYSTEM", "INIT", "This is a trace message.");
logger.debug("DATABASE", "Debugging database connection.");
logger.info("SERVER", "Server started successfully.");
logger.warn("MEMORY", "Memory usage is high!");
logger.error("API", "TIMEOUT", "Failed to fetch data from API.");
logger.fatal("CRASH", "Application crashed unexpectedly.");
```

### Python Example
```python
from ConciseLogging import ConciseLogger

logger = ConciseLogger(time_format=24, unix=True)

logger.trace("SYSTEM", "INIT", message="This is a trace message.")
logger.debug("DATABASE", message="Debugging database connection.")
logger.info("SERVER", message="Server started successfully.")
logger.warn("MEMORY", message="Memory usage is high!")
logger.error("API", "TIMEOUT", message="Failed to fetch data from API.")
logger.fatal("CRASH", message="Application crashed unexpectedly.")
```

## Log Output Example
```
[25/02/2025 14:35:22 1677332122] [TRACE] [SYSTEM] [INIT] This is a trace message.
[25/02/2025 14:35:23 1677332123] [DEBUG] [DATABASE] Debugging database connection.
[25/02/2025 14:35:24 1677332124] [INFO] [SERVER] Server started successfully.
[25/02/2025 14:35:25 1677332125] [WARN] [MEMORY] Memory usage is high!
[25/02/2025 14:35:26 1677332126] [ERROR] [API] [TIMEOUT] Failed to fetch data from API.
[25/02/2025 14:35:27 1677332127] [FATAL] [CRASH] Application crashed unexpectedly.
```

## Configuration Options
| Parameter     | Description                                 | Default |
|---------------|---------------------------------------------|---------|
| `time_format` | Time display format (`12` or `24` hours)     | `24`    |
| `unix`        | Append Unix timestamp (`True` or `False`)    | `False` |

## License
This project is licensed under the [MIT License](https://rusky.is-a.dev/cdn/licenses/MIT.txt).

## Author
Made with ♥ by [Ayaan](https://rusky.is-a.dev?ref=npmjs)

