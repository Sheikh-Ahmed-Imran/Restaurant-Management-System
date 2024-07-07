export const sampleData = [
    {
      _id: 1,
      name: 'Zinger Burger',
      price: 250, // Default price if no size is selected
      prices: {
        Chicken: 250, // Price for Chicken Zinger Burger
        Cheesy: 280, // Price for Cheesy Zinger Burger
      },
    },
    {
      _id: 2,
      name: 'Tandoori Pizza',
      price: 300, // Default price for any size
      sizes: ['Large', 'Medium', 'Small'], // Array of available sizes
    },
    // Add more items with appropriate price structures
  ];
  