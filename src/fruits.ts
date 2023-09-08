export interface FruitData {
  name: string
  imageUrl: string
  description: string
  color: number
}

// Supposing it is already mapped to the FruitData model
export const fruitsJSON = {
  fruits: Array<FruitData>(
    {
      name: 'Apple',
      imageUrl: 'static/images/apple.png',
      description:
        'An apple is a round, edible fruit produced by an apple tree (Malus domestica).\n\nApple trees are cultivated worldwide and are the most widely grown species in the genus Malus. The tree originated in Central Asia, where its wild ancestor, Malus sieversii, is still found.',
      color: 0xa4172f,
    },
    {
      name: 'Banana',
      imageUrl: 'static/images/banana.png',
      description:
        'A banana is an elongated, edible fruit, botanically a berry, produced by several kinds of large herbaceous flowering plants in the genus Musa.\n\n In some countries, bananas used for cooking may be called "plantains", distinguishing them from dessert bananas.',
      color: 0xebcb1d,
    },
    {
      name: 'Grapes',
      imageUrl: 'static/images/grapes.png',
      description:
        'A grape is a fruit, botanically a berry, of the deciduous woody vines of the flowering plant genus Vitis. Grapes are a non-climacteric type of fruit, generally occurring in clusters.\n\nThe cultivation of grapes began perhaps 8,000 years ago, and the fruit has been used as human food over history.',
      color: 0xb25df4,
    },
    {
      name: 'Pineapple',
      imageUrl: 'static/images/pineapple.png',
      description:
        'The pineapple (Ananas comosus) is a tropical plant with an edible fruit; it is the most economically significant plant in the family Bromeliaceae.\n\nPineapples grow as a small shrub; the individual flowers of the unpollinated plant fuse to form a multiple fruit.',
      color: 0xda7c18,
    },
  ),
}

export const emptyFruit: FruitData = { name: '', imageUrl: '', description: '', color: 0 }
