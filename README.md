# ASCII File Structure to ZIP Web App

## Description
This web app allows users to input an ASCII file structure and generate a downloadable zip file containing the declared files and directories. Users can also specify file contents using JSON.

## Features
- Parse ASCII file structure
- Generate a zip file with the declared files and directories
- Insert file contents from JSON input
- Containerized using Docker
- Deployed on AWS ECS

## Usage

### Run Locally
1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the server:
    ```bash
    node server.js
    ```

4. Open `index.html` in your browser.

### Docker
1. Build the Docker image:
    ```bash
    docker build -t ascii-file-structure .
    ```

2. Run the Docker container:
    ```bash
    docker run -p 3000:3000 ascii-file-structure
    ```

### Test Endpoint
To validate the application, use the `/test` endpoint which uses the `test_input.json` file:

1. Run the test script:
    ```bash
    node test_script.js
    ```

This script will call the `/test` endpoint, generate the zip file based on the test input, and download it as `file_structure_test.zip`.

### Deploy on AWS ECS
1. Create an ECR repository and push the Docker image.
2. Create an ECS cluster and define a task using the Docker image.
3. Run the task on ECS and ensure the necessary IAM roles and security groups are set up.

## Example JSON Input
```json
{
    "structure": {
        "src": {
            "main.ts": "console.log('Hello, world!');",
            "modules": {
                "chatInterface.ts": "// Chat Interface Module",
                "conversationManager.ts": "// Conversation Manager Module",
                "messageLogger.ts": "// Message Logger Module",
                "uiElements.ts": "// UI Elements Module",
                "utils.ts": "// Utility Functions Module"
            },
            "styles": {
                "styles.css": "body { background-color: #f0f0f0; }"
            }
        }
    }
}
