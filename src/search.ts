export function getSearchScript(): string {
    return `
        function searchNode() {
            const searchTerm = document.getElementById("searchInput").value.trim().toLowerCase();
            if (!searchTerm) return;

            let foundNodes = nodes.get().filter(node => node.label.toLowerCase().includes(searchTerm));

            if (foundNodes.length === 0) {
                alert("No matching nodes found!");
                return;
            }

            nodes.update(foundNodes.map(node => ({
                id: node.id,
                color: { background: "#f1c40f", border: "#e67e22" }
            })));
        }
    `;
}
