export function darkMode(): string {
    return `
        document.getElementById("darkModeToggle").addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");
            localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
        });

        if (localStorage.getItem("darkMode") === "true") document.body.classList.add("dark-mode");
    `;
}
