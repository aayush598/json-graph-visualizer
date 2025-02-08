export function getExpandCollapseScript(): string {
    return `
        function expandAll() {
            nodes.get().forEach(node => nodes.update({ id: node.id, hidden: false }));
            edges.get().forEach(edge => edges.update({ id: edge.id, hidden: false }));
            expandedNodes.clear();
            nodes.get().forEach(node => expandedNodes.add(node.id));
        }

        function collapseAll() {
            const rootNodeId = nodes.get()[0].id;
            nodes.get().forEach(node => {
                if (node.id !== rootNodeId) {
                    nodes.update({ id: node.id, hidden: true });
                }
            });

            edges.get().forEach(edge => {
                if (edge.from !== rootNodeId) {
                    edges.update({ id: edge.id, hidden: true });
                }
            });

            expandedNodes.clear();
            expandedNodes.add(rootNodeId);
        }
    `;
}
