export function getGraphScript(): string {
    return `
        const nodes = new vis.DataSet([]);
        const edges = new vis.DataSet([]);
        let network;
        let expandedNodes = new Set();

        function getCSSVariable(name) {
            return getComputedStyle(document.body).getPropertyValue(name).trim();
        }

        function createTreeGraph(data, parentId = null, keyName = "Root", isRoot = false) {
            const nodeId = Math.random().toString(36).substr(2, 9);

            let color, shape, iconLabel;
            const textColor = getCSSVariable("--text-color");
            const borderColor = getCSSVariable("--node-border");

            if (Array.isArray(data)) {
                color = getCSSVariable("--array-node-color"); // Define in style.ts
                shape = "diamond";
                iconLabel = "🔢 " + keyName;
            } else if (typeof data === "object" && data !== null) {
                color = getCSSVariable("--object-node-color"); // Define in style.ts
                shape = "box";
                iconLabel = "📂 " + keyName;
            } else {
                color = getCSSVariable("--value-node-color"); // Define in style.ts
                shape = "ellipse";
                iconLabel = "🔹 " + keyName + ": " + String(data);
            }

            nodes.add({ 
                id: nodeId, 
                label: iconLabel, 
                shape: shape,
                color: { background: color, border: borderColor },
                hidden: !isRoot,
                title: JSON.stringify(data, null, 2),
                font: { size: 14, color: textColor },
                margin: 10
            });

            if (parentId !== null) {
                edges.add({ 
                    from: parentId, 
                    to: nodeId, 
                    hidden: !isRoot,
                    arrows: "to",
                    color: borderColor,
                    width: 2,
                    dashes: Array.isArray(data) ? true : false
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
        
        function toggleNode(nodeId) {
    function getAllDescendants(nodeId) {
        let descendants = [];
        let queue = [nodeId];

        while (queue.length > 0) {
            let currentNode = queue.shift();
            let childrenEdges = edges.get({ filter: edge => edge.from === currentNode });

            childrenEdges.forEach(edge => {
                descendants.push(edge.to);
                queue.push(edge.to);
            });
        }

        return descendants;
    }

    const connectedEdges = edges.get({ filter: edge => edge.from === nodeId });
    const connectedNodes = connectedEdges.map(edge => edge.to);

    if (expandedNodes.has(nodeId)) {
        // Collapse (Hide recursively)
        let allDescendants = getAllDescendants(nodeId);
        
        allDescendants.forEach(node => nodes.update({ id: node, hidden: true }));
        edges.get().forEach(edge => {
            if (allDescendants.includes(edge.to) || allDescendants.includes(edge.from)) {
                edges.update({ id: edge.id, hidden: true });
            }
        });

        expandedNodes.delete(nodeId);
    } else {
        // Expand (Show direct children only)
        connectedEdges.forEach(edge => edges.update({ id: edge.id, hidden: false }));
        connectedNodes.forEach(node => nodes.update({ id: node, hidden: false }));
        expandedNodes.add(nodeId);
    }
}


        function initGraph() {
            nodes.clear();
            edges.clear();
            createTreeGraph(rawData, null, "Root", true);

            const container = document.getElementById('network');
            const data = { nodes, edges };
            const options = {
                layout: { hierarchical: { direction: "LR", sortMethod: "directed", levelSeparation: 150, nodeSpacing: 100 }},
                edges: { smooth: false, arrows: "to", width: 2, color: getCSSVariable("--node-border") },
                nodes: { borderWidth: 2, shape: "box", font: { color: getCSSVariable("--text-color"), size: 16 }},
                interaction: { hover: true }, physics: { enabled: false }
            };

            network = new vis.Network(container, data, options);

            network.on("click", function (params) {
                if (params.nodes.length > 0) {
                    toggleNode(params.nodes[0]);
                }
            });

            
        // PNG Export Function
            document.getElementById("exportPng").addEventListener("click", function () {
                const canvas = document.querySelector("canvas");
                const link = document.createElement("a");
                link.href = canvas.toDataURL("image/png");
                link.download = "graph.png";
                link.click();
            });
            

            document.getElementById("darkModeToggle").addEventListener("click", updateGraphColors);
        }
        

        function updateGraphColors() {
            nodes.forEach(node => {
                nodes.update({ 
                    id: node.id, 
                    color: { background: getCSSVariable("--node-bg"), border: getCSSVariable("--node-border") },
                    font: { color: getCSSVariable("--text-color") }
                });
            });

            edges.forEach(edge => {
                edges.update({ id: edge.id, color: getCSSVariable("--node-border") });
            });

            network.redraw();
        }

    `;
}
