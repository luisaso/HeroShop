import { ProductShoppingCart } from './product-shopping-cart.model';

export class TemporaryShoppingCart {
  userId!: number;
  productsShoppingCart?: ProductShoppingCart[] = [
    {
      id: 1,
      product: {
        productId: 3,
        name: 'Potion of Healing',
        type: 'Potion',
        rarity: 'Common',
        price: 10,
        description:
          'You regain hit points when you drink this potion. The number of hit points depends on the potion’s rarity, as shown in the Potions of Healing table. Whatever its potency, the potion’s red liquid glimmers when agitated.',
        imgLink:
          'https://media-waterdeep.cursecdn.com/attachments/2/667/potion.jpg',
      },
      amount: 5,
      shoppingCartId: 2,
    },
    {
      id: 1,
      product: {
        productId: 3,
        name: 'Potion of Healing',
        type: 'Potion',
        rarity: 'Common',
        price: 10,
        description:
          'You regain hit points when you drink this potion. The number of hit points depends on the potion’s rarity, as shown in the Potions of Healing table. Whatever its potency, the potion’s red liquid glimmers when agitated.',
        imgLink:
          'https://media-waterdeep.cursecdn.com/attachments/2/667/potion.jpg',
      },
      amount: 5,
      shoppingCartId: 2,
    },
    {
      id: 1,
      product: {
        productId: 3,
        name: 'Potion of Healing',
        type: 'Potion',
        rarity: 'Common',
        price: 10,
        description:
          'You regain hit points when you drink this potion. The number of hit points depends on the potion’s rarity, as shown in the Potions of Healing table. Whatever its potency, the potion’s red liquid glimmers when agitated.',
        imgLink:
          'https://media-waterdeep.cursecdn.com/attachments/2/667/potion.jpg',
      },
      amount: 5,
      shoppingCartId: 2,
    },
  ];
}
