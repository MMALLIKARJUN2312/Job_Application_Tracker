export const generateSuggestions = (skills) => {
  const suggestions = [];

  if (!skills.includes("typescript")) {
    suggestions.push(
      "Add TypeScript to improve frontend opportunities"
    );
  }

  if (!skills.includes("docker")) {
    suggestions.push(
      "Learning Docker can improve backend and DevOps roles"
    );
  }

  if (!skills.includes("aws")) {
    suggestions.push(
      "AWS knowledge is highly valued in cloud-based roles"
    );
  }

  return suggestions;
};