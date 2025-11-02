// src/utils/auth.js
export function getCurrentUser() {
    return localStorage.getItem("currentUser");
}

export function signup(email, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const exists = users.find(u => u.email === email);
    if (exists) return { error: "User already exists" };

    const newUser = { email, password, goals: [] };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    localStorage.setItem("currentUser", email);
    return { user: email };
}

export function login(email, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) return { error: "Invalid credentials" };

    localStorage.setItem("currentUser", email);
    return { user: email, goals: found.goals || [] };
}

export function logout() {
    localStorage.removeItem("currentUser");
}

export function updateUserGoals(email, goals) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map(u =>
        u.email === email ? { ...u, goals } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
}