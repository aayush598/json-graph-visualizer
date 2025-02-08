export function getStyles(): string {
    return `
        :root {
            /* Light Mode Colors */
            --bg-color: #ffffff;
            --text-color: #000000;
            --node-bg: #ffffff;
            --node-border: #34495e;
            --search-bg: #f0f0f0;
            --btn-bg: #3498db;
            --btn-text: white;
            --array-node-color: #e67e22;
            --object-node-color: #3498db;
            --value-node-color: #2ecc71;
            --network-border: #1c2833;
            --network-bg: #ffffff;
        }
        body.dark-mode {
            /* Dark Mode Colors */
            --bg-color: #1c2833;
            --text-color: #ffffff;
            --node-bg: #34495e;
            --node-border: #ffffff;
            --search-bg: #3b3b3b;
            --btn-bg: #e67e22;
            --btn-text: black;
            --array-node-color: #d35400;
            --object-node-color: #2980b9;
            --value-node-color: #27ae60;
            --network-border: #ffffff;
            --network-bg: #1c2833;
        }

        body {
            font-family: Arial, sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            transition: background-color 0.3s, color 0.3s;
        }
        #controls {
            margin-bottom: 10px;
        }
        #searchInput {
            padding: 5px;
            width: 200px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        .dark-mode #searchInput {
            border: 1px solid #ffffff;
        }
        #searchBtn, #darkModeToggle {
            padding: 5px 10px;
            margin-left: 5px;
            cursor: pointer;
            border: none;
            background-color: var(--btn-bg);
            color: var(--btn-text);
            border-radius: 5px;
        }
        #searchBtn {
            padding: 5px 10px;
            margin-left: 5px;
            cursor: pointer;
            border: none;
            background-color: #3498db;
            color: white;
            border-radius: 5px;
        }
        #network {
            width: 100%;
            height: 600px;
            background: var(--network-bg);
            transition: background 0.3s;
        }
        
    `;
}
