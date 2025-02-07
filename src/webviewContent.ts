export function getWebviewContent(jsonData: string): string {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <script src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
            <style>
                #network {
                    width: 100%;
                    height: 600px;
                    border: 1px solid lightgray;
                }
            </style>
        </head>
        <body>
            <div id="network"></div>
            <script>
                const rawData = ${jsonData};

                const nodes = new vis.DataSet([]);
                const edges = new vis.DataSet([]);
                let network;
                let expandedNodes = new Set();

                function createTreeGraph(data, parentId = null, keyName = "Root", isRoot = false) {
                    const nodeId = Math.random().toString(36).substr(2, 9);
                    nodes.add({ 
                        id: nodeId, 
                        label: keyName, 
                        shape: "box", // Rectangular shape
                        hidden: !isRoot, // Hide all except root node initially
                        title: JSON.stringify(data, null, 2),
                        font: { size: 14 },
                        margin: 10
                    });

                    if (parentId !== null) {
                        edges.add({ 
                            from: parentId, 
                            to: nodeId, 
                            hidden: !isRoot,
                            arrows: "to",
                            color: "#3498db", // Edge color
                            width: 2
                        });
                    }

                    if (typeof data === 'object' && data !== null) {
                        for (const key in data) {
                            if (Object.hasOwnProperty.call(data, key)) {
                                createTreeGraph(data[key], nodeId, key, false);
                            }
                        }
                    }
                }

                function initGraph() {
                    nodes.clear();
                    edges.clear();
                    createTreeGraph(rawData, null, "Root", true);

                    const container = document.getElementById('network');
                    const data = { nodes, edges };

                    const options = {
                        layout: {
                            hierarchical: {
                                direction: "LR", // Left to Right structure
                                sortMethod: "directed",
                                levelSeparation: 150,
                                nodeSpacing: 100
                            }
                        },
                        edges: { 
                            smooth: false, // Disables curved edges for rectangular branch style
                            arrows: "to",
                            width: 2
                        },
                        interaction: { hover: true },
                        physics: { enabled: false }
                    };

                    network = new vis.Network(container, data, options);

                    // Click to expand/collapse nodes
                    network.on("click", function (params) {
                        if (params.nodes.length > 0) {
                            const nodeId = params.nodes[0];
                            toggleNode(nodeId);
                        }
                    });
                }

                function toggleNode(nodeId) {
                    const connectedEdges = edges.get({ filter: edge => edge.from === nodeId });
                    const connectedNodes = connectedEdges.map(edge => edge.to);

                    if (expandedNodes.has(nodeId)) {
                        // Collapse
                        connectedEdges.forEach(edge => edges.update({ id: edge.id, hidden: true }));
                        connectedNodes.forEach(node => nodes.update({ id: node, hidden: true }));
                        expandedNodes.delete(nodeId);
                    } else {
                        // Expand
                        connectedEdges.forEach(edge => edges.update({ id: edge.id, hidden: false }));
                        connectedNodes.forEach(node => nodes.update({ id: node, hidden: false }));
                        expandedNodes.add(nodeId);
                    }
                }

                initGraph();
            </script>
        </body>
        </html>`;
}
