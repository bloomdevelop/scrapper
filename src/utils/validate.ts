export async function validateExperienceId(id: number) {
  try {
    const res = await fetch(
      `https://games.roblox.com/v1/games?universeIds=${id}`,
    );
    const data = await res.json();
    if (!data || !data.data || !data.data.length) {
      throw new Error(`Experience with ID ${id} not found`);
    }

    const experience = data.data[0];
    if (!experience || !experience.id || experience.id !== id) {
      throw new Error(`Experience with ID ${id} not found`);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to validate experience ID ${id}: ${error.message}`,
      );
    }
    throw new Error(`Failed to validate experience ID ${id}: ${error}`);
  }
}
