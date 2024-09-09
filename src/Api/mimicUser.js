export const mimicUser = async (offset = 0) => {
  // Simulate a delay using a promise
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Simulate the API call with a 2-second delay
  await delay(1000);

  // Create an array of 7 objects
  const data = Array.from({ length: 7 }, (_, index) => ({
    id: `user-${offset + index + 1}`, // Use a string ID
    name: `User ${offset + index + 1}`, // Static name for demonstration
    email: `user${offset + index + 1}@example.com`, // Static email for demonstration
  }));

  return data;
};
