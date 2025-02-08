
import { getGraphScript } from "./graph";
import { getSearchScript } from "./search";
import { getExpandCollapseScript } from "./expandCollapse";
import { getStyles } from "./styles";
import { darkMode } from "./darkMode";

export function getWebviewContent(jsonData: string): string {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <script src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
            <style>${getStyles()}</style>
        </head>
        <body>
            <div id="controls">
                <input type="text" id="searchInput" placeholder="Search node..." />
                <button id="searchBtn">🔍 Search</button>
                <button onclick="expandAll()">Expand All</button>
                <button onclick="collapseAll()">Collapse All</button>
                <button id="darkModeToggle">🌙 Dark Mode</button>
                <button id="exportPng">Export as PNG</button>
            </div>
            <div id="network"></div>
            <script>
                const rawData = JSON.parse(decodeURIComponent('${encodeURIComponent(jsonData)}'));

                ${getGraphScript()}
                ${getSearchScript()}
                ${getExpandCollapseScript()}
                ${darkMode()}

                document.getElementById("searchBtn").addEventListener("click", searchNode);
                initGraph();
            </script>
        </body>
        </html>`;
}
